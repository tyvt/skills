# zhi2-web-admin Vue 对话框插槽与 v-model 修复模式
产品2.0前端多个对话框组件存在插槽嵌套错误与 prop 上误用 v-model 的问题，已统一修复。

## 修复要点
- 不在 prop 上使用 `v-model`，改为 `:visible` + `@update:visible`。
- `#append` / `#footer` / `#title` 应与 `#prepend` 同级，不嵌套在 `#prepend` 内。
- `#title` 只包标题并提前闭合，主体内容放默认插槽。
- 模板指令拼写需正确（如 `-if` 改为 `v-if`）。
- `<template #footer>` 作为 `zs-dialog` 直接子节点，移出 `form-box`。

## 涉及文件
- maintenance/initiation/detail.vue
- maintenance/maintenanceApply/components/PriceTrendDialog.vue
- maintenance/maintenanceProject/detail.vue
- property/complex/components/StatisticsDialog.vue
- property/complexDeliveryApply/detail.vue

## 验证与归属
- 另含 property/spotChecking/checkingDia（文件名截断，疑似 checkingDialog.vue）
- 所属项目：2-0；来源会话：74b0cccb-98ed-4ca2-b756-cfe54408c16b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_slot_vmodel",
  "source_extraction_id": "3400efcaecbd48c681577d6ac9594dd0",
  "version": 1,
  "memory_type": "entities"
}
-->