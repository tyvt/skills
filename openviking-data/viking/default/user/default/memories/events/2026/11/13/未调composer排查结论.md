# Summary
2026-11-13 排查确认，新任务使用编排器但未调用 composer 是由任务形态决定而非配置丢失；composer-2.5 仅挂在 langgraph-orchestrator 的 config 中，任务为执行类时规划器正确派给 pwsh，composer 本就不该被调用。
# 2026-11-13 (Friday) ChatLog:
**user**: 2026-11-13 排查『新任务用了编排器但没用 composer』：结论是任务形态决定而非配置丢失。cursor/composer-2.5 仅挂在 langgraph-orchestrator config....

<!-- MEMORY_FIELDS
{
  "event_name": "未调composer排查结论",
  "goal": "记录排查根因",
  "summary": "2026-11-13 排查确认，新任务使用编排器但未调用 composer 是由任务形态决定而非配置丢失；composer-2.5 仅挂在 langgraph-orchestrator 的 config 中，任务为执行类时规划器正确派给 pwsh，composer 本就不该被调用。",
  "ranges": "0",
  "source_extraction_id": "f012afdf8d2b40c08522c4fd80055c4a",
  "version": 1,
  "memory_type": "events"
}
-->