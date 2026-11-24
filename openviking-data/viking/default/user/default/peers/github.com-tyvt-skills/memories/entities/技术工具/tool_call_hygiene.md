# tool-call-hygiene
DSH skills 仓库中的技能，提供工具调用失败时的人工自愈手册，与 agent-guard、orchestrator 插件形成「自动兜底 + 文档兜底」的互补关系。

## 定位
- 以 SKILL.md 形式维护各工具错误码的人工修复步骤。
- 2026-11-24 起在 SKILL.md 第 10-19 行新增职责边界声明，先列明插件已自动兜底的范围，再给人工兜底句。

## 与插件的关系
- agent-guard（插件）自动修参数形状并做供应商失败恢复；orchestrator（插件）自动故障转移。
- 声明覆盖的自动范围：工具名别名、参数形状、escalation 配对、GOAL/todo 字段、@{} 引号、供应商失败/故障转移。
- 保留兜底句：自动修复未发生时人工核对 schema。

## 2026-11-24 变更
- 删除 5 个被插件覆盖的错误码行：INVALID_ARGS（形状）、ESCALATION_ARGS、UNKNOWN_TOOL、GOAL_*、@{u}。
- 保留空参数退化行（guard 无法推断必填值）；第 2 节只留 read 与 worktree 两条插件覆盖不到的约束；description 移除 3 个已覆盖码。
- 验证 git diff --check exit=0，提交 3d532ab6 推送 origin/main，其余脏文件未提交。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术工具",
  "name": "tool_call_hygiene",
  "source_extraction_id": "17096213d6dc41d9bc2f2738dac17f1d",
  "version": 1,
  "memory_type": "entities"
}
-->