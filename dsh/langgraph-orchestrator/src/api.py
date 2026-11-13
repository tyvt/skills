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
# 计划审核专用工具池名（见 config.yaml tools.plan_reviewer）。
PLAN_REVIEW_TOOL = "plan_reviewer"
# 计划 Markdown 太长会让审核模型 token 爆掉且抓不住重点，超出则截断保留头尾。
PLAN_REVIEW_CLIP_CHARS = 16000
_PLAN_REVIEW_SYSTEM = (
    "你是高级方案审核员。审核提交的 Markdown 计划，重点判断是否存在会阻断落地的问题。\n"
    "【分级】把每个问题标为 P0 / P1 / P2：\n"
    "- P0（阻断落地）：不修就无法安全/正确实施，或会直接导致事故。仅以下情形算 P0：\n"
    "  a) 缺关键前置事实/依赖，按计划执行必然失败；\n"
    "  b) 存在会破坏数据/环境/历史的不可逆操作且无回滚；\n"
    "  c) 涉及高危写操作（删库/强推/越权）且无防护；\n"
    "  d) 实施方案自相矛盾或关键步骤缺失，无法落地；\n"
    "  e) 明确违反仓库/安全硬规则（如提交 .env、绕过 gate）。\n"
    "- P1（重要但不阻断）：影响质量/可维护性，可在实施中处理（如验证偏弱、边界未覆盖）。\n"
    "- P2（建议）：措辞、排版、可优化项。\n"
    "【灰区】拿不准是 P0 还是 P1 的，一律判 P1，并在该条文本末尾标注「（灰区，待人确认）」。\n"
    "【判定】verdict=reject 当且仅当存在 P0 问题；P1/P2 一律判 pass。score 仅作参考，不参与判定。\n"
    "最多列3个阻断项，每项text不超过180字；建议最多3条且每条不超过100字。不要复述计划或输出全文。\n"
    "只输出一个 JSON 对象，不要任何解释文字或代码块标记，字段为："
    '{"verdict":"pass"|"reject","score":0-100,'
    '"issues":[{"level":"P0"|"P1"|"P2","text":"..."}],"suggestions":["..."]}。\n'
    "issues 写具体问题并标注 level，suggestions 写可直接执行的修改建议。"
)
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


def _clip_plan(plan_markdown: str, limit: int = PLAN_REVIEW_CLIP_CHARS) -> tuple:
    """把过长的计划截成「头 + 尾」，中间标注省略了多少字符。返回 (文本, 是否截断)。"""
    text = plan_markdown or ""
    if len(text) <= limit:
        return text, False
    head = int(limit * 0.7)
    tail = limit - head
    omitted = len(text) - limit
    clipped = (
        text[:head]
        + f"\n\n…（计划过长，中间省略 {omitted} 字符）…\n\n"
        + text[-tail:]
    )
    return clipped, True


def _extract_json_object(text: str) -> Optional[Dict[str, Any]]:
    """从模型输出里抠出第一个 JSON 对象（容忍 ```json 包裹或前后废话）。失败返回 None。"""
    if not text:
        return None
    s = text.strip()
    # 去掉 ```json ... ``` 代码围栏
    fence = re.search(r"```(?:json)?\s*(.*?)```", s, re.DOTALL | re.IGNORECASE)
    if fence:
        s = fence.group(1).strip()
    try:
        obj = json.loads(s)
        return obj if isinstance(obj, dict) else None
    except (json.JSONDecodeError, TypeError):
        pass
    # 兜底：抓第一个 { 到最后一个 }
    start = s.find("{")
    end = s.rfind("}")
    if start != -1 and end > start:
        try:
            obj = json.loads(s[start : end + 1])
            return obj if isinstance(obj, dict) else None
        except (json.JSONDecodeError, TypeError):
            return None
    return None


def _normalize_review(obj: Optional[Dict[str, Any]], raw: str) -> Dict[str, Any]:
    """把审核模型输出收敛成稳定结构；解析失败时按 reject 保守处理。

    仅 P0 阻断：verdict=reject 当且仅当存在 level=P0 的问题；score 不参与判定。
    """
    if not isinstance(obj, dict):
        return {
            "verdict": "reject",
            "score": 0,
            "issues": [{"level": "P0", "text": "审核模型输出无法解析为 JSON，按保守策略判 reject"},
                       {"level": "P0", "text": (raw or "")[:500]}],
            "issue_texts": ["审核模型输出无法解析为 JSON，按保守策略判 reject", (raw or "")[:500]],
            "p0_count": 2,
            "suggestions": ["请人工复核计划，或重试 plan_review"],
        }
    try:
        score = int(obj.get("score", 0))
    except (TypeError, ValueError):
        score = 0
    score = max(0, min(100, score))

    def _norm_issues(v):
        """兼容两种格式：对象数组 [{level,text}] 或旧字符串数组。旧字符串默认 P1（不阻断）。"""
        out = []
        items = v if isinstance(v, list) else ([v] if v not in (None, "") else [])
        for it in items:
            if isinstance(it, dict):
                text = str(it.get("text", "")).strip()
                lvl = str(it.get("level", "")).strip().upper()
                if lvl not in ("P0", "P1", "P2"):
                    lvl = "P1"
            else:
                text = str(it).strip()
                lvl = "P1"
            if text:
                out.append({"level": lvl, "text": text})
        return out

    def _as_list(v):
        if isinstance(v, list):
            return [str(x) for x in v]
        if v in (None, ""):
            return []
        return [str(v)]

    issues = _norm_issues(obj.get("issues"))
    p0_count = sum(1 for i in issues if i["level"] == "P0")
    # 一致性裁决：只看是否有 P0，忽略模型原始 verdict 与 score（score 不参与判定）。
    verdict = "reject" if p0_count > 0 else "pass"
    return {
        "verdict": verdict,
        "score": score,
        "issues": issues,
        "issue_texts": [i["text"] for i in issues],
        "p0_count": p0_count,
        "suggestions": _as_list(obj.get("suggestions")),
    }


