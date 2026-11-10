"""把 .sessions/*.costs.jsonl 打成「工具/角色 × 模型 × token」账单。

用法（在 langgraph-orchestrator 目录）:
  python scripts/cost_bill.py
  python scripts/cost_bill.py .sessions
"""
import json
import sys
from collections import defaultdict
from pathlib import Path

def main() -> None:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / ".sessions"
    files = sorted(root.glob("*.costs.jsonl"))
    if not files:
        print(f"没有账单文件: {root}")
        return
    agg = defaultdict(lambda: {"calls": 0, "prompt": 0, "completion": 0, "missing": 0, "elapsed": 0.0})
    for fp in files:
        for line in fp.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            row = json.loads(line)
            key = (row.get("tool") or row.get("role") or "-", row.get("model") or "-")
            bucket = agg[key]
            bucket["calls"] += 1
            usage = row.get("usage") or {}
            p, c = usage.get("prompt_tokens"), usage.get("completion_tokens")
            if p is None and c is None:
                bucket["missing"] += 1
            bucket["prompt"] += p or 0
            bucket["completion"] += c or 0
            bucket["elapsed"] += float(row.get("elapsed") or 0)
    print(f"{'tool/role':<22} {'model':<42} {'calls':>5} {'prompt':>10} {'completion':>10} {'elapsed_s':>9} {'no_usage':>8}")
    for (tool, model), b in sorted(agg.items(), key=lambda kv: -(kv[1]["prompt"] + kv[1]["completion"])):
        print(f"{tool:<22} {model:<42} {b['calls']:>5} {b['prompt']:>10} {b['completion']:>10} {b['elapsed']:>9.1f} {b['missing']:>8}")

if __name__ == "__main__":
    main()
