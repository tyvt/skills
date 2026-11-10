# dsh-orchestrator
DSH 的 LangGraph 编排器入口插件，symlinked 到 ~/.dsh/，零依赖。

## 基本属性
- 本地插件 dsh-orchestrator，源码路径含 src/api.py、src/jsonbridge.py、orchestrator/lib/index.js
- symlinked 到 ~/.dsh/，零依赖

## 用量回执
- api.py 的 run_tool 返回单次调用的 usage，保持不变 (as of 2026-11-10)
- api.py 的 run_full 把 state.get("usage_totals") 放入 usage；图状态缺该字段时按 model_calls 汇总；usage_totals 保留指向同一对象 (as of 2026-11-10)
- jsonbridge.py 在写出 stdout 前补齐 usage；上游未给时依次取 usage_totals，再没有则填 prompt_tokens/completion_tokens/total_tokens 全为 null (as of 2026-11-10)
- orchestrator/lib/index.js 的 renderResult 在 tool 与 full 模式正文末尾追加一行 [Tokens] Prompt: X, Completion: Y；两值均为 null 时不渲染 (as of 2026-11-10)
- py_compile 与 node --check 已通过；插件侧改动需重启 Web 进程后生效 (as of 2026-11-10)

## 编排配置
- run_full 结束时会把每次 model_call 以 JSONL 追加写入 .sessions/<session_id>.costs.jsonl（无合法 session id 时写 anonymous.costs.jsonl）；每行含 ts、session_id、role、tool、model、ok、elapsed、usage (as of 2026-11-10)
- planner 工具池 max_tokens 工具级上限已改回 4096；配置层支持按模型单独设置 max_tokens，路由器优先取模型自身值、无则回落工具级上限；仅 hy3 单独设 2048，兜底 grok-4.7 仍用 4096 (as of 2026-11-10)
- node_plan 不再在返回后按字符截断规划结果以避免切坏 JSON；PLANNER_SYSTEM 要求只输出 JSON 数组、禁止解释与 Markdown、步骤数 1-5，解析后仅保留前 5 步 (as of 2026-11-10)
- file_reader 在写步骤结果前及 summarize 最终答复均改为头尾各保留 2000 字符硬截断 (as of 2026-11-10)

## 诊断与工具
- 脚本 D:\repository\skills\dsh\langgraph-orchestrator\scripts\cost_bill.py 可聚合 .sessions/*.costs.jsonl 打印《工具 × 模型 × Token 消耗账单》 (as of 2026-11-10)
- 缓存未命中排查结论：会话 4aa52982 与 5b8643ac 的未命中发生在宿主 cursor/grok-4.7@256k，并非 file_reader；真正回传命令输出的是 pwsh，其已有头尾各 1000 字 _clip (as of 2026-11-10)

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_orchestrator",
  "source_extraction_id": "8f41cee1dc6248ff9223721e2b6bd4f0",
  "version": 1,
  "memory_type": "entities"
}
-->