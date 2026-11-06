# 物业费账单减免记录表头内容对齐修复（苏住房G）
苏住房G 项目修复物业服务费账单详情中减免/优惠记录列表表头与内容对齐不一致的问题。

## 问题原因
- `账单金额`、`减免/优惠金额` 使用 `amountFormatter`，`zs-table-column` 自动将金额列表头右对齐
- 列配置又写 `align: 'left'`，仅改单元格对齐，导致表头靠右、数字靠左看似错列

## 修复内容
- 去掉这两列的 `align: 'left'`，表头与内容均按金额列默认右对齐

## 涉及文件与归属
- 涉及文件：`property/bill/components/reduceRecordTable.vue`
- 所属项目：苏住房G；来源会话：52c41da7-725c-4836-b868-685c5d2316d9；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "reduce_align_fix",
  "source_extraction_id": "07c5dd5811794d2c87b3f9503f43828e",
  "version": 1,
  "memory_type": "entities"
}
-->