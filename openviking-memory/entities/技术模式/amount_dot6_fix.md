# 投资金额字段六位小数修复
苏州市房地产监测V3 中 customerProject 金额输入误设 :dot="6" 致六位小数，已改回默认两位。

## 问题根因
- customerProject 中 detail.vue、changeDetail.vue、ParcelDialog.vue 的项目总投资等 amount-input 误设 `:dot="6"`
- 组件默认 `dot:2`，导致 1,085.565600 这类小数

## 修复方案
- 移除 `:dot="6"` 改用默认两位
- 失焦 `formatFixedDecimal` 及 v-money/currencyFormatter 均保留 2 位

## 涉及文件
- zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue
- zhi2-web-admin/src/components/AmountInput/index.vue
- zhi2-web-admin/src/components/detail-template/detail-template.vue
- zhi2-web-admin/src/directives/formatter/money.js
- zhi2-web-admin/src/views/projectManagement/customerProject/components/ParcelDialog.vue
- zhi2-web-admin/src/views/projectManagement/customerProject/changeDetail.vue

## 验证与归属
- 验证证据：extracted source=cursor session=808426b7-f075-4d66-95f6-bcfc95218970
- 来源会话ID：808426b7-f075-4d66-95f6-bcfc95218970
- 所属项目：苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_dot6_fix",
  "source_extraction_id": "a272ea15b80241319e7bdad773ac5ebe",
  "version": 1,
  "memory_type": "entities"
}
-->