# -*- coding: utf-8 -*-
"""下载禅道附件/截图（REST v1，绕开 Web 强制改密）。

用法：
    python zentao_file.py <fileID> [output_path]
    python zentao_file.py <fileID> [--account tiany --password Field123456]

原理：Web 登录会被强制跳「修改密码」，但 /api.php/v1/tokens 签发 Token 不受影响，
再用 GET /api.php/v1/files/<fileID> 直接拿二进制（Header: Token）。

fileID 先用 DBX 查：
    SELECT id,title,pathname,size FROM zt_file WHERE objectType='bug' AND objectID=<bugID> ORDER BY id;
"""
import sys
import json
import urllib.request

try:
    from credentials import resolve, base as cfg_base
except Exception:  # 允许独立运行
    def resolve(account=None, password=None):
        return account or "tiany", password or "Field123456"
    def cfg_base():
        return "http://zentao-biz.zhi.com"


def get_token(account, password, BASE):
    req = urllib.request.Request(
        BASE + "/api.php/v1/tokens",
        data=json.dumps({"account": account, "password": password}).encode(),
        method="POST",
    )
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())["token"]


def download(file_id, out_path, BASE):
    account, password = resolve()
    token = get_token(account, password, BASE)
    req = urllib.request.Request(BASE + "/api.php/v1/files/%s" % file_id)
    req.add_header("Token", token)
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
        ctype = r.headers.get("Content-Type", "")
    with open(out_path, "wb") as f:
        f.write(data)
    sig = data[:4]
    print("saved %s (%d bytes, ct=%s, head=%s)" % (out_path, len(data), ctype, list(sig)))
    return out_path


def main():
    args = [a for a in sys.argv[1:]]
    account = password = None
    if "--account" in args:
        i = args.index("--account"); account = args[i + 1]; del args[i:i + 2]
    if "--password" in args:
        i = args.index("--password"); password = args[i + 1]; del args[i:i + 2]
    if not args:
        print(__doc__)
        return 1
    file_id = args[0]
    out = args[1] if len(args) > 1 else "zentao_file_%s" % file_id
    BASE = cfg_base()
    # 允许命令行账号覆盖（临时改 resolve 默认）
    if account or password:
        global resolve
        a, p = account or "tiany", password or "Field123456"
        resolve = lambda account=None, password=None: (a, p)
    download(file_id, out, BASE)
    return 0


if __name__ == "__main__":
    sys.exit(main())
