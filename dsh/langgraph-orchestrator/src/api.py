"""编排器 API 层：给 DSH 工具插件用的「一次调用 -> 一个 dict」入口。

不依赖 CLI，直接复用 router / graph。
- run_tool(tool, request) -> dict  单工具(带故障转移)
- run_full(request) -> dict        完整编排(plan/dispatch/execute/summarize)
两者都返回可直接 json.dumps 的结构，供 Node 插件消费。
"""
from __future__ import annotations

import json
import os
import re
import time
from pathlib import Path
from typing import Any, Dict, Optional

from .config import load_config
from .router import ModelRouter
from .graph import build_graph, run_orchestration

DEFAULT_CFG = str(Path(__file__).resolve().parent.parent / "config.yaml")
_SESSION_ID = re.compile(r"^[A-Za-z0-9_-]{8,128}$")
_RESET = re.compile(r"重置环境|回到根目录")
_SESSION_TTL = 7 * 24 * 3600
_STORE = Path(__file__).resolve().parent.parent / ".sessions"


def _session_key(session_id: str) -> Optional[str]:
    key = (session_id or "").strip()
    return key if _SESSION_ID.match(key) else None


def _root_for(config_path: str) -> str:
    return str(Path(config_path).resolve().parent)


def _inside(root: str, cwd: str) -> bool:
    try:
        return os.path.commonpath([os.path.abspath(root), os.path.abspath(cwd)]) == os.path.abspath(root)
    except ValueError:
        return False


def load_environment(session_id: str, root: str) -> Dict[str, Any]:
    """按 session 读工作目录。无记录、非法 id、或目录跑出项目根，都回到根目录。"""
    fresh = {"cwd": root, "env": {}, "recent_env": {}}
    key = _session_key(session_id)
    path = _STORE / f"{key}.json" if key else None
    if path is None or not path.is_file():
        return fresh
    try:
        saved = json.loads(path.read_text(encoding="utf-8"))
        ctx = saved.get("environment_context") or {}
        cwd = ctx.get("cwd") if isinstance(ctx.get("cwd"), str) else root
        env = ctx.get("env") if isinstance(ctx.get("env"), dict) else {}
    except (OSError, json.JSONDecodeError):
        return fresh
    if not _inside(root, cwd):
        return fresh
    return {"cwd": os.path.abspath(cwd), "env": {str(k): str(v) for k, v in env.items()}, "recent_env": {}}


def save_environment(session_id: str, ctx: Dict[str, Any], root: str) -> None:
    """只存 cwd 和命令写入的 env。非法 id 不落盘；目录越界则存根目录。"""
    key = _session_key(session_id)
    if key is None:
        return
    cwd = ctx.get("cwd") if isinstance(ctx.get("cwd"), str) else root
    if not _inside(root, cwd):
        cwd = root
    _STORE.mkdir(exist_ok=True)
    target = _STORE / f"{key}.json"
    payload = {
        "environment_context": {
            "cwd": os.path.abspath(cwd),
            "env": {str(k): str(v) for k, v in (ctx.get("env") or {}).items()},
        }
    }
    tmp = target.with_suffix(".tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    os.replace(tmp, target)
    _drop_expired_sessions()


def _drop_expired_sessions() -> None:
    """保存时顺手清掉超过 7 天没动过的会话文件。清理失败不影响本次保存。"""
    cutoff = time.time() - _SESSION_TTL
    try:
        for path in _STORE.glob("*.json"):
            if path.stat().st_mtime < cutoff:
                path.unlink()
    except OSError:
        return


def _attempts(res) -> list:
    return [
        {"model": a.model, "ok": a.ok, "elapsed": round(a.elapsed, 2), "error": a.error}
        for a in res.attempts
    ]


def _sum_usage(calls: list) -> Dict[str, Any]:
    """把各次调用的 usage 相加。任一调用缺字段则该项为 None，避免把缺失当成 0。"""
    keys = ("prompt_tokens", "completion_tokens", "total_tokens")
    out: Dict[str, Any] = {k: 0 for k in keys}
    out["calls"] = len(calls)
    for c in calls:
        u = c.get("usage") or {}
        for k in keys:
            v = u.get(k)
            out[k] = None if out[k] is None or v is None else out[k] + v
    return out


def _usage(res) -> Dict[str, Any]:
    return res.usage.as_dict() if getattr(res, "usage", None) else {
        "prompt_tokens": None, "completion_tokens": None, "total_tokens": None,
    }


def run_tool(
    tool: str, request: str, config_path: str = DEFAULT_CFG, session_id: str = ""
) -> Dict[str, Any]:
    cfg = load_config(config_path)
    router = ModelRouter(cfg)
    res = router.run_tool(tool, [{"role": "user", "content": request}])
    usage = _usage(res)
    elapsed = round(sum(a.elapsed for a in res.attempts), 2)
    _append_costs(session_id, [{
        "role": "execute",
        "tool": res.tool,
        "model": res.model_used,
        "ok": res.ok,
        "elapsed": elapsed,
        "usage": usage,
    }])
    return {
        "mode": "tool",
        "tool": res.tool,
        "ok": res.ok,
        "model_used": res.model_used,
        "content": res.content,
        "usage": usage,
        "attempts": _attempts(res),
        "session_id": _session_key(session_id) or "anonymous",
    }


def run_full(request: str, config_path: str = DEFAULT_CFG, session_id: str = "") -> Dict[str, Any]:
    cfg = load_config(config_path)
    root = _root_for(config_path)
    router = ModelRouter(cfg)
    app = build_graph(router, cfg)
    reset = _RESET.search(request or "") is not None
    start = {"cwd": root, "env": {}, "recent_env": {}} if reset else load_environment(session_id, root)
    state = run_orchestration(app, request, start)
    ctx = state.get("environment_context") or {}
    save_environment(session_id, ctx, root)
    calls = state.get("model_calls", [])
    _append_costs(session_id, calls)
    usage = state.get("usage_totals") or _sum_usage(calls)
    return {
        "mode": "full",
        "ok": bool(state.get("final")),
        "final": state.get("final", ""),
        "plan": state.get("plan", []),
        "steps": state.get("results", []),
        "trace": state.get("trace", []),
        "model_calls": calls,
        "usage": usage,
        "usage_totals": usage,
        "session_id": _session_key(session_id),
        "cwd": ctx.get("cwd", root),
    }


def _append_costs(session_id: str, calls: list) -> None:
    """每个 model_call 追加一行 JSONL，供按工具/模型做长线账单。"""
    key = _session_key(session_id) or "anonymous"
    _STORE.mkdir(parents=True, exist_ok=True)
    path = _STORE / f"{key}.costs.jsonl"
    ts = time.time()
    with path.open("a", encoding="utf-8") as fh:
        for c in calls or []:
            row = {
                "ts": ts,
                "session_id": key,
                "role": c.get("role"),
                "tool": c.get("tool"),
                "model": c.get("model"),
                "ok": c.get("ok"),
                "elapsed": c.get("elapsed"),
                "usage": c.get("usage") or {},
            }
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")


def list_tools(config_path: str = DEFAULT_CFG) -> Dict[str, Any]:
    cfg = load_config(config_path)
    return {
        "mode": "list",
        "gateway": cfg.gateway.base_url,
        "tools": {
            name: {
                "description": t.description,
                "models": [m.model for m in t.models],
                "local": t.local,
            }
            for name, t in cfg.tools.items()
        },
    }
