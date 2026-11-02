# -*- coding: utf-8 -*-
"""禅道 bug 回写工具（按历史使用记录重建）。

用法：
    python zentao_resolve.py <bugID> [--dry-run]
    python zentao_resolve.py <bugID> --resolution fixed --build trunk \
        --assign-to lichandan --comment-file note.html [--account tiany] [--password xxx]

密码来源优先级：--password > 环境变量 ZENTAO_PASSWORD。
"""
import argparse
import json
import os
import re
import sys
import urllib.parse
import urllib.request
import http.cookiejar

BASE = os.environ.get("ZENTAO_BASE", "http://zentao-biz.zhi.com")
DEFAULT_ACCOUNT = os.environ.get("ZENTAO_ACCOUNT", "tiany")


def make_opener():
    cj = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    op.addheaders = [
        ("User-Agent", "Mozilla/5.0"),
        ("X-Requested-With", "XMLHttpRequest"),
    ]
    return op


def get(op, url):
    with op.open(BASE + url, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def post(op, url, data):
    body = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(BASE + url, data=body)
    req.add_header("X-Requested-With", "XMLHttpRequest")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with op.open(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def _md5(s):
    import hashlib
    return hashlib.md5(s.encode("utf-8")).hexdigest()


def login(op, account, password):
    """禅道登录。此实例登录页无 verifyRand 隐藏域，明文提交即可。"""
    page = get(op, "/index.php?m=user&f=login")
    m = re.search(r'name=["\']verifyRand["\']\s+value=["\']([^"\']*)', page)
    rand = m.group(1) if m else ""
    payload = {
        "account": account,
        "password": password,
        "keepLogin": "0",
        "referer": "/",
    }
    if rand:  # 若确有 verifyRand，则按 md5(md5(pwd)+rand) 提交
        payload["password"] = _md5(_md5(password) + rand)
        payload["passwordStrength"] = 1
    resp = post(op, "/index.php?m=user&f=login", payload)
    try:
        obj = json.loads(resp)
        if obj.get("result") == "success" or obj.get("status") == "success":
            print("登录成功：", account)
            return True
        if obj.get("message"):
            print("登录失败：", obj.get("message"))
            return False
    except Exception:
        pass
    if '"locate"' in resp or "成功" in resp:
        print("登录成功：", account)
        return True
    print("登录响应：", resp[:200])
    return False


def pick_uid(page):
    m = re.search(r"name=['\"]uid['\"]\s+value=['\"]([^'\"]*)", page)
    return m.group(1) if m else ""


def pick_options(page, field):
    """从表单 HTML 里粗提某 select 的 option value=label。"""
    out = []
    m = re.search(r'name=["\']%s["\'][^>]*>(.*?)</select>' % field, page, re.S)
    if m:
        for vm, lm in re.findall(r'value=["\']([^"\']*)["\'][^>]*>([^<]*)', m.group(1)):
            out.append((vm, lm.strip()))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("bugid", type=int)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--resolution", default="fixed")
    ap.add_argument("--build", default="trunk")
    ap.add_argument("--assign-to", default="")
    ap.add_argument("--comment-file", default="")
    ap.add_argument("--account", default=DEFAULT_ACCOUNT)
    ap.add_argument("--password", default=os.environ.get("ZENTAO_PASSWORD", ""))
    args = ap.parse_args()

    if not args.password:
        print("缺少密码：请设 ZENTAO_PASSWORD 环境变量或传 --password")
        sys.exit(2)

    op = make_opener()
    if not login(op, args.account, args.password):
        sys.exit(1)

    page = get(op, "/index.php?m=bug&f=resolve&bugID=%d" % args.bugid)
    uid = pick_uid(page)
    print("uid            :", uid or "(未找到)")
    builds = pick_options(page, "resolvedBuild")
    ress = pick_options(page, "resolution")
    print("可选解决版本   :", ", ".join("%s(%s)" % (v, l) for v, l in builds) or "(未解析)")
    print("可选解决方案   :", ", ".join("%s(%s)" % (v, l) for v, l in ress) or "(未解析)")

    if args.dry_run:
        print("已跳过提交（--dry-run）")
        return

    comment = ""
    if args.comment_file and os.path.exists(args.comment_file):
        with open(args.comment_file, encoding="utf-8") as f:
            comment = f.read()

    data = {
        "resolution": args.resolution,
        "resolvedBuild": args.build,
        "assignedTo": args.assign_to or args.account,
        "comment": comment,
        "uid": uid,
        "status": "resolved",
    }
    resp = post(op, "/index.php?m=bug&f=resolve&bugID=%d" % args.bugid, data)
    print("提交响应片段：", resp[:300])
    print("已提交回写：bug %d -> resolved(%s)" % (args.bugid, args.resolution))


if __name__ == "__main__":
    main()
