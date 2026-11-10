# agent_cost_hygiene
agent-cost-hygiene 是 DSH 技能仓库中的场景 skill，用于封装成本管控的会话纪律，避免污染全局 AGENTS.md。

## 用途
- 将「读文件策略、会话配置稳定性、收口时机」沉淀为可复用场景规则，独立于全局配置。

## 内容结构
- 读文件：先 grep -n 拿行号表，再 read offset/limit ≤120 行；禁止整读 >300 行文件；同文件同段不重复读。
- 会话稳定性：同一会话不中途改模型、不改 reasoningEffort，否则整段缓存失效。
- 收尾：git 检查开工一次（worktree list + status -sb + fetch）、收尾一次；最终报告 = 结论 + 证据表 + 未验证项。

## 关系
- 位于 D:\repository\skills\agent-cost-hygiene\SKILL.md，与 tool-call-hygiene 等同级。
- 2026-11-10 由落点 4 新建，提交 1c1c0e16（仅提交未推送）。

<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "技能",
  "name": "agent_cost_hygiene",
  "source_extraction_id": "78d1d5d60eff40019d7ad19085125622",
  "version": 1,
  "memory_type": "entities"
}
-->