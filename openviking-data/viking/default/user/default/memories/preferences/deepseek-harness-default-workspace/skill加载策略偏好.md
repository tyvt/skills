- 简单 Bug 场景下只加载当前任务必须的一个 skill，避免同时拉取多个巨型规则（如 zentao-analyzer 与 szfc-page-guard）。
- 仅当改动涉及复杂表单、子表或加密接口时，才加载 szfc-page-guard；该规则同时写在 AGENTS.md 与 zentao-analyzer/SKILL.md。
- 若某 Skill（如 repo-safety）未在会话技能目录中注册，直接跳过，不再调用 skill 工具，也不再报错。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "Skill加载策略偏好",
  "source_extraction_id": "652ce6c1f5da4d959e37b2e4e2d8c060",
  "version": 1,
  "memory_type": "preferences"
}
-->