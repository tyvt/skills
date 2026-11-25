# agent-guard
agent-guard 用于约束和记录 Agent 的探索与验证循环。

## 当前策略
- `exploration-drift` 为 warn，仅记账。
- `verify-loop` 参数为 `agentBrowserMax 12`、`Start-Sleep 5`、按 session 累计且不重置。
- `verify-loop` 于 2026-11-24 由 block 降为 warn。
- 该变更需要重启 web 后在新会话生效。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "工具链",
  "name": "agent_guard",
  "source_extraction_id": "55ec517f876a490cabd712f25c420452",
  "version": 1,
  "memory_type": "entities"
}
-->