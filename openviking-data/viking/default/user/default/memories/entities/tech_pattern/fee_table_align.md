# feeBindScopeTable金额列字段对齐
苏住房G中feeBindScopeTable.vue原绑定旧金额字段致格式化0.00，已对齐为接口返回的汇总字段。
## 问题根因
- 列表接口返回billAmountSum等汇总字段
- feeBindScopeTable.vue原绑定billAmount等旧字段致格式化显示0.00
## 解决方案
- 账单总金额→billAmountSum、优惠→discountAmountSum、实收→actualReceivedAmount、欠费→arrearsAmount
## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：src=苏住房G/033.md
- 涉及文件：feeBindScopeTable.vue、detail.vue、formatters/index.js、subTableMixins.js、table.js、tableComponents.js、zs-table-column.vue、feeBindScopeDetailDialog.vue
- 来源会话：2b5e91c2-08d1-43eb-b794-4d03b269f91a

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "fee_table_align",
  "source_extraction_id": "9045f3f234e04b8fad54878354d961ab",
  "version": 1,
  "memory_type": "entities"
}
-->