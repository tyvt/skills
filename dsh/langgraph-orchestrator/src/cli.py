"""CLI 入口。

用法：
  python -m src.cli "帮我分析这段代码..."            # 跑完整编排
  python -m src.cli --tool file_reader "把这段总结一下"  # 只调单个工具的模型池
  python -m src.cli --list                            # 列出工具与模型池
"""
from __future__ import annotations

import argparse
import io
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "buffer"):
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "buffer"):
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

from .config import load_config
from .router import ModelRouter
from .graph import build_graph, run_orchestration

DEFAULT_CFG = str(Path(__file__).resolve().parent.parent / "config.yaml")


def _print_tools(cfg) -> None:
    print(f"网关: {cfg.gateway.base_url}")
    for t in cfg.tools.values():
        print(f"\n[{t.name}]  {t.description}")
        for i, m in enumerate(t.models):
            tag = "主" if i == 0 else f"备{i}"
            print(f"   {tag}: {m.model}")


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="LangGraph 多模型工具编排器")
    ap.add_argument("request", nargs="?", help="用户请求")
    ap.add_argument("--config", default=DEFAULT_CFG)
    ap.add_argument("--tool", help="只调单个工具，不跑完整编排")
    ap.add_argument("--list", action="store_true", help="列出工具与模型池")
    args = ap.parse_args(argv)

    cfg = load_config(args.config)

    if args.list:
        _print_tools(cfg)
        return 0

    if not args.request:
        ap.error("需要提供 request，或使用 --list/--tool")

    router = ModelRouter(cfg)

    if args.tool:
        res = router.run_tool(args.tool, [{"role": "user", "content": args.request}])
        print(f"tool={res.tool} ok={res.ok} model={res.model_used}")
        for a in res.attempts:
            print(f"   attempt {a.model} ok={a.ok} {a.elapsed:.1f}s {a.error or ''}")
        print("---")
        print(res.content)
        return 0 if res.ok else 2

    app = build_graph(router, cfg)
    final_state = run_orchestration(app, args.request)

    print("=== TRACE ===")
    for line in final_state.get("trace", []):
        print(" ", line)
    print("\n=== PLAN ===")
    print(json.dumps(final_state.get("plan", []), ensure_ascii=False, indent=2))
    print("\n=== RESULT (per step) ===")
    for i, r in enumerate(final_state.get("results", [])):
        print(f"[{i+1}] tool={r['tool']} model={r.get('model_used')} ok={r['ok']}")
    print("\n=== MODEL CALLS ===")
    for c in final_state.get("model_calls", []):
        u = c.get("usage") or {}
        print(
            f"  {c.get('role')} model={c.get('model')} elapsed={c.get('elapsed')}s "
            f"prompt={u.get('prompt_tokens')} completion={u.get('completion_tokens')}"
        )
    print("\n=== FINAL ===")
    print(final_state.get("final", ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
