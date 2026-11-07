# Todo Table Columns Config
The flowable todo.vue table was refactored to use a columns configuration and duplicate options were removed.

## Change Detail
- Migrated todo.vue table columns to a columns config defining menuName and link event properties
- Removed duplicate busCodeOptions definition from data

## Affected Files
- zhi2-web-admin/src/views/flowable/todo.vue
- zhi2-web-admin/src/mixins/ListTemplate.js
- zhi2-web-admin/src/mixins/listMixins.js
- zhi2-web-admin/src/mixins/table.js

## Verification
- Source cursor session: 43c31fa0-2afa-4155-861c-52d80df36f42
- Code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：43c31fa0-2afa-4155-861c-52d80df36f42


<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "todo_columns_config",
  "source_extraction_id": "e430f49a552a4095b922c92baa03f3e4",
  "version": 1,
  "memory_type": "entities"
}
-->
