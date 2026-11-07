# Subject column width unset triggers content-based measurement
The zs-table-column in HomeTodoTable.vue declares no width/min-width, triggering canvas measurement of the full subject text inside zs-table-column.vue.

## Root cause
- The zs-table-column in HomeTodoTable.vue declares no width/min-width
- Triggers canvas measurement of the full subject text in zs-table-column.vue

## Fix
- Add COLUMN_PADDING=48 to the measurement
- Column width limited to 80~500px
- Width comes from the component's automatic calculation, not the page style

## Involved files
- zhi2-web-admin/src/views/home/components/HomeTodoTable.vue
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue

## Verification and origin
- Evidence: cursor session extraction
- Project: portal; session: 01edc950-1251-43f8-9d66-1720c46869de

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 来源会话：01edc950-1251-43f8-9d66-1720c46869de


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "todo_table_col_width",
  "source_extraction_id": "901c89ab7bc74fdba0496feae18a55a3",
  "version": 2,
  "memory_type": "entities"
}
-->
