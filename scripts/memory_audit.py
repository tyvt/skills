#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OpenViking 记忆随机抽查审计工具.

子命令:
  select  列出记忆(排除 _archive)、按 last_checked 冷却过滤、随机抽 N 条, 输出 JSON 候选
  apply   接收判定 JSON, 合并写入 frontmatter(audit_status/last_checked/verdict_note), 写审计日志
  stats   覆盖率 / 状态分布

设计要点(对应 plan_review P1 建议):
  - apply 写入前重新 read 同一 URI 并比对正文哈希, 不一致则判 suspect 跳过, 防覆盖并发更新
  - frontmatter 合并更新: 保留原有 YAML 字段, 仅覆盖本工具管理的三个字段
  - 边界: 空候选 / 不足 N 条 / 非法 last_checked 均优雅处理
仅通过 `ov` CLI 子进程访问 OpenViking(SDK 顶层无导出)。所有中间文件落工作区外缓存目录。
"""

import argparse
import datetime as dt
import hashlib
import json
import os
import random
import re
import subprocess
import sys
import tempfile
from pathlib import Path

MEM_ROOT = "viking://user/default/memories"
EXCLUDE_PREFIX = MEM_ROOT + "/_archive"
CACHE_DIR = Path(os.path.expanduser("~")) / ".dsh" / "cache" / "memory-audit"
AUDIT_LOG = CACHE_DIR / "audit.jsonl"
FM_FIELDS = ("audit_status", "last_checked", "verdict_note")
FM_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*\n?", re.S)
DATE_RE = re.compile(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}")

VALID_VERDICTS = {"valid", "invalid", "suspect"}


def now_iso():
    return dt.datetime.now(dt.timezone(dt.timedelta(hours=8))).replace(microsecond=0).isoformat()


def ov_json(args):
    """调用 ov CLI 并解析 --output json 的首个 JSON 对象. 返回 dict 或 None."""
    cmd = ["ov"] + args + ["--output", "json"]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", timeout=120)
    except FileNotFoundError:
        print("ERROR: ov CLI 不在 PATH", file=sys.stderr)
        return None
    except subprocess.TimeoutExpired:
        print(f"ERROR: ov 超时: {' '.join(cmd[:3])}", file=sys.stderr)
        return None
    if p.returncode != 0:
        print(f"ERROR: ov 失败(rc={p.returncode}): {p.stderr[:200]}", file=sys.stderr)
        return None
    # 输出可能含 'cmd:' 提示行, 取第一个以 { 开头的行
    for line in p.stdout.splitlines():
        line = line.strip()
        if line.startswith("{"):
            try:
                return json.loads(line)
            except json.JSONDecodeError:
                continue
    return None


def ov_text(args):
    """调用 ov CLI 取纯文本输出(用于 read --content 类)."""
    try:
        p = subprocess.run(["ov"] + args, capture_output=True, text=True, encoding="utf-8", timeout=120)
    except Exception as e:
        print(f"ERROR: ov 调用异常: {e}", file=sys.stderr)
        return None
    if p.returncode != 0:
        return None
    # 去掉首行 'cmd:' 回显
    lines = p.stdout.splitlines()
    if lines and lines[0].strip().startswith("cmd:"):
        lines = lines[1:]
    return "\n".join(lines)


def list_all_uris():
    """分页列出 MEM_ROOT 下所有 .md URI, 排除 _archive."""
    uris, offset, page = [], 0, 256
    while True:
        data = ov_json(["ls", MEM_ROOT, "-r", "--simple", "-n", str(page), "--offset", str(offset)])
        if not data or not data.get("ok"):
            break
        batch = data.get("result", [])
        for u in batch:
            if u.startswith(EXCLUDE_PREFIX):
                continue
            if u.endswith(".md"):
                uris.append(u)
        if not data.get("has_more") or not batch:
            break
        offset += page
    return uris


def parse_frontmatter(text):
    """返回 (fm_dict, body, raw_fm_line_count). 无 frontmatter 时 fm={}."""
    m = FM_RE.match(text or "")
    if not m:
        return {}, text or "", 0
    block = m.group(1)
    fm = {}
    for line in block.splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    body = text[m.end():]
    return fm, body, block.count("\n") + 1


def build_frontmatter(existing, updates):
    """合并原 frontmatter 字段, 仅覆盖 updates 中的键. 返回 YAML 文本块(含首尾 ---)."""
    merged = dict(existing)
    merged.update(updates)
    lines = ["---"]
    for k, v in merged.items():
        lines.append(f"{k}: {v}")
    lines.append("---")
    return "\n".join(lines) + "\n"


def read_full(uri):
    return ov_text(["read", uri, "--offset", "0", "--limit", "-1"])


def is_in_cooldown(fm, cooldown_days, today):
    """last_checked 非法 -> 视为不在冷却期(可被抽查, 但会记录 suspect 倾向). 返回 (bool, note)."""
    raw = fm.get("last_checked", "")
    if not raw:
        return False, "never_checked"
    if not DATE_RE.search(raw):
        return False, "invalid_date"
    try:
        # 取日期时间前 19 位解析
        d = dt.datetime.fromisoformat(raw.strip()[:19])
        if d.tzinfo is None:
            d = d.replace(tzinfo=dt.timezone(dt.timedelta(hours=8)))
        delta = today - d
        return delta.total_seconds() < cooldown_days * 86400, f"age_days={delta.total_seconds()/86400:.1f}"
    except Exception:
        return False, "invalid_date"


def body_hash(body):
    return hashlib.sha256((body or "").encode("utf-8")).hexdigest()[:16]


def ensure_cache():
    CACHE_DIR.mkdir(parents=True, exist_ok=True)


def cmd_select(args):
    ensure_cache()
    uris = list_all_uris()
    if not uris:
        print(json.dumps({"candidates": [], "total": 0, "note": "no memories found"}, ensure_ascii=False))
        return

    # 一次性 grep 全库 last_checked, 避免对 6000+ 条逐条 read(会超时).
    # grep 的 matches 含 uri + 命中行 content, 从中解析 last_checked 原值.
    g = ov_json(["grep", "last_checked:", "-u", MEM_ROOT, "-n", "20000"])
    checked = {}
    if g and g.get("ok"):
        for mt in g.get("result", {}).get("matches", []):
            content = mt.get("content", "")
            if "last_checked:" in content:
                checked[mt.get("uri", "")] = content.split("last_checked:", 1)[1].strip()

    metas = []
    today = dt.datetime.now(dt.timezone(dt.timedelta(hours=8)))
    for u in uris:
        raw = checked.get(u)
        if raw is None:
            cool, note, fm = False, "never_checked", {}
        else:
            cool, note = is_in_cooldown({"last_checked": raw}, args.cooldown_days, today)
            fm = {"last_checked": raw}
        metas.append({"uri": u, "fm": fm, "in_cooldown": cool, "cooldown_note": note})

    eligible = [m for m in metas if not m["in_cooldown"]]
    # 优先从未抽查过的; 其次按 cooldown_note 的稳定性排序; 再随机
    never = [m for m in eligible if m["cooldown_note"] == "never_checked"]
    others = [m for m in eligible if m["cooldown_note"] != "never_checked"]
    random.shuffle(never)
    random.shuffle(others)
    picked = (never + others)[: args.n]

    out = []
    for m in picked:
        full = read_full(m["uri"])
        fm, body, _ = parse_frontmatter(full)
        out.append({
            "uri": m["uri"],
            "cooldown_note": m["cooldown_note"],
            "frontmatter": fm,
            "body_sha256_16": body_hash(body),
            "content": full,
        })

    result = {
        "generated_at": now_iso(),
        "total_memories": len(uris),
        "eligible": len(eligible),
        "picked": len(picked),
        "candidates": out,
    }
    if args.dry_run:
        result["content"] = "<omitted in dry-run>"
        for c in result["candidates"]:
            c["content"] = "<omitted in dry-run>"
    # 持久化 UTF-8 JSON 到缓存目录, 供定时任务会话直接 read, 避免控制台编码问题.
    sel_path = CACHE_DIR / "select.json"
    sel_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


def cmd_apply(args):
    ensure_cache()
    payload_path = Path(args.result_file)
    if not payload_path.exists():
        print(f"ERROR: 结果文件不存在: {payload_path}", file=sys.stderr)
        sys.exit(2)
    try:
        payload = json.loads(payload_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"ERROR: 结果文件非法 JSON: {e}", file=sys.stderr)
        sys.exit(2)

    verdicts = payload if isinstance(payload, list) else payload.get("results", [])
    applied, skipped, invalid = [], [], []

    for item in verdicts:
        uri = item.get("uri", "")
        verdict = str(item.get("verdict", "")).strip().lower()
        note = str(item.get("note", ""))[:500]
        expected_hash = item.get("body_sha256_16", "")

        if verdict not in VALID_VERDICTS or not uri.startswith(MEM_ROOT):
            invalid.append({"uri": uri, "reason": "bad_verdict_or_uri"})
            continue

        # P1-1: 写入前重读, 哈希比对防覆盖并发更新
        current = read_full(uri)
        if current is None:
            skipped.append({"uri": uri, "reason": "reread_failed"})
            continue
        cur_fm, cur_body, _ = parse_frontmatter(current)
        if expected_hash and expected_hash != body_hash(cur_body):
            # 内容被并发改动 -> 不覆盖, 记录 suspect 待人工复核
            skipped.append({"uri": uri, "reason": "body_changed_since_select", "expected": expected_hash, "actual": body_hash(cur_body)})
            audit_event(uri, "skip", "body_changed", note)
            continue

        # P1-2: 合并 frontmatter, 保留原字段
        updates = {
            "audit_status": verdict,
            "last_checked": now_iso(),
            "verdict_note": note.replace("\n", " ").replace(":", "-"),
        }
        new_fm = build_frontmatter(cur_fm, updates)
        new_content = new_fm + cur_body.lstrip("\n")

        if args.dry_run:
            applied.append({"uri": uri, "verdict": verdict, "dry_run": True, "new_frontmatter": new_fm.splitlines()[:-1]})
            continue

        # 通过 --from-file 写, 避免中文/特殊字符经命令行转义丢失
        fd, tmp = tempfile.mkstemp(suffix=".md", dir=str(CACHE_DIR))
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as f:
                f.write(new_content)
            ok = ov_json(["write", uri, "--from-file", tmp, "--wait"])
            if ok and ok.get("ok"):
                applied.append({"uri": uri, "verdict": verdict})
                audit_event(uri, "apply", verdict, note)
                # 回读校验(P1-3)
                back = read_full(uri)
                back_fm, _b, _ = parse_frontmatter(back or "")
                if back_fm.get("audit_status") != verdict:
                    applied[-1]["verify"] = "MISMATCH"
                else:
                    applied[-1]["verify"] = "ok"
            else:
                skipped.append({"uri": uri, "reason": "write_failed", "detail": str(ok)[:200]})
        finally:
            try:
                os.unlink(tmp)
            except OSError:
                pass

    print(json.dumps({"applied": applied, "skipped": skipped, "invalid": invalid, "dry_run": args.dry_run}, ensure_ascii=False, indent=2))


def audit_event(uri, action, verdict, note):
    ensure_cache()
    rec = {"at": now_iso(), "uri": uri, "action": action, "verdict": verdict, "note": note[:300]}
    with AUDIT_LOG.open("a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")


def cmd_stats(args):
    uris = list_all_uris()
    counts = {"valid": 0, "invalid": 0, "suspect": 0, "unchecked": 0, "invalid_date": 0}
    for u in uris:
        head = ov_text(["read", u, "--offset", "0", "--limit", "12"])
        fm, _b, _ = parse_frontmatter(head)
        status = fm.get("audit_status", "")
        if status in counts:
            counts[status] += 1
        elif fm.get("last_checked"):
            counts["invalid_date"] += 1
        else:
            counts["unchecked"] += 1
    checked = counts["valid"] + counts["invalid"] + counts["suspect"]
    print(json.dumps({
        "total": len(uris),
        "checked": checked,
        "coverage_pct": round(checked * 100.0 / len(uris), 1) if uris else 0,
        "breakdown": counts,
    }, ensure_ascii=False, indent=2))


def main():
    # 强制 stdout UTF-8, 防止 Windows 控制台 GBK 把中文 URI 变成乱码
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass
    ap = argparse.ArgumentParser(description="OpenViking 记忆随机抽查审计")
    sub = ap.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("select")
    s.add_argument("--n", type=int, default=5, help="抽取条数(默认 5)")
    s.add_argument("--cooldown-days", type=int, default=7, help="冷却天数(默认 7)")
    s.add_argument("--dry-run", action="store_true", help="不输出正文全文")
    s.set_defaults(fn=cmd_select)

    a = sub.add_parser("apply")
    a.add_argument("result_file", help="判定结果 JSON 文件路径")
    a.add_argument("--dry-run", action="store_true", help="只预览不写入")
    a.set_defaults(fn=cmd_apply)

    st = sub.add_parser("stats")
    st.set_defaults(fn=cmd_stats)

    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
