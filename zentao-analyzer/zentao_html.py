# -*- coding: utf-8 -*-
"""把禅道页面 HTML 转成纯文本（按历史使用记录重建）。

用法：
    python zentao_html.py <html文件> [--out out.txt]
    # 或从 stdin 读
    type page.html | python zentao_html.py -
"""
import argparse
import re
import sys


def strip_html(html):
    html = re.sub(r"<script.*?</script>", "", html, flags=re.S | re.I)
    html = re.sub(r"<style.*?</style>", "", html, flags=re.S | re.I)
    html = re.sub(r"<br\s*/?>", "\n", html, flags=re.I)
    html = re.sub(r"</(p|div|tr|li|h[1-6])>", "\n", html, flags=re.I)
    text = re.sub(r"<[^>]+>", "", html)
    text = text.replace("&nbsp;", " ").replace("&lt;", "<").replace("&gt;", ">") \
               .replace("&amp;", "&").replace("&quot;", '"')
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("--out", default="")
    args = ap.parse_args()
    if args.src == "-":
        html = sys.stdin.read()
    else:
        with open(args.src, encoding="utf-8", errors="replace") as f:
            html = f.read()
    text = strip_html(html)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(text)
        print("written", args.out)
    else:
        print(text)


if __name__ == "__main__":
    main()
