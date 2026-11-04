# Table Container Bottom Padding Whitespace
The zs-table-container--bottom-spacing adds padding-bottom:12px when pagination is hidden, causing extra whitespace under horizontal scrollbar.

## Root Cause
- Class `zs-table-container--bottom-spacing` applies `padding-bottom: 12px` to whole table container when pagination hidden.
- Horizontal scrollbar sits below, creating visible extra blank space.

## Fix
- Remove the padding-bottom and keep the bottom border.
- If empty table spacing is needed, add it on the outer `list-card` instead.

## Affected Files
- `zhi2-web-admin/src/views/benefit/pubHouse/index.vue`
- `zhi2-web-admin/src/views/benefit/pubHouse/components/pubHouseTable.vue`
- `zhi2-web-admin/src/views/property/complex/components/regionTree.vue`
- `zhi2-web-admin/src/views/benefit/housePart/index.vue`
- `zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue`
- `zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue`
- `zhi2-web-admin/src/views/benefit/housePart/detail.vue`
- `zhi2-web-admin/src/styles/element-ui.scss`

## Source
- Extracted from cursor session c719772b-6ff9-441f-b247-7d29dfa7d3e2; project: zhi2-web-admin.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "table_bottom_gap",
  "source_extraction_id": "8b3bb81b3dec481da722ad672320236c",
  "version": 1,
  "memory_type": "entities"
}
-->