# zs-table-column 金额列对齐逻辑收窄
苏州市房地产监测V3 中 `zs-table-column.vue` 去除了误伤文本列的对齐与格式化规则，仅显式金额列右对齐。

## 问题原因
- `isAmountColumn` 除显式 `formatter: amountFormatter` 外还走 `isTableMeasureColumn`（列名含「缴款」「金额」等即命中）
- 导致「缴款通知书类型」等文本列被误判为金额列右对齐/格式化
- 全局默认左对齐影响面过大

## 修改内容
- 去掉 `isTableMeasureColumn`，仅 `auto-amount` 或已识别金额 formatter 视为金额列
- 去掉全局默认左对齐，恢复 Element 表格原有对齐；仅金额列未显式指定时右对齐
- `tableColumnMeasure.js` 保留供显式引用，不再全局生效

## 涉及文件
- `src/components/zs-table-column/zs-table-column.vue`
- `src/utils/tableColumnMeasure.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：85c1bd5d-b004-4f47-8bcc-11ef7ca26d87
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zstable_align_fix",
  "source_extraction_id": "4e19ad089b314ee7a3955a02853db69b",
  "version": 1,
  "memory_type": "entities"
}
-->