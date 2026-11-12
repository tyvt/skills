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
    "你是高级方案审核员。严格审核提交的 Markdown 计划是否满足以下要求：\n"
    "1) 前因后果清楚：讲清任务/Bug 的背景、问题现象与根因；\n"
    "2) 实施方案可落地且分布合理：分步、每步落哪个文件、怎么验证，步骤之间无遗漏或矛盾；\n"
    "3) 有风险与回滚：列出可能风险及失败时的回滚/止损办法；\n"
    "4) 有验证步骤：可执行的验收验证计划。\n"
    "只输出一个 JSON 对象，不要任何解释文字或代码块标记，字段为："
    '{"verdict":"pass"|"reject","score":0-100,"issues":["..."],"suggestions":["..."]}。\n'
    "score 为整体质量分（0-100）；只要存在阻断落地的问题，verdict 必须为 reject，"
    "score 低于 70 也应判 reject。issues 写具体问题，suggestions 写可直接执行的修改建议。"
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
    """把审核模型输出收敛成稳定结构；解析失败时按 reject 保守处理。"""
    if not isinstance(obj, dict):
        return {
            "verdict": "reject",
            "score": 0,
            "issues": ["审核模型输出无法解析为 JSON，按保守策略判 reject", (raw or "")[:500]],
            "suggestions": ["请人工复核计划，或重试 plan_review"],
        }
    verdict = str(obj.get("verdict", "")).strip().lower()
    if verdict not in ("pass", "reject"):
        verdict = "reject"
    try:
        score = int(obj.get("score", 0))
    except (TypeError, ValueError):
        score = 0
    score = max(0, min(100, score))
    def _as_list(v):
        if isinstance(v, list):
            return [str(x) for x in v]
        if v in (None, ""):
            return []
        return [str(v)]
    # 与判定对齐：分数不足 70 的 pass 视为 reject，避免「勉强通过」。
    if verdict == "pass" and score < 70:
        verdict = "reject"
    return {
        "verdict": verdict,
        "score": score,
        "issues": _as_list(obj.get("issues")),
        "suggestions": _as_list(obj.get("suggestions")),
    }


def _review_state_path(root: str) -> Path:
    return Path(root) / ".plan" / "_review.json"


def _load_review_state(root: str) -> Dict[str, Any]:
    """读 .plan/_review.json；缺失/损坏返回空结构（fail-open，不抛）。"""
    p = _review_state_path(root)
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
        if isinstance(data, dict) and isinstance(data.get("entries"), list):
            return data
    except Exception:
        pass
    return {"entries": []}


def _write_review_state(root: str, state: Dict[str, Any]) -> None:
    """原子写 .plan/_review.json（tmp + os.replace）；任何异常吞掉，不阻断 review。"""
    try:
        p = _review_state_path(root)
        p.parent.mkdir(parents=True, exist_ok=True)
        tmp = p.with_suffix(".json.tmp")
        tmp.write_text(json.dumps(state, ensure_ascii=False), encoding="utf-8")
        os.replace(str(tmp), str(p))
    except Exception:
        pass


def _record_review(
    root: str, plan_markdown: str, plan_path: str, verdict: str, score: int,
) -> None:
    """把本轮 review 结果按 plan_key 落盘：轮次按 plan_key 累计（与内容 sha 解耦）。"""
    import hashlib
    plan_sha = hashlib.sha256((plan_markdown or "").encode("utf-8")).hexdigest()
    try:
        if plan_path:
            plan_key = os.path.relpath(os.path.abspath(plan_path), os.path.abspath(root))
        else:
            plan_key = ".plan/_unknown.md"
    except Exception:
        plan_key = ".plan/_unknown.md"
    plan_key = plan_key.replace("\\", "/")

    state = _load_review_state(root)
    entries = state.get("entries", [])
    # 同 plan_key 的条目按时间排序找最新
    same = [e for e in entries if e.get("plan_key") == plan_key]
    same.sort(key=lambda e: e.get("ts", ""))
    prev_round = same[-1].get("round", 0) if same else 0
    prev_sha = same[-1].get("plan_sha256") if same else None

    # 内容未变（同 sha）→ round 不增；内容变 → round+1
    if prev_sha == plan_sha:
        new_round = prev_round if prev_round > 0 else 1
    else:
        new_round = prev_round + 1

    try:
        plan_mtime = os.path.getmtime(plan_path) if plan_path and os.path.exists(plan_path) else 0.0
    except Exception:
        plan_mtime = 0.0

    ts = time.strftime("%Y-%m-%dT%H:%M:%S%z")
    # 同 plan_key 旧条目标 stale=true
    for e in entries:
        if e.get("plan_key") == plan_key and e.get("plan_sha256") != plan_sha:
            e["stale"] = True

    entry = {
        "plan_key": plan_key,
        "plan_rel_path": plan_key,
        "plan_sha256": plan_sha,
        "plan_markdown": plan_markdown or "",
        "plan_mtime": plan_mtime,
        "round": new_round,
        "parent_sha": prev_sha,
        "verdict": verdict,
        "score": score,
        "ts": ts,
        "stale": False,
    }
    # 同 plan_key + 同 sha 覆盖旧条；否则 append
    replaced = False
    for idx, e in enumerate(entries):
        if e.get("plan_key") == plan_key and e.get("plan_sha256") == plan_sha:
            entries[idx] = entry
            replaced = True
            break
    if not replaced:
        entries.append(entry)
    # 每个 plan_key 保留最近 5 轮
    from collections import OrderedDict
    by_key: Dict[str, list] = OrderedDict()
    for e in entries:
        by_key.setdefault(e.get("plan_key", ""), []).append(e)
    kept = []
    for k, lst in by_key.items():
        lst.sort(key=lambda e: e.get("ts", ""))
        kept.extend(lst[-5:])
    state["entries"] = kept
    _write_review_state(root, state)


def run_plan_review(
    plan_markdown: str,
    task_context: str = "",
    config_path: str = DEFAULT_CFG,
    session_id: str = "",
    plan_path: str = "",
) -> Dict[str, Any]:
    """把 Markdown 计划交高级模型（plan_reviewer 池，当前首选 workbuddy/deepseek-v4.1-flash）审核。

    返回 {verdict, score, issues, suggestions, model_used, usage, ok, clipped}。
    plan 过长会在 PLAN_REVIEW_CLIP_CHARS 处截断（保留头尾）并置 clipped=True。
    """
    cfg = load_config(config_path)
    router = ModelRouter(cfg)
    plan, clipped = _clip_plan(plan_markdown or "")
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
    # E2 桥接：把本轮 review 结果落盘 .plan/_review.json，供 plan-gate 读盘复用/计轮次。
    # plan_path 缺省时按 session_id 派生，plan-gate 用同一相对路径键匹配。
    _pp = plan_path
    if not _pp:
        try:
            _pp = str(Path(_root_for(config_path)) / ".plan" / f"{_session_key(session_id) or 'anonymous'}.md")
        except Exception:
            _pp = ""
    _record_review(
        _root_for(config_path), plan, _pp,
        review["verdict"], int(review.get("score") or 0),
    )
    return {
        "mode": "plan_review",
        "ok": bool(res.ok),
        "verdict": review["verdict"],
        "score": review["score"],
        "issues": review["issues"],
        "suggestions": review["suggestions"],
        "model_used": res.model_used,
        "usage": usage,
        "clipped": clipped,
        "raw": res.content,
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
