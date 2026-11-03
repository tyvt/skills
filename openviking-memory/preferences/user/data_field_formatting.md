- 申报明细表格普通字段（楼幢号、单元名称等）直接绑定后端字段，不加自定义格式化。
- 金额/面积字段（actualFloorArea、billAmount 等）统一使用 `formatters.amountFormatter`。
- 删除 `formatBillAmountColumn` 等自定义格式化方法与 `billAmountSum` 等字段兜底映射。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "data_field_formatting",
  "source_extraction_id": "b2ccd8c8a7544a0a964a644555f9bb44",
  "version": 1,
  "memory_type": "preferences"
}
-->