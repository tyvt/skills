"""off-task 触发率统计（读 .sessions/offtask.jsonl）。

为什么需要它：composer-2.5 的虚构交付物型偏题在重放中 11 次零复现，
所以触发率只能从真实流量估。本脚本把日志汇总成「按模型 / 按工具」的触发率，
并给出 Wilson 置信区间——样本少时必须看区间，不能只看点估计。

用法:
    python scripts/offtask_stats.py
    python scripts/offtask_stats.py --since 2026-11-13
"""
import argparse
import json
import math
import os
import sys
from collections import defaultdict
from datetime import datetime, timezone

LOG = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   ".sessions", "offtask.jsonl")


def wilson(k, n, z=1.96):
    """Wilson 置信区间。小样本下比 k/n 可靠得多。"""
    if n == 0:
        return (0.0, 0.0)
    p = k / n
    d = 1 + z * z / n
    center = (p + z * z / (2 * n)) / d
    half = (z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d
    return (max(0.0, center - half), min(1.0, center + half))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", help="ISO date, e.g. 2026-11-13")
    ap.add_argument("--log", default=LOG)
    args = ap.parse_args()

    if not os.path.exists(args.log):
        print("日志不存在: %s" % args.log)
        print("说明：至今没有代码类工具调用被记录（或已清理）。")
        return 1

    since = None
    if args.since:
        since = datetime.fromisoformat(args.since).replace(tzinfo=timezone.utc).timestamp()

    rows = []
    with open(args.log, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                r = json.loads(line)
            except json.JSONDecodeError:
                continue
            if since and r.get("ts", 0) < since:
                continue
            rows.append(r)

    print("样本总数: %d" % len(rows))
    if not rows:
        return 0

    hits = sum(1 for r in rows if r.get("hit"))
    lo, hi = wilson(hits, len(rows))
    print("总触发: %d/%d = %.2f%%  (95%% CI %.1f%%-%.1f%%)"
          % (hits, len(rows), 100.0 * hits / len(rows), 100 * lo, 100 * hi))
    print()

    for key in ("model", "tool"):
        agg = defaultdict(lambda: [0, 0])
        for r in rows:
            agg[r.get(key) or "?"][1] += 1
            if r.get("hit"):
                agg[r.get(key) or "?"][0] += 1
        print("--- 按 %s ---" % key)
        for name, (k, n) in sorted(agg.items(), key=lambda x: -x[1][1]):
            lo2, hi2 = wilson(k, n)
            flag = "  (样本<30，区间很宽，不可作结论)" if n < 30 else ""
            print("  %-38s %3d/%3d = %6.2f%%  CI %5.1f%%-%.1f%%%s"
                  % (name, k, n, 100.0 * k / n, 100 * lo2, 100 * hi2, flag))
        print()

    kinds = defaultdict(int)
    for r in rows:
        if r.get("hit"):
            kinds[r.get("matched") or "?"] += 1
    if kinds:
        print("--- 命中特征聚类 ---")
        for k, v in sorted(kinds.items(), key=lambda x: -x[1]):
            print("  %-40s %d" % (k, v))
    else:
        print("--- 无命中 ---")
    return 0


if __name__ == "__main__":
    sys.exit(main())
