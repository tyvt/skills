- 认为 AGENTS.md/skill 规则是软约束，长会话中会被模型选择性忽略，不赞成继续往里堆字。
- 偏好三层分离保障约束：硬约束用 git pre-commit hook 门禁（管可判定缺件）、半硬约束用 DSH plugin 注入 notice（管时机性提醒）、软约束用 skill 示例/清单（管流程顺序）。
- 在 skills 仓库 agent 规则演进中确认：AGENTS.md 只做索引入口（三行硬约束索引）不堆细节；可判定动作缺失项（如二次ask、e2e预检）用 hook 硬卡（零误伤），语义顺序类（定位顺序、lint模板）落 skill 双写 (as of 2026-11-13)

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "agent约束执行策略",
  "source_extraction_id": "85402565e2e74988af5075c4c48ab189",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "preferences"
}
-->