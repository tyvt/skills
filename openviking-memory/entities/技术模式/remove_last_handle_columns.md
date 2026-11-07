# Remove LAST_HANDLE_COLUMNS import from finished and process lists
In the 园区公共收益 (zhi2-web-admin) project, finished.vue (done list) and process.vue (initiated-by-me list) wrongly imported LAST_HANDLE_COLUMNS (last-handle column) exclusive to todo.vue, and must remove it.

## Root Cause
- finished.vue and process.vue mistakenly imported LAST_HANDLE_COLUMNS, the last-handle column exclusive to todo.vue

## Fix
- Remove the LAST_HANDLE_COLUMNS import and the columns spread in both finished.vue and process.vue
- todo.vue keeps the column as-is

## Verification and Attribution
- Verification: src=园区公共收益/027.md
- Files: flowable/todo.vue, flowable/index.vue, home/components/TodoTable.vue, utils/todoTask.js, flowable/finished.vue, flowable/process.vue, home/index.vue, zs-table-column/zs-table-column.vue
- Project: 园区公共收益; Source session: 3924b519-9c9c-4c23-8add-6fd9b72aa24a

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：3924b519-9c9c-4c23-8add-6fd9b72aa24a


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_last_handle_columns",
  "source_extraction_id": "f616b0996c1c4735810b158bfa040c14",
  "version": 1,
  "memory_type": "entities"
}
-->
