# Statistics grid wraps area value needing flex layout
In 苏住房C (zhi2-mobile-shimin), an equal-width grid in the statistics area wrapped the area value onto multiple lines.

## Root Cause
- Statistics area used a three-column equal-width grid that limited the third column width
- This caused `435,872.00 m²` to break across lines

## Solution
- Change the statistics row to flex + space-between
- Add white-space:nowrap to the StatisticCard value and enable virtualHost
- Remove extra spaces in the area string

## Verification and Attribution
- Evidence: src=cursor session=2bd50aeb-5d2b-4b29-b38e-f1aa4ae7ac4c
- Files: pages_owner/project/info/index.vue, components/infoCard.vue, page-query/property-detail.vue, pages_owner/project/organization/index.vue, styles/cell.scss, pages_owner/house/components/ProjectDetail.vue, uni.scss, pages_owner/project/info/components/StatisticCard.vue
- Project: 苏住房C (zhi2-mobile-shimin); code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stat_grid_area_wrap",
  "source_extraction_id": "5edfa1599d644844a125308dfde52d91",
  "version": 1,
  "memory_type": "entities"
}
-->