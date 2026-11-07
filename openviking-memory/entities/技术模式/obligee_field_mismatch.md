# 决策范围详情权利人字段不一致修复
太仓G端「决策范围详情」弹窗因字段名不一致导致权利人拼接为空，已修复。

## 问题根因
- 列表接口返回字段 `obligeeName`，但弹窗绑定 `form.obligee`，字段名不一致致显示为空

## 修复方案
- 在 4 个弹窗组件将 `obligee` 统一改为 `obligeeName`：
  - `decisionCommon/components/DecisionRangeDialog.vue`
  - `decisionCommon/components/DecisionRangeDialogLite.vue`
  - `ownerDecision/components/DecisionRangeDialog.vue`
  - `optionDecision/components/DecisionRangeDialog.vue`
- 若刷新后仍为空，说明后端该记录本身无权利人数据

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 所属项目：太仓G；来源会话：9b1512b5-51d7-49c5-9762-41a7264a1453；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "obligee_field_mismatch",
  "source_extraction_id": "dd32723f05a14b2bb4948bdacf39d9ea",
  "version": 1,
  "memory_type": "entities"
}
-->