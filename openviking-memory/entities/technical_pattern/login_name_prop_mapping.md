# Login Name Column Field Mapping Error
The logininfor list column bound `prop` to `loginName` while the API returns `userName`, causing blank column.

## Problem
- `system/logininfor/index.vue` columns defined `prop: 'loginName'` for "登录名称" column
- Interface returned field was `userName`, resulting in empty display

## Solution
- Changed `prop` to `userName` to correctly map and display

## Files and Attribution
- File: zhi2-web-admin/src/views/system/logininfor/index.vue
- Project: 产品2.0; source session: 84875e01-4384-43b4-be86-efa80af55ef5; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "login_name_prop_mapping",
  "source_extraction_id": "3fcb9cd3e7b9460e85070135e048a497",
  "version": 1,
  "memory_type": "entities"
}
-->