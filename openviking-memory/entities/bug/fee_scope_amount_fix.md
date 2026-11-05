# 费用绑定表格金额不显示修复
苏住房G(zhi2-web-admin) 费用申报 feeBindScopeTable.vue 金额列因字段未对齐汇总接口导致显示 0.00，已修复。

## 问题根因
- 列表接口返回 billAmountSum、discountAmountSum 等汇总字段
- 表格却绑定了 billAmount、actualAmount 等旧字段，取不到值后被格式化成 0.00

## 修复内容
- 账单总金额对齐为 billAmountSum
- 优惠总金额对齐为 discountAmountSum
- 实收总金额对齐为 actualReceivedAmount
- 欠费金额对齐为 arrearsAmount
- 若实收或欠费仍不对，需提供接口实际返回字段名继续调整

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/property/feeDeclare2/components/feeBindScopeTable.vue
- 来源会话ID：2b5e91c2-08d1-43eb-b794-4d03b269f91a

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "fee_scope_amount_fix",
  "source_extraction_id": "ed95a44e919c4b86bd75d9544ebd9b29",
  "version": 1,
  "memory_type": "entities"
}
-->