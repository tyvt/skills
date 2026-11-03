# House Select Dialog tree param missing and list parse heuristic bug
In Suzhou Real Estate Monitoring V3, `HouseSelectDialog.vue` had an unfilled `tree` prop causing a prop warning, and `findHouseList`/`parseApiList` had parameter and heuristic parsing defects.

## Root Cause
- `HouseSelectDialog.vue` `tree` prop was not filled, causing a Vue prop warning
- `findHouseList` did not fix `key` and `buildCode` fallbacks
- `parseApiList` used `Object.values` heuristic which easily misjudged the API response structure

## Fix
- Added `buildingSelectTree` to fill `treeUrl/treeKey/treeLabel`
- Request body fixed with `key: String(projectId)` and `buildCode` plus fallback
- `parseApiList` only recognizes arrays, `rows`, `list` and same-kind fields under `data`
- When pagination exceeds length, prompt shows only the first N items

## Verification
- Evidence: src=苏州市房地产监测V3-rest/020.md
- Files: building/houseLimitAudit/index.vue, building/houseLimit/limitAdd.vue, building/houseLimit/components/HouseSelectDialog.vue, building/houseMerge/detail.vue, building/houseLimit/limitFormMixin.js, components/zs-select-dialog/zs-select-dialog-func.vue, components/BuildingTableViewTabs.vue, components/zs-select-dialog/zs-select-dialog.vue
- Project: 苏州市房地产监测V3; Source session: b1e26906-7719-47ec-96f7-a8e3dc7a48fa; Code base: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "house_tree_parse",
  "source_extraction_id": "0b7b022a5898402b92372b2cf88fe87d",
  "version": 1,
  "memory_type": "entities"
}
-->