# 项目信息备案金额字段6位小数修复
苏州市房地产监测V3 中项目信息备案表单的金额字段因 `:dot="6"` 出现 6 位小数，已修复为 2 位。

## 问题原因
- `项目总投资`、`国有投资金额` 的 `amount-input` 写了 `:dot="6"`
- 面积等字段用组件默认 `dot: 2`，导致金额显示如 `1,085.565600` 的 6 位小数

## 修复方式
- 已去掉上述字段的 `:dot="6"`，与 `AmountInput` 默认两位小数一致
- 涉及文件：`customerProject/detail.vue`、`customerProject/changeDetail.vue`、`customerProject/components/ParcelDialog.vue`
- 失焦按 `formatFixedDecimal` 保留 2 位；展示走 `v-money`/`currencyFormatter` 也是 2 位

## 验证与归属
- 验证：刷新页面后投资金额显示为如 `1,085.57` 万元
- 所属项目：苏州市房地产监测V3；来源会话：808426b7-f075-4d66-95f6-bcfc95218970

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "amount_dot_fix",
  "source_extraction_id": "eb7c3c1e01c14b17a2de9c1e4de0e0e9",
  "version": 1,
  "memory_type": "entities"
}
-->