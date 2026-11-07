# 费用标准统计下钻rowLabel字段修复
苏住房G 项目修复 publicQuery/feeStandardStats 下钻时行标识字段传错导致接口异常的问题。

## 问题原因
- handleCellClick 把行标识传成 dimensionValue
- 下钻接口 feeStandardStatsDrill 期望字段名为 rowLabel（与汇总接口返回的 rowLabel 一致，如 low、business、little_high）

## 修改说明
- src/views/publicQuery/feeStandardStats/index.vue 的 handleCellClick 中将 dimensionValue 改为 rowLabel

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G
- 涉及文件：src/views/publicQuery/feeStandardStats/index.vue、components/ComplexDetailDialog.vue
- 来源会话：8b941e49-61cc-488f-9aec-53846bc6e898

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "fee_standard_stats_rowlabel",
  "source_extraction_id": "ace134c14d6e4dd4b9c2a649ed580e48",
  "version": 1,
  "memory_type": "entities"
}
-->