# 公共组件 zs-table-column 列宽塌陷修复
园区物管2.0 公共组件 `zs-table-column` 在 `v-for`+`v-if` 场景下误判自定义列导致列宽塌陷，已在组件内修复，所有使用页受益。
## 问题根因
- 原 `zs-table-column` 只要检测到 `$scopedSlots.default` 存在就把列宽固定为 80px
- Vue 2 在 `v-for`+`v-if` 下为每一列注册插槽函数，即使 `v-if=false` 不渲染也被误判为「自定义列」，整表列宽塌陷
## 解决方案
- `hasEffectiveCustomSlot`：实际执行插槽函数判断真实渲染内容（过滤 `v-if=false` 空插槽）
- `isMeasurableFlexSlot`：区分文本类插槽（弹性 `min-width`）与复杂组件插槽（固定 `width`，可用 `slot-width` 覆盖）
- `measureSlotContentWidth`：从插槽 vnode 提取文本按实际内容计算列宽
- 弹性列注册：用 `watch isFlexColumn` 动态注册/注销，保证表格 `fit` 正确开启
## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/credit/evaluationPlanReport/index.vue、detail.vue、components/CompanyTable.vue 及公共组件 zs-table-column.vue
- 所属项目：园区物管2.0；来源会话：0c43b56c-d4b3-4a08-9e9f-7c6394b3a716；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_column_fix",
  "source_extraction_id": "477bafa538a146f292640a311974b9bc",
  "version": 1,
  "memory_type": "entities"
}
-->