#!/usr/bin/env python3
"""zentao_upload.py — 把本地图片/GIF 上传到新禅道，返回 fileID 供回写内嵌。

复用 zentao_file.py 的鉴权（credentials.resolve()/base()），全程 stdlib，无第三方依赖。

用法：
  python zentao_upload.py <local_path> [--uid <uid>]
  python zentao_upload.py <local_path> --object-type bug --object-id 6576

stdout（单行，供模型/脚本直接解析）：
  OK <fileID> <ext>        上传成功
  ERR <reason>             失败（退出码非 0）

通道（与 REST v1 参考手册一致）：
  A) POST /api.php/v1/files        multipart: uid + file，Token header → {id,url}
  B) POST /api.php/v1/attachments  A 失败且给了 object 时回退：objectType/objectID 直挂
两通道都失败 → ERR，禁止静默略过。凭据只读自 credentials.py，不进会话。
"""

import argparse
import json
import mimetypes
import os
import sys
import urllib.error
import urllib.request
import uuid

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import credentials  # noqa: E402


def _token(base, account, password):
    req = urllib.request.Request(
        base + "/api.php/v1/tokens",
        data=json.dumps({"account": account, "password": password}).encode("utf-8"),
        method="POST",
    )
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))["token"]


def _multipart(fields, file_field, path, filename):
    """手工拼 multipart/form-data（stdlib 无 requests）。返回 (body, content_type)。"""
    boundary = "----zentaoUpload" + uuid.uuid4().hex
    lines = []
    for k, v in fields.items():
        lines.append(
            ("--%s\r\nContent-Disposition: form-data; name=\"%s\"\r\n\r\n%s\r\n"
             % (boundary, k, v))
        )
    with open(path, "rb") as f:
        data = f.read()
    ctype = mimetypes.guess_type(filename)[0] or "application/octet-stream"
    lines.append(
        "--%s\r\nContent-Disposition: form-data; name=\"%s\"; filename=\"%s\"\r\n"
        "Content-Type: %s\r\n\r\n" % (boundary, file_field, filename, ctype)
    )
    head = "".join(lines).encode("utf-8")
    tail = ("\r\n--%s--\r\n" % boundary).encode("utf-8")
    return head + data + tail, "multipart/form-data; boundary=%s" % boundary


def _post(token, base, endpoint, body, content_type):
    req = urllib.request.Request(base + endpoint, data=body, method="POST")
    req.add_header("Token", token)
    req.add_header("Content-Type", content_type)
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8")


def _http_err(e):
    """把 HTTPError 的响应体带上，便于诊断 400/403 的真实原因。"""
    try:
        body = e.read().decode("utf-8", "replace")[:300]
    except Exception:  # noqa: BLE001
        body = ""
    return "HTTP %s %s" % (getattr(e, "code", "?"), body or getattr(e, "reason", "?"))


def _parse_file_id(text):
    """兼容 {id:...} / {id:'...'} / 纯数字 等返回形态。"""
    try:
        obj = json.loads(text)
    except Exception:
        return None
    if isinstance(obj, dict):
        if "error" in obj:
            return None
        v = obj.get("id") or obj.get("fileID")
        if v is not None:
            return str(v)
    return None


def main():
    ap = argparse.ArgumentParser(description="上传本地图片/GIF 到新禅道，输出 fileID")
    ap.add_argument("path", help="本地文件路径（PNG/GIF/JPG 等）")
    ap.add_argument("--uid", default=None, help="关联 uid，默认随机生成")
    ap.add_argument("--object-type", default=None, help="回退通道用：bug/task/story")
    ap.add_argument("--object-id", type=int, default=None, help="回退通道用：对象 ID")
    args = ap.parse_args()

    if not os.path.isfile(args.path):
        print("ERR file not found: %s" % args.path)
        return 2
    filename = os.path.basename(args.path)
    ext = os.path.splitext(filename)[1].lstrip(".").lower() or "png"
    uid = args.uid or uuid.uuid4().hex

    try:
        account, password = credentials.resolve()
        base = credentials.base()
        token = _token(base, account, password)

        # 通道 A：/files（imgFile + uid，字段名 imgFile 是本实例实测契约，非 file）
        body, ctype = _multipart({"uid": uid}, "imgFile", args.path, filename)
        try:
            text = _post(token, base, "/api.php/v1/files", body, ctype)
            fid = _parse_file_id(text)
            if fid:
                print("OK %s %s" % (fid, ext))
                return 0
        except (urllib.error.HTTPError, urllib.error.URLError) as e:
            text = "channel A error: %s" % _http_err(e)

        # 通道 B：/attachments（直挂 objectType/objectID）
        if args.object_type and args.object_id:
            fields = {"objectType": args.object_type, "objectID": str(args.object_id), "uid": uid}
            body, ctype = _multipart(fields, "imgFile", args.path, filename)
            try:
                text2 = _post(token, base, "/api.php/v1/attachments", body, ctype)
                fid = _parse_file_id(text2)
                if fid:
                    print("OK %s %s" % (fid, ext))
                    return 0
                text = text + " | B: " + text2[:200]
            except (urllib.error.HTTPError, urllib.error.URLError) as e:
                text = text + " | B error: %s" % _http_err(e)

        print("ERR upload failed: %s" % text[:300])
        return 1
    except Exception as e:  # noqa: BLE001
        print("ERR %s" % e)
        return 1


if __name__ == "__main__":
    sys.exit(main())
