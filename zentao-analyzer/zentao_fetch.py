# -*- coding: utf-8 -*-
"""禅道详情抓取工具（按历史使用记录重建）。

用法：
    python zentao_fetch.py <bugID> [--json] [--type bug|task|story]

返回 bug/任务/需求的详情：标题、状态、严重程度、创建人、创建时间、
解决人/解决时间/解决方案、指派人等。
"""
import argparse
import json
import os
import re
import sys
import urllib.request
import urllib.parse
import http.cookiejar

try:
    import credentials as _cred
except Exception:
    _cred = None

BASE = (_cred.base() if _cred else os.environ.get("ZENTAO_BASE", "http://zentao-biz.zhi.com"))
DEFAULT_ACCOUNT = (_cred.DEFAULT_ACCOUNT if _cred else os.environ.get("ZENTAO_ACCOUNT", "tiany"))


def make_opener():
    cj = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    op.addheaders = [("User-Agent", "Mozilla/5.0"), ("X-Requested-With", "XMLHttpRequest")]
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


def login(op, account, password):
    page = get(op, "/index.php?m=user&f=login")
    m = re.search(r"name=['\"]verifyRand['\"]\s+value=['\"]([^'\"]*)", page)
    rand = m.group(1) if m else ""
    resp = post(op, "/index.php?m=user&f=login&t=json", {
        "account": account, "password": password, "passwordStrength": 1,
        "referer": "/", "verifyRand": rand, "keepLogin": 0,
    })
    return ("登录成功" in resp) or ('"locate"' in resp) or ("success" in resp)


def strip_html(html):
    html = re.sub(r"<script.*?</script>", "", html, flags=re.S | re.I)
    html = re.sub(r"<style.*?</style>", "", html, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"&nbsp;", " ", text)
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_fields(page):
    """从禅道详情页表格里提取字段标签到值。"""
    fields = {}
    for m in re.finditer(r'<th[^>]*>(.*?)</th>\s*<td[^>]*>(.*?)</td>', page, re.S):
        k = strip_html(m.group(1)).strip().strip("：:")
        v = strip_html(m.group(2)).strip()
        if k and k not in fields:
            fields[k] = v
    return fields


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("id", type=int)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--type", default="bug", choices=["bug", "task", "story"])
    ap.add_argument("--account", default=None)
    ap.add_argument("--password", default=None)
    args = ap.parse_args()

    if _cred:
        acc0, pwd0 = _cred.resolve(args.account, args.password)
        if not args.account:
            args.account = acc0
        if not args.password:
            args.password = pwd0
    if not args.account:
        args.account = DEFAULT_ACCOUNT
    if not args.password:
        print("缺少密码：请在 credentials.py 配置 DEFAULT_PASSWORD，或设 ZENTAO_PASSWORD 环境变量")
        sys.exit(2)

    op = make_opener()
    if not login(op, args.account, args.password):
        print("登录失败")
        sys.exit(1)

    view = {"bug": "bug", "task": "task", "story": "story"}[args.type]
    page = get(op, "/index.php?m=%s&f=view&%sID=%d" % (view, view, args.id))

    title_m = re.search(r"<title>(.*?)</title>", page, re.S)
    title = strip_html(title_m.group(1)).strip() if title_m else ""
    fields = extract_fields(page)

    if args.json:
        print(json.dumps({"id": args.id, "title": title, "fields": fields},
                         ensure_ascii=False, indent=2))
    else:
        print("=" * 60)
        print("%s #%d" % (args.type.upper(), args.id))
        print("标题:", title)
        for k, v in fields.items():
            print("%-8s: %s" % (k, v))


if __name__ == "__main__":
    main()
