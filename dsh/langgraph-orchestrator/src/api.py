"""编排器 API 层：给 DSH 工具插件用的「一次调用 -> 一个 dict」入口。

不依赖 CLI，直接复用 router / graph。
- run_tool(tool, request) -> dict  单工具(带故障转移)
- run_full(request) -> dict        完整编排(plan/dispatch/execute/summarize)
两者都返回可直接 json.dumps 的结构，供 Node 插件消费。
"""
from __future__ import annotations

from pathlib import Path
from typing import Any, Dict

from .config import load_config
from .router import ModelRouter
from .graph import build_graph, run_orchestration

DEFAULT_CFG = str(Path(__file__).resolve().parent.parent / "config.yaml")


def _attempts(res) -> list:
    return [
        {"model": a.model, "ok": a.ok, "elapsed": round(a.elapsed, 2), "error": a.error}
        for a in res.attempts
    ]


def run_tool(tool: str, request: str, config_path: str = DEFAULT_CFG) -> Dict[str, Any]:
    cfg = load_config(config_path)
    router = ModelRouter(cfg)
    res = router.run_tool(tool, [{"role": "user", "content": request}])
    return {
        "mode": "tool",
        "tool": res.tool,
        "ok": res.ok,
        "model_used": res.model_used,
        "content": res.content,
        "attempts": _attempts(res),
    }


def run_full(request: str, config_path: str = DEFAULT_CFG) -> Dict[str, Any]:
    cfg = load_config(config_path)
    router = ModelRouter(cfg)
    app = build_graph(router, cfg)
    state = run_orchestration(app, request)
    return {
        "mode": "full",
        "ok": bool(state.get("final")),
        "final": state.get("final", ""),
        "plan": state.get("plan", []),
        "steps": state.get("results", []),
        "trace": state.get("trace", []),
    }


def list_tools(config_path: str = DEFAULT_CFG) -> Dict[str, Any]:
    cfg = load_config(config_path)
    return {
        "mode": "list",
        "gateway": cfg.gateway.base_url,
        "tools": {
            name: {
                "description": t.description,
                "models": [m.model for m in t.models],
            }
            for name, t in cfg.tools.items()
        },
    }