def run_plan_review(
    plan_markdown: str,
    task_context: str = "",
    config_path: str = DEFAULT_CFG,
    session_id: str = "",
    plan_path: str = "",
    workdir: str = "",
    base_sha: str = "",
    base_version: Optional[int] = None,
    delta: Optional[list] = None,
) -> Dict[str, Any]:
    """把 Markdown 计划交高级模型（plan_reviewer 池，当前首选 workbuddy/deepseek-v4.1-flash）审核。

    返回 {verdict, score, issues, suggestions, model_used, usage, ok, clipped}。
    plan 过长会在 PLAN_REVIEW_CLIP_CHARS 处截断（保留头尾）并置 clipped=True。
    """
    from .plan_versions import prepare, record
    prepared = prepare(workdir or _root_for(config_path), plan_path, session_id,
                       plan_markdown, base_sha, base_version, delta)
    plan = prepared["plan_markdown"]
    # A pass must cover the complete reconstructed version, never a clipped plan.
    if len(plan) > PLAN_REVIEW_CLIP_CHARS:
        raise ValueError("plan exceeds review size limit; shorten before review")
    latest = prepared.get("latest")
    if (latest and latest.get("verdict") == "pass" and not latest.get("stale")
            and latest.get("plan_sha256") == prepared["plan_sha256"]):
        return {
            "mode": "plan_review", "ok": True, "verdict": "pass", "reused": True,
            "code": "PLAN_UNCHANGED_USE_REVIEW", "plan_sha256": prepared["plan_sha256"],
            "version": latest["version"], "plan_key": prepared["plan_key"],
            "session_id": prepared["session_id"], "score": latest.get("score", 0),
            "p0_count": latest.get("p0_count", 0), "issues": [], "suggestions": [],
        }
    clipped = False
    cfg = load_config(config_path)
    router = ModelRouter(cfg)
    user_content = (
        (f"## 任务背景\n{task_context.strip()}\n\n" if task_context and task_context.strip() else "")
        + "## 待审核计划\n"
        + plan
    )
    messages = [
        {"role": "system", "content": _PLAN_REVIEW_SYSTEM},
        {"role": "user", "content": user_content},
    ]
    res = router.run_tool(PLAN_REVIEW_TOOL, messages)
    review = _normalize_review(_extract_json_object(res.content), res.content)
    usage = _usage(res)
    _append_costs(session_id, [{
        "role": "plan_review",
        "tool": res.tool,
        "model": res.model_used,
        "ok": res.ok,
        "elapsed": round(sum(a.elapsed for a in res.attempts), 2),
        "usage": usage,
    }])
    if not res.ok:
        review["verdict"] = "reject"
    p0_count = sum(1 for item in review["issues"] if
                   (str(item.get("level", "")).upper() == "P0" if isinstance(item, dict)
                    else bool(re.search(r"\bP0\b", str(item), re.I))))
    entry = record(prepared, review["verdict"], int(review.get("score") or 0), p0_count)
    issues = review["issues"][:3]
    issues = [{"level": str(item.get("level", "P0"))[:8], "text": str(item.get("text", ""))[:240]}
              if isinstance(item, dict) else str(item)[:240] for item in issues]
    result = {
        "mode": "plan_review",
        "plan_sha256": entry["plan_sha256"],
        "version": entry["version"],
        "plan_key": entry["plan_key"],
        "ok": bool(res.ok),
        "verdict": review["verdict"],
        "score": review["score"],
        "issues": issues,
        "p0_count": p0_count,
        "reused": False,
        "suggestions": [str(item)[:160] for item in review["suggestions"][:3]],
        "model_used": str(res.model_used)[:120],
        "usage": {k: v if isinstance(v, (int, float, type(None))) else None for k, v in usage.items() if k in {"prompt_tokens", "completion_tokens", "total_tokens"}},
        "clipped": clipped,
        "session_id": prepared["session_id"],
    }
    # Enforce a serialized Unicode-character budget, including JSON syntax.
    if len(json.dumps(result, ensure_ascii=False)) > 4000:
        result.pop("suggestions", None)
        result["issues"] = ["Review output exceeded response budget; inspect the plan and re-review."]
    if len(json.dumps(result, ensure_ascii=False)) > 4000:
        result.pop("plan_key", None)
    return result


def run_full(request: str, config_path: str = DEFAULT_CFG, session_id: str = "", workdir: str = "") -> Dict[str, Any]:
    if not isinstance(workdir, str) or not workdir.strip():
        return {"mode": "full", "ok": False, "error": "WORKDIR_REQUIRED"}
    if not Path(workdir).is_absolute():
        return {"mode": "full", "ok": False, "error": "WORKDIR_REQUIRED"}
    try:
        directory = Path(workdir).resolve(strict=True)
        if not directory.is_dir():
            raise ValueError("not a directory")
    except (OSError, ValueError):
        return {"mode": "full", "ok": False, "error": "WORKDIR_NOT_FOUND"}
    root = str(directory)
    cfg = load_config(config_path)
    router = ModelRouter(cfg)
    app = build_graph(router, cfg)
    reset = _RESET.search(request or "") is not None
    start = {"cwd": root, "env": {}, "recent_env": {}} if reset else load_environment(session_id, root)
    start["cwd"] = root
    state = run_orchestration(app, request, start)
    ctx = state.get("environment_context") or {}
    results = state.get("results") or []
    succeeded = bool(state.get("final")) and all(isinstance(step, dict) and step.get("ok") is True for step in results)
    if succeeded:
        save_environment(session_id, ctx, root)
    calls = state.get("model_calls", [])
    _append_costs(session_id, calls)
    usage = state.get("usage_totals") or _sum_usage(calls)
    return {
        "mode": "full",
        "ok": succeeded,
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
