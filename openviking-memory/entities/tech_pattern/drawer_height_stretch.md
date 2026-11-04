# Statistics Map Drawer Height Stretch
The statisticsMap drawer should only let detail blocks participate in height stretch to avoid over-stretching middle blocks like property rooms.

## Problem
- Setting `flex: 1` on all adjacent `collapse-container` in statisticsMap drawer stretches middle blocks undesirably.

## Fix
- `operatingAssets.vue` only lets asset, resource, or parking detail blocks participate in stretch.
- Use `is-compact` to avoid empty data table stretching via `height: 100%`.
- Keep 24px spacing at detail block and drawer bottom each.

## Affected Files
- `zhi2-web-admin/src/views/benefit/mobilePreview/pubPropertyManage/index.vue`
- `zhi2-web-admin/src/views/property/mapProperty/index.vue`
- `zhi2-web-admin/src/views/benefit/statisticsMap/index.vue`
- `zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue`
- `zhi2-web-admin/src/views/benefit/statisticsMap/overviewContent.vue`
- `zhi2-web-admin/src/views/benefit/statisticsMap/rentAccount.vue`
- `zhi2-web-admin/src/views/benefit/statisticsMap/rentIncomeExpense.vue`
- `zhi2-web-admin/src/components/zs-table/zs-table.vue`

## Source
- Extracted from cursor session 2431564f-227c-4069-96c8-0f3f02adf6c3.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "drawer_height_stretch",
  "source_extraction_id": "8b3bb81b3dec481da722ad672320236c",
  "version": 1,
  "memory_type": "entities"
}
-->