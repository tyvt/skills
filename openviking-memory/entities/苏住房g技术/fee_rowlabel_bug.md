# 下钻接口rowLabel错传dimensionValue
下钻接口 `feeStandardStatsDrill` 因 `handleCellClick` 误传入参导致 `rowLabel` 缺失的 bug。

## 问题根因
- 下钻接口 `feeStandardStatsDrill` 要求入参 `rowLabel`
- `handleCellClick` 误传 `dimensionValue` 而非 `rowLabel`
- 与汇总接口 `feeStandardStatsByPropertyType` 返回字段未对齐

## 修复方案
- 在 `src/views/publicQuery/feeStandardStats/index.vue` 的 `handleCellClick` 中将 `dimensionValue` 改为 `rowLabel`
- 对齐汇总接口 `feeStandardStatsByPropertyType` 返回字段

## 验证与归属
- 验证证据：src=苏住房G/092.md
- 涉及文件：feeStandardStats/index.vue、ComplexDetailDialog.vue、utils.js、constants.js、StatsTableSection.vue
- 所属项目：苏住房G；来源会话ID：8b941e49-61cc-488f-9aec-53846bc6e898；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "fee_rowlabel_bug",
  "source_extraction_id": "482c499e25834a43ae52011f7d73c444",
  "version": 1,
  "memory_type": "entities"
}
-->