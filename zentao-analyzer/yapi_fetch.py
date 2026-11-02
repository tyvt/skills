# -*- coding: utf-8 -*-
"""从 YApi 拉取接口定义，辅助核对前后端字段（按历史使用记录重建）。

用法：
    python yapi_fetch.py <api_id_or_url> [--token XXX]

YApi 项目/地址通过环境变量配置：
    YAPI_BASE   例如 http://yapi.zhi.com
    YAPI_TOKEN  YApi 访问 token（也可 --token 传入）
"""
import argparse
import json
import os
import sys
import urllib.request
import urllib.parse

BASE = os.environ.get("YAPI_BASE", "").rstrip("/")
TOKEN = os.environ.get("YAPI_TOKEN", "")


def fetch_api(api_id, token):
    if not BASE:
        print("缺少 YAPI_BASE 环境变量")
        sys.exit(2)
    url = "%s/api/interface/get?id=%s&token=%s" % (BASE, api_id, urllib.parse.quote(token))
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0")
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


def extract_api_id(s):
    if s.isdigit():
        return s
    import re
    m = re.search(r"(?:api|interface)/(\d+)", s) or re.search(r"id=(\d+)", s)
    return m.group(1) if m else s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("target")
    ap.add_argument("--token", default=TOKEN)
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()

    api_id = extract_api_id(args.target)
    data = fetch_api(api_id, args.token)
    if args.json:
        print(json.dumps(data, ensure_ascii=False, indent=2))
        return
    d = data.get("data", data)
    print("接口:", d.get("title"))
    print("路径:", d.get("path"), d.get("method"))
    print("---- req_body ----")
    print(d.get("req_body_other") or d.get("req_body_form") or d.get("req_query") or "")
    print("---- res_body ----")
    print(d.get("res_body") or "")


if __name__ == "__main__":
    main()
