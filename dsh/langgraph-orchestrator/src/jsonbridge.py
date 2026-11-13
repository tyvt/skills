"""JSON 桥接：读 stdin 的一个 JSON 请求，跑编排，向 stdout 吐一个 JSON 结果。

供 DSH Node 工具插件(dsh-orchestrator)调用。避免命令行参数转义/编码问题。

stdin:  {"op": "full"|"tool"|"list"|"plan_review", "request": "...", "tool": "planner",
        "plan": "Markdown 计划正文(plan_review)", "context": "任务背景(plan_review)",
        "session_id": "对话ID", "config": "可选路径"}
stdout: 只有最终那一个 JSON 对象。日志、[usage]、库打印都走 stderr。
"""
from __future__ import annotations

import json
import sys

from . import api


def _emit(out, payload: dict) -> None:
    out.write(json.dumps(payload, ensure_ascii=False) + "\n")
    out.flush()


def main() -> int:
    real_stdout = sys.stdout
    # 工作期间任何 print / 库日志都不能进 stdout，否则 Node 侧 JSON.parse 会被 [usage] 冲掉。
    sys.stdout = sys.stderr
    code = 1
    try:
        try:
            raw = sys.stdin.buffer.read().decode("utf-8-sig")
            req = json.loads(raw) if raw.strip() else {}
        except Exception as e:
            _emit(real_stdout, {"ok": False, "error": f"bad stdin json: {e}"})
            return 2

        op = req.get("op", "full")
        cfg = req.get("config") or api.DEFAULT_CFG
        session_id = req.get("session_id", "") or ""
        try:
            if op == "list":
                out = api.list_tools(cfg)
                out["ok"] = True
            elif op == "tool":
                tool = req.get("tool", "")
                request = req.get("request", "")
                if not tool or not request:
                    _emit(real_stdout, {"ok": False, "error": "tool 和 request 必填"})
                    return 2
                out = api.run_tool(tool, request, cfg, session_id)
            elif op == "full":
                request = req.get("request", "")
                if req.get("execution") is not None:
                    from .execution import run_execution
                    out = run_execution(req.get("workdir", ""), req["execution"], session_id)
                elif req.get("log_ref"):
                    from .execution import read_log
                    out = read_log(req["log_ref"], session_id,
                                   offset=req.get("offset", 0), limit=req.get("limit", 2000))
                else:
                    if not request:
                        _emit(real_stdout, {"ok": False, "error": "request 必填"})
                        return 2
                    out = api.run_full(request, cfg, session_id,
                                       workdir=req.get("workdir") or "",
                                       project_cwd=req.get("project_cwd") or req.get("projectCwd") or "")
            elif op == "plan_review":
                # req 带 plan（Markdown 计划正文）与 request/context（任务背景）。
                plan = req.get("plan", "") or ""
                if not plan.strip() and not req.get("delta"):
                    _emit(real_stdout, {"ok": False, "error": "plan 或 delta 必填"})
                    return 2
                context = req.get("context", "") or req.get("request", "") or ""
                plan_path = req.get("plan_path", "") or ""
                out = api.run_plan_review(plan, context, cfg, session_id, plan_path,
                                          workdir=req.get("workdir", ""),
                                          base_sha=req.get("base_sha", ""),
                                          base_version=req.get("base_version"), delta=req.get("delta"))
            else:
                _emit(real_stdout, {"ok": False, "error": f"未知 op: {op}"})
                return 2
        except Exception as e:  # noqa: BLE001
            _emit(real_stdout, {"ok": False, "error": f"{type(e).__name__}: {e}"})
            return 1
        if isinstance(out, dict) and "usage" not in out:
            out["usage"] = out.get("usage_totals") or {
                "prompt_tokens": None,
                "completion_tokens": None,
                "total_tokens": None,
            }
        _emit(real_stdout, out)
        code = 0 if out.get("ok", True) else 1
    finally:
        sys.stdout = real_stdout
    return code


if __name__ == "__main__":
    sys.exit(main())
