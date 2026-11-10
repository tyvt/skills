# langgraph-orchestrator
新建的基于LangGraph的多模型工具编排框架，位于 langgraph-orchestrator/ 目录。

## Description
- 配置驱动：config.yaml中每个工具对应一个有序模型池（主+多个备用）。
- 核心组件：src/router.py（模型路由与故障转移）、src/graph.py（LangGraph编排图）、src/config.py、src/cli.py。
- 实际路径：D:\repository\skills\dsh\langgraph-orchestrator（2026-11-10 确认）。
- 编排图在 dispatch 与 execute 间插入 security_guard 节点审查 pwsh/db_write 高危调用；State 含 environment_context 字段（cwd、env 等）实现状态外置，执行后写回。
- 路由器支持主模型抛错/超时/空回复/命中retry_on关键字自动降级，单模型指数退避重试，失败模型进冷却期排到池尾。

## Purpose
- 将不同工具交由不同magpie模型完成，一个工具可由多个备用模型灵活配置。

## Relations
- 依赖magpie模型网关（base_url+api_key "magpie"）与langgraph 0.2.35、langchain-openai 0.3.35。
- 参考已有 mmvp-bench/orchestrate.py 的扇出模式。

## Usage Tracking
- 2026-11-10 前：ToolResult 仅记录 tool/ok/content/model_used/attempts，Attempt 仅 model/ok/elapsed/error，未落盘网关返回的 usage（prompt_tokens、completion_tokens）。
- 2026-11-10 补全：router.py 新增 Usage 数据类，_call_once 读取 resp.usage 挂到 ToolResult.usage 并往 stderr 打 [usage] 行；graph.py 每次调用追加 model_calls（角色、模型、耗时、usage）；api.py 的 run_full 返回 model_calls 与 usage_totals。
- 审查节点补充了遗漏的提前返回，避免漏记失败的审查调用。

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "langgraph_orchestrator",
  "source_extraction_id": "60ad290fe0334ad3a8b2943f0e4a9160",
  "version": 3,
  "memory_type": "entities"
}
-->