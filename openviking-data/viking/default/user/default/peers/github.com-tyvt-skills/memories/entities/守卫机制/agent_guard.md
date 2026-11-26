# agent-guard
`agent-guard` 是 dsh 中的代理守卫机制，包含漂移记账与验证循环控制，以下状态截至 2026-11-24。

## 守卫策略
- `exploration-drift` 为 `warn`，仅记账。
- `verify-loop` 参数：`agentBrowserMax` 12、`Start-Sleep` 5，按 session 累计且不重置。
- `verify-loop` 于 2026-11-24 由 `block` 降为 `warn`。

## 生效范围
- 该调整需重启 web 后在新会话生效。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "守卫机制",
  "name": "agent_guard",
  "source_extraction_id": "19f1674e77c6444a9ef773adf8d7b926",
  "version": 1,
  "memory_type": "entities"
}
-->