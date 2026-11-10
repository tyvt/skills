"""LangGraph 编排图：规划 -> 分派工具 -> 用工具对应模型池执行 -> 汇总。

图结构(StateGraph)：
    plan ──> dispatch ──> execute ──> (若还有步骤) dispatch ... ──> summarize ──> END

- plan:     用 planner 工具(模型池)把用户需求拆成有序步骤，每步指定 tool
- dispatch: 取下一个待执行步骤
- execute:  按步骤的 tool 调用 ModelRouter.run_tool()，自动故障转移
- summarize:用 planner/file_reader 池把各步结果汇总成最终答案

所有 LLM 调用都经由 ModelRouter，因此**每一步都可能用到不同的 magpie 模型，且主模型挂了自动切备用**。
"""
from __future__ import annotations

import json
from typing import Any, Dict, List, Optional, TypedDict

from langgraph.graph import END, StateGraph

from .router import ModelRouter, ToolResult


class OrchState(TypedDict, total=False):
    user_request: str
    plan: List[Dict[str, str]]        # [{tool, instruction}]
    cursor: int
    results: List[Dict[str, Any]]     # [{tool, ok, content, model_used}]
    final: str
    trace: List[str]


PLANNER_SYSTEM = """你是一个任务规划器。把用户需求拆成 1~4 个有序步骤。
每一步必须从下列工具中选一个，并给出明确指令：
{tools}
只输出 JSON 数组，形如:
[{{"tool": "工具名", "instruction": "具体做什么"}}]
不要输出任何其他文字。"""


def _extract_json_array(text: str) -> List[Dict[str, str]]:
    """从模型输出里稳妥地提取 JSON 数组。"""
    text = text.strip()
    if text.startswith("```"):
        # 去掉 ```json ... ``` 包裹
        text = text.split("```", 2)[1]
        if text.startswith("json"):
            text = text[4:]
        text = text.strip()
    start, end = text.find("["), text.rfind("]")
    if start == -1 or end == -1:
        return []
    try:
        data = json.loads(text[start : end + 1])
        return [d for d in data if isinstance(d, dict) and d.get("tool")]
    except Exception:
        return []


def build_graph(router: ModelRouter, cfg):
    """构造并编译 LangGraph 编排图。"""

    def node_plan(state: OrchState) -> OrchState:
        tools_desc = "\n".join(
            f"- {t.name}: {t.description}" for t in cfg.tools.values()
        )
        sys = PLANNER_SYSTEM.format(tools=tools_desc)
        res = router.run_tool(
            "planner",
            [
                {"role": "system", "content": sys},
                {"role": "user", "content": state["user_request"]},
            ],
        )
        plan = _extract_json_array(res.content) if res.ok else []
        if not plan:
            # 规划失败或解析失败 -> 退化为单步：用 planner 直接回答
            plan = [{"tool": "planner", "instruction": state["user_request"]}]
        trace = state.get("trace", [])
        trace.append(f"plan via {res.model_used or 'FALLBACK-FAIL'}: {len(plan)} steps")
        return {"plan": plan, "cursor": 0, "results": [], "trace": trace}

    def node_dispatch(state: OrchState) -> OrchState:
        return state  # 仅作路由中转

    def node_execute(state: OrchState) -> OrchState:
        i = state.get("cursor", 0)
        step = state["plan"][i]
        tool_name = step.get("tool", "planner")
        if tool_name not in cfg.tools:
            tool_name = "planner"
        res: ToolResult = router.run_tool(
            tool_name,
            [{"role": "user", "content": step.get("instruction", "")}],
        )
        results = state.get("results", []) + [
            {
                "tool": res.tool,
                "instruction": step.get("instruction", ""),
                "ok": res.ok,
                "content": res.content,
                "model_used": res.model_used,
                "failed_models": res.failed_models if hasattr(res, "failed_models") else [],
            }
        ]
        trace = state.get("trace", [])
        trace.append(
            f"execute {i+1}/{len(state['plan'])} tool={res.tool} model={res.model_used} ok={res.ok}"
        )
        return {"results": results, "cursor": i + 1, "trace": trace}

    def should_continue(state: OrchState) -> str:
        if state.get("cursor", 0) < len(state.get("plan", [])):
            return "dispatch"
        return "summarize"

    def node_summarize(state: OrchState) -> OrchState:
        results = state.get("results", [])
        if not results:
            return {"final": "(无步骤结果)"}
        # 若只有一个成功结果且它就是 planner 直答，直接返回
        if len(results) == 1 and results[0]["tool"] == "planner" and results[0]["ok"]:
            return {"final": results[0]["content"]}
        joined = "\n\n".join(
            f"[步骤{i+1} · {r['tool']} · {r.get('model_used')}]\n{r['content']}"
            for i, r in enumerate(results)
        )
        res = router.run_tool(
            "file_reader",
            [
                {"role": "system", "content": "你是汇总器。把各步骤结果整合成对用户连贯的最终答复，去除重复与中间过程。"},
                {"role": "user", "content": f"用户需求：{state['user_request']}\n\n各步骤结果：\n{joined}"},
            ],
        )
        trace = state.get("trace", [])
        trace.append(f"summarize via {res.model_used} ok={res.ok}")
        return {"final": res.content if res.ok else joined, "trace": trace}

    # 节点名不能与 state 的 key 同名(plan/results 等)，故统一加 node_ 前缀
    g = StateGraph(OrchState)
    g.add_node("node_plan", node_plan)
    g.add_node("node_dispatch", node_dispatch)
    g.add_node("node_execute", node_execute)
    g.add_node("node_summarize", node_summarize)

    g.set_entry_point("node_plan")
    g.add_edge("node_plan", "node_dispatch")
    g.add_edge("node_dispatch", "node_execute")
    g.add_conditional_edges(
        "node_execute", should_continue, {"dispatch": "node_dispatch", "summarize": "node_summarize"}
    )
    g.add_edge("node_summarize", END)
    return g.compile()


def run_orchestration(app, user_request: str) -> OrchState:
    """运行一次编排，返回最终状态(含 plan/results/final/trace)。"""
    init: OrchState = {"user_request": user_request, "cursor": 0, "results": [], "trace": []}
    return app.invoke(init)
