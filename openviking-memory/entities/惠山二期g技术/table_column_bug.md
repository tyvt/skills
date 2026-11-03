# 表格开关列固定宽度截断Bug
zs-table-column对开关列写死60px宽致长表头被ellipsis截断，已通过计算较大列宽修复。

## 问题根因
- src/components/zs-table-column/zs-table-column.vue 对开关列写死60px宽
- 表头文字超出被 ellipsis 截断

## 修复方案
- 计算列宽时取原固定宽度与表头文字所需宽度较大值，避免表头截断

## 验证与归属
- 验证证据：src=惠山二期G/012.md
- 涉及文件：src/views/autonomy/change/property/index.vue、src/mixins/ListTemplate.js、src/components/zs-table-column/zs-table-column.vue、src/views/autonomy/change/supervisory/index.vue
- 所属项目：惠山二期G；来源会话：01a166e0-c480-764e-99b7-41d6177a4487；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "table_column_bug",
  "source_extraction_id": "231c4221ac6f44ddb6585f0f9f0386c6",
  "version": 1,
  "memory_type": "entities"
}
-->