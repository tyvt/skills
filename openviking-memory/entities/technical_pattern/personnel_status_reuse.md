# Developer personnel status reuses personnelStatus
In Suzhou Real Estate Monitoring V3, `personnelStatus.js` and a dictionary are reused to display personnel business status by composite state.

## Pattern
- Reuse `src/utils/personnelStatus.js` and `personnel_business_status` dictionary, display status by `bizState` + `cancelStatus` composite
- `staffManagement` and `toB/personnelRecord` list `listCallback` appends `_personnelStatusCode`
- Status column rendered with `tag`; cancel/change buttons add `!isPersonnelCancelled(row)` check

## Verification
- Evidence: src=苏州市房地产监测V3-rest/021.md
- Files: institution/record/index.vue, utils/personnelStatus.js, company/staffManagement/components/index.vue, toB/personnelRecord/components/index.vue, institution/agencyPersonnel/components/AgencyPersonnelList.vue, mixins/ListTemplate.js, company/staffManagement/components/detail.vue, components/zs-table-column/zs-table-column.vue
- Project: 苏州市房地产监测V3; Source session: aee9a3ba-5a81-43af-bc39-5611731be2b1; Code base: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "personnel_status_reuse",
  "source_extraction_id": "0b7b022a5898402b92372b2cf88fe87d",
  "version": 1,
  "memory_type": "entities"
}
-->