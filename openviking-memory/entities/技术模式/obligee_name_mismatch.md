# 弹窗字段obligee误用致权利人拼接显示为空
列表接口返回 obligeeName，但决策范围详情弹窗绑定 form.obligee 字段不一致，致「权利人拼接」显示为空。

## 问题根因
- 列表接口返回 `obligeeName`，决策范围详情弹窗绑定 `form.obligee` 字段不一致
- 导致「权利人拼接」为空，无法正确展示权利人

## 修复方案
- 在 `decisionCommon/components/DecisionRangeDialog.vue`、`DecisionRangeDialogLite.vue`、`ownerDecision/components/DecisionRangeDialog.vue`、`optionDecision/components/DecisionRangeDialog.vue` 中统一将 `obligee` 改为 `obligeeName`

## 验证与归属
- 验证证据：光标会话 9b1512b5-51d7-49c5-9762-41a7264a1453 提取
- 涉及文件：ownerDecision/components/DecisionRangeDialog.vue、decisionCommon/components/DecisionRangeTable.vue、decisionCommon/components/DecisionRangeDialog.vue、api/estate/decisionRange.js、decisionCommon/components/DecisionRangeDialogLite.vue、optionDecision/components/DecisionRangeDialog.vue
- 所属项目：太仓G；来源会话：9b1512b5-51d7-49c5-9762-41a7264a1453；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "obligee_name_mismatch",
  "source_extraction_id": "975f8cf81e1849d283acc90cad1435ef",
  "version": 1,
  "memory_type": "entities"
}
-->