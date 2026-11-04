# 一般表决决策明细勾选与线下投票录入修复
太仓G 一般表决详情「业主决策明细」标签下，决策明细行无法勾选且「线下投票录入」按钮禁用的问题已修复。

## 问题根因
- DecisionRangeTable.vue 复选框 `selectable` 错误绑定 `canEditRange`（仅草稿 `bizState==='0'` 可勾选）
- 已提交表决 `bizState==='2'`，导致决策明细行无法勾选
- 「线下投票录入」按钮因 `single` 恒为 `true` 而保持禁用

## 修复方案
- 新增 `isRowSelectable` 计算属性：草稿态（`canEditRange`）或已提交且表决进行中（`showSuccess && !voteDisabled`）即可勾选
- 同步修复 optionDecision 模块中相同问题

## 验证与归属
- 验证：刷新页面，在「业主决策明细」→「决策明细」勾选记录，「线下投票录入」按钮可点击
- 涉及文件：`decisionCommon/components/DecisionRangeTable.vue`、`optionDecision/detail.vue`、`optionDecision/components/DecisionRangeTable.vue`
- 所属项目：太仓G；来源会话：1e824235-0e5e-44dd-9dc4-238cd6a1389a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_selectable",
  "source_extraction_id": "2dd7391766cd43be9516f6aa2465c206",
  "version": 1,
  "memory_type": "entities"
}
-->