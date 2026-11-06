# 选项表决线下投票录入勾选修复
苏住房G 业主决策-选项表决模块中，线下投票录入时因勾选列被 bizState 条件限制导致无法选择，已完成修复。

## 问题根因
- `CandidateConfigTable.vue` 勾选列受 `v-if="bizState == '0'"` 限制
- `VoteRangeDialog` 调用组件时未传入 `bizState`（表决进行中状态为 `'2'`），勾选列始终不渲染

## 修复方案
- 移除 `zs-select-column` 上的 `bizState == '0'` 条件，线下投票场景始终显示勾选框
- 补充 `disabled` 属性处理，勾选「弃权」后正确禁用表决项选择
- 修正 `row-key` 为 `decisionOptionId`，保证多选状态正确
- 顺带修复 `getQueryParams` 中重复的 `return` 语句
- 同步修复选举模块 `election/components/decision/CandidateConfigTable.vue` 相同问题

## 验证与归属
- 验证：进入业主决策→选项表决，打开一条表决
- 涉及文件：`autonomy/option/components/CandidateConfigTable.vue`、`election/components/decision/CandidateConfigTable.vue`、`VoteRangeDialog.vue`、`DecisionRangeTable.vue`
- 所属项目：苏住房G；来源会话：eaa4289e-4d04-4653-a9b5-6141668140fe；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "candidate_config_fix",
  "source_extraction_id": "ae55cc6b3935446799466a4196796bb8",
  "version": 1,
  "memory_type": "entities"
}
-->