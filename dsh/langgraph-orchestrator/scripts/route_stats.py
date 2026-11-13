"""路由命中率统计（读 .sessions/route.jsonl）。

与 offtask_stats.py 的分母不同，这两个数字不能互相替代：
  - 本脚本分母 = 每一次规划决策（含“该选没选”）
  - offtask 分母 = 已选中的代码类工具调用
若只盯 offtask，可能永远等不到样本（因为工具压根没被选中），
或者等到的样本不代表生产分流（分母已经过滤过一轮）。

重点看两个数：
  miss_rate          = 该选 signal 却选了别人的比例
  fallback_rate      = 规划失败/空计划强塞 planner 的比例（高则说明规划器本身不稳定）

用法:
    python scripts/route_stats.py
    python scripts/route_stats.py --since 2026-11-13
"""
import argparse
import json
import math
import os
import sys
from collections import defaultdict
from datetime import datetime, timezone

LOG = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   ".sessions", "route.jsonl")


def wilson(k, n, z=1.96):
    if n == 0:
        return (0.0, 0.0)
    p = k / n
    d = 1 + z * z / n
    center = (p + z * z / (2 * n)) / d
    half = (z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d
    return (max(0.0, center - half), min(1.0, center + half))


def pct(k, n):
    lo, hi = wilson(k, n)
    n_flag = "  (样本<30，不可作结论)" if n < 30 else ""
    return "%3d/%3d = %6.2f%%  CI %5.1f%%-%.1f%%%s" % (
        k, n, 100.0 * k / n if n else 0.0, 100 * lo, 100 * hi, n_flag)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since")
    ap.add_argument("--log", default=LOG)
    args = ap.parse_args()

    if not os.path.exists(args.log):
        print("日志不存在: %s" % args.log)
        print("说明：暂无规划决策被记录。路由日志只在 graph 路径（op:full）产生；")
        print("      op:tool 直调单工具不经规划，不会写路由日志。")
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

    print("规划决策总数: %d" % len(rows))
    if not rows:
        return 0

    # 1) route_source 分布 —— 先看分母干不干净
    print("\n--- route_source 分布 ---")
    src = defaultdict(int)
    for r in rows:
        src[r.get("route_source") or "?"] += 1
    for name, n in sorted(src.items(), key=lambda x: -x[1]):
        print("  %-22s %4d  (%5.1f%%)" % (name, n, 100.0 * n / len(rows)))

    # 2) 只在 planner 正常路由里算 miss（兜底不算规划器的错）
    normal = [r for r in rows if r.get("route_source") == "planner"]
    print("\n--- 分流命中率（仅 route_source=planner，n=%d）---" % len(normal))
    if normal:
        miss = sum(1 for r in normal if r.get("miss"))
        print("  MISS: " + pct(miss, len(normal)))
    else:
        print("  （无正常规划路由样本）")

    # 3) 兜底率——规划器稳定性指标
    fb = sum(1 for r in rows if r.get("route_source") == "fallback_planner")
    print("  兜底率(fallback_planner): " + pct(fb, len(rows)))
    unk = sum(1 for r in rows if r.get("route_source") == "unknown_tool")
    if unk:
        print("  未定义工具率(unknown_tool): " + pct(unk, len(rows)))

    # 4) MISS 的实际去向——决定下一步调什么
    print("\n--- MISS 去向（期望 -> 实际）---")
    flow = defaultdict(int)
    for r in normal:
        if r.get("miss"):
            flow[(r.get("expected"), r.get("chosen"))] += 1
    if flow:
        for (exp, got), n in sorted(flow.items(), key=lambda x: -x[1]):
            print("  %-22s -> %-22s %d" % (exp, got, n))
    else:
        print("  （无 MISS）")

    print("\n--- chosen 分布 ---")
    ch = defaultdict(int)
    for r in normal:
        ch[r.get("chosen") or "?"] += 1
    for name, n in sorted(ch.items(), key=lambda x: -x[1]):
        print("  %-22s %4d" % (name, n))
    return 0


if __name__ == "__main__":
    sys.exit(main())
