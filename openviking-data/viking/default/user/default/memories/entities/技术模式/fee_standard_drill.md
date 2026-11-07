# 费用标准统计下钻参数（苏住房G）
苏住房G 项目 publicQuery/feeStandardStats 表格下钻时按维度注入 groupMode 参数。
## 字段与逻辑
- 按建成年份汇总：handleCellClick 中当 dimensionType === BUILD_YEAR 时注入 groupMode: 'buildYear'
- 按物业类型汇总：不传该参数，保持原样
- ComplexDetailDialog 将 filterParams 原样传给接口 feeStandardStatsDrill
## 涉及文件
- zhi2-web-admin/src/views/publicQuery/feeStandardStats/index.vue（handleCellClick 192-206行）
- components/ComplexDetailDialog.vue
- constants.js
## 验证与归属
- 所属项目：苏住房G；来源会话：bf287e2e-6c1c-45a5-b644-3eedfa7788d4；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_standard_drill",
  "source_extraction_id": "74129eda8d3f40a694d895ddf91ed661",
  "version": 1,
  "memory_type": "entities"
}
-->