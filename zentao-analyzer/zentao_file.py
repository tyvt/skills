# -*- coding: utf-8 -*-
"""下载禅道附件/截图（REST v1，绕开 Web 强制改密）——带本地对象目录缓存。

两种形态：

A) 缓存模式（推荐，落 D 盘统一目录）：
    python zentao_file.py --object-type bug --object-id 6576 <fileID> [<fileID2> ...] [--fast]
    python zentao_file.py --object-type bug --object-id 6576 --sync-object 22802,22805 [--fast]

B) 兼容旧模式（不推荐，裸路径）：
    python zentao_file.py <fileID> [output_path]

缓存目录：默认 D:\\禅道附件\\<类型>\\<id>\\ （Windows）/ ~/禅道附件/...（其它平台），
可用环境变量 ZENTAO_ATTACH_ROOT 覆盖。每对象目录一份 _index.json 记录 sha1/size/title，
重复下载先查本地：size+sha1 命中则不发 HTTP，直接复用。

stdout 契约（供上层模型解析，绝对路径单行）：
    OK <abs_local_path>          下载成功
    CACHE_HIT <abs_local_path>   本地命中，未下载
    ERR <reason>                 失败（退出码非 0）

fileID 先用 DBX 查（脚本不直连 DB）：
    SELECT id,title,pathname,size FROM zt_file WHERE objectType='bug' AND objectID=<bugID> ORDER BY id;
"""
import sys
import os
import json
import time
import hashlib
import platform
import tempfile
import urllib.request

try:
    from credentials import resolve, base as cfg_base
except Exception:  # 允许独立运行
    def resolve(account=None, password=None):
        return account or "tiany", password or "Field123456"
    def cfg_base():
        return "http://zentao-biz.zhi.com"


# 类型 -> 目录名（story 与 requirement 合并到 story）
_TYPE_DIR = {
    "bug": "bug",
    "task": "task",
    "story": "story",
    "requirement": "story",
}


def attach_root():
    """缓存根目录：环境变量 > 平台默认。"""
    env = os.environ.get("ZENTAO_ATTACH_ROOT")
    if env:
        return env
    if platform.system() == "Windows":
        return r"D:\禅道附件"
    return os.path.join(os.path.expanduser("~"), "禅道附件")


def object_dir(object_type, object_id):
    """按类型/ID 返回对象目录，自动创建。"""
    ot = (object_type or "").strip().lower()
    sub = _TYPE_DIR.get(ot, os.path.join("_other", ot or "unknown"))
    d = os.path.join(attach_root(), sub, str(object_id))
    os.makedirs(d, exist_ok=True)
    return d


def safe_name(file_id, title):
    """file<id>_<安全化 title>；title 非法字符替换、限长 80。"""
    name = (title or "").strip()
    for ch in '\\/:*?"<>|\r\n\t':
        name = name.replace(ch, "_")
    name = name.strip(" .")
    if len(name) > 80:
        stem, ext = os.path.splitext(name)
        name = stem[:80 - len(ext)] + ext
    if not name:
        return "file%s" % file_id
    return "file%s_%s" % (file_id, name)


def _ext_from_magic(data):
    """从文件头推断扩展名（title 无扩展名时兜底）。"""
    if data[:3] == b"\xff\xd8\xff":
        return ".jpg"
    if data[:4] == b"\x89PNG":
        return ".png"
    b = data[:6]
    if b in (b"GIF87a", b"GIF89a") or data[:4] == b"GIF8":
        return ".gif"
    if data[:2] == b"BM":
        return ".bmp"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return ".webp"
    if data[:4] == b"PK\x03\x04":
        return ".zip"
    if data[:4] == b"%PDF":
        return ".pdf"
    return ""


def _index_path(d):
    return os.path.join(d, "_index.json")


def load_index(d):
    """读 _index.json；缺失返回空结构；损坏则备份后重建。"""
    p = _index_path(d)
    if not os.path.exists(p):
        return {"objectType": None, "objectID": None, "syncedAt": None, "files": {}}
    try:
        with open(p, "r", encoding="utf-8") as f:
            data = json.load(f)
        if not isinstance(data, dict) or not isinstance(data.get("files"), dict):
            raise ValueError("bad index shape")
        return data
    except Exception:
        bak = p + ".bad.%d" % int(time.time())
        try:
            os.replace(p, bak)
        except OSError:
            pass
        sys.stderr.write("WARN _index.json corrupted, backed up to %s, rebuilding\n" % bak)
        return {"objectType": None, "objectID": None, "syncedAt": None, "files": {}}


def save_index(d, data, merge=True):
    """原子写 _index.json：读-改-写合并 + 临时文件 os.replace。"""
    p = _index_path(d)
    if merge:
        old = load_index(d)
        old_files = old.get("files", {})
        new_files = data.get("files", {})
        merged = dict(old_files)
        merged.update(new_files)  # 新条目覆盖同 key，保留其它 fileID
        data = dict(data)
        data["files"] = merged
        if not data.get("objectType") and old.get("objectType"):
            data["objectType"] = old.get("objectType")
        if not data.get("objectID") and old.get("objectID"):
            data["objectID"] = old.get("objectID")
    fd, tmp = tempfile.mkstemp(prefix="_index.", suffix=".tmp", dir=d)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(tmp, p)  # 原子替换
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


def sha1_of(path):
    h = hashlib.sha1()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


# ---------------- 下载 ----------------

def get_token(account, password, BASE):
    req = urllib.request.Request(
        BASE + "/api.php/v1/tokens",
        data=json.dumps({"account": account, "password": password}).encode(),
        method="POST",
    )
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())["token"]


def _fetch_bytes(file_id, BASE, account, password):
    token = get_token(account, password, BASE)
    req = urllib.request.Request(BASE + "/api.php/v1/files/%s" % file_id)
    req.add_header("Token", token)
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
        ctype = r.headers.get("Content-Type", "")
    return data, ctype


def _atomic_write_bytes(path, data):
    """先写 .part 再 os.replace，避免半截文件被当成命中。"""
    d = os.path.dirname(os.path.abspath(path))
    fd, tmp = tempfile.mkstemp(prefix=os.path.basename(path) + ".", suffix=".part", dir=d)
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(data)
        os.replace(tmp, path)
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


# ---------------- 缓存模式 ----------------

def _is_hit(dirpath, entry, file_id, fast, want_sha1=None):
    """判断本地是否命中：文件存在 + size 一致 + (非 fast 时) sha1 一致。"""
    local = os.path.join(dirpath, entry.get("localName", ""))
    if not os.path.isfile(local):
        return None
    try:
        if os.path.getsize(local) != entry.get("size"):
            return None
    except OSError:
        return None
    if not fast:
        want = want_sha1 or entry.get("sha1")
        if want:
            try:
                if sha1_of(local) != want:
                    return None
            except OSError:
                return None
    return local


def fetch_cached(file_id, object_type, object_id, BASE, account, password, fast=False,
                 title=None, expect_size=None):
    """确保某 fileID 在本地；命中返回 ('CACHE_HIT', path)，下载返回 ('OK', path)。"""
    d = object_dir(object_type, object_id)
    idx = load_index(d)
    entry = idx.get("files", {}).get(str(file_id))
    if entry:
        hit = _is_hit(d, entry, file_id, fast)
        if hit:
            return "CACHE_HIT", hit
    # 未命中 -> 下载
    data, ctype = _fetch_bytes(file_id, BASE, account, password)
    if not data:
        raise RuntimeError("empty response for fileID %s" % file_id)
    eff_title = title or (entry or {}).get("title")
    name = (entry or {}).get("localName") or safe_name(file_id, eff_title)
    # title 无扩展名时按 magic 兜底补扩展名
    if not os.path.splitext(name)[1]:
        name = name + _ext_from_magic(data)
    out = os.path.join(d, name)
    _atomic_write_bytes(out, data)
    sig = data[:4]
    entry = {
        "fileID": int(file_id),
        "title": eff_title or name,
        "size": len(data),
        "localName": name,
        "sha1": sha1_of(out),
        "contentType": ctype,
        "magic": list(sig),
        "downloadedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
    }
    idx.setdefault("files", {})[str(file_id)] = entry
    idx["objectType"] = object_type
    idx["objectID"] = int(object_id)
    idx["syncedAt"] = time.strftime("%Y-%m-%dT%H:%M:%S%z")
    try:
        save_index(d, idx)
    except Exception as e:
        sys.stderr.write("WARN save_index failed for %s: %s\n" % (d, e))
    return "OK", out


# ---------------- 兼容旧模式 ----------------

def download(file_id, out_path, BASE):
    account, password = resolve()
    data, ctype = _fetch_bytes(file_id, BASE, account, password)
    out_dir = os.path.dirname(os.path.abspath(out_path))
    if out_dir:
        os.makedirs(out_dir, exist_ok=True)
    _atomic_write_bytes(out_path, data)
    sig = data[:4]
    print("saved %s (%d bytes, ct=%s, head=%s)" % (out_path, len(data), ctype, list(sig)))
    return out_path


def main():
    args = [a for a in sys.argv[1:]]

    def take(flag):
        if flag in args:
            i = args.index(flag)
            v = args[i + 1] if i + 1 < len(args) else None
            del args[i:i + 2 if v is not None else i + 1]
            return v
        return None

    account = take("--account")
    password = take("--password")
    object_type = take("--object-type")
    object_id = take("--object-id")
    sync_object = take("--sync-object")
    titles_arg = take("--titles")
    fast = "--fast" in args
    if fast:
        args.remove("--fast")

    # 解析 --titles "22802:修复01.gif,22805:x.png"
    titles = {}
    if titles_arg:
        for pair in titles_arg.split(","):
            if ":" in pair:
                fid, t = pair.split(":", 1)
                titles[fid.strip()] = t.strip()

    if account or password:
        global resolve
        a, p = account or "tiany", password or "Field123456"
        resolve = lambda account=None, password=None: (a, p)

    BASE = cfg_base()

    # 缓存模式（object-type 可空，空则落 _other/unknown；只要给了 object-id 即进缓存模式）
    if object_type is not None and object_id:
        file_ids = []
        if sync_object:
            file_ids.extend([x for x in sync_object.split(",") if x.strip()])
        file_ids.extend([x for x in args if x.strip()])
        if not file_ids:
            sys.stderr.write("ERR no fileID given (pass <fileID...> or --sync-object id1,id2)\n")
            return 2
        acc, pwd = resolve()
        rc = 0
        for fid in file_ids:
            try:
                status, path = fetch_cached(fid.strip(), object_type, object_id, BASE, acc, pwd,
                                            fast=fast, title=titles.get(fid.strip()))
                print("%s %s" % (status, os.path.abspath(path)))
            except PermissionError as e:
                sys.stderr.write("ERR permission denied writing under %s: %s\n"
                                 "    set ZENTAO_ATTACH_ROOT to a writable dir\n" % (attach_root(), e))
                rc = 3
            except Exception as e:
                sys.stderr.write("ERR %s\n" % e)
                rc = 1
        return rc

    # 兼容旧模式
    if not args:
        print(__doc__)
        return 1
    file_id = args[0]
    out = args[1] if len(args) > 1 else "zentao_file_%s" % file_id
    try:
        download(file_id, out, BASE)
    except PermissionError as e:
        sys.stderr.write("ERR permission denied: %s\n" % e)
        return 3
    except Exception as e:
        sys.stderr.write("ERR %s\n" % e)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
