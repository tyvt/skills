# Vote Area Column Center Fix
Fix for voting tables' building area column not centered, unified width 130 and center align across Huaian and Huishan projects.

## Root Cause
- `zs-table-column.vue` `amountFormatter` defaults to right align only when `align`/`headerAlign` not passed; explicit `center` works.

## Fix
- Six voting tables (e.g., `DecisionRangeTable`) set building area column `width:130`, `align:center`, `headerAlign:center`.
- Sync with Huishan project unified to same 130 width.

## Involved Files
- `zhi2-web-admin/src/views/system/publicPage/index.vue`
- `zhi2-web-admin/src/views/autonomy/option/components/DecisionRangeTable.vue`
- `zhi2-web-admin/src/views/autonomy/option/detail.vue`
- `huishan2G/zhi2-web-admin/src/views/autonomy/option/components/DecisionRangeTable.vue`
- `zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue`

## Verification
- Source cursor session `51317350-fbe8-4ba5-8ad7-1e8ca1e088d0`; code baseline none.

<!-- MEMORY_FIELDS
{
  "category": "前端缺陷",
  "name": "vote_area_column",
  "source_extraction_id": "c54ea1fc0b874b5fb77122b39e78f660",
  "version": 2,
  "memory_type": "entities"
}
-->