
# Vue2 Mixin showListName Conflict
The listMixins table.js declares data.showListName while StateTable/PlanTable/LicTable redeclare the same computed, triggering a Vue 2 warning.

## Root Cause
- `listMixins` (table.js) declares `showListName` in `data`
- `StateTable`/`PlanTable`/`LicTable` declare `computed.showListName` with the same name, conflicting with the mixin

## Solution
- In `projectEmbeddedCertificateList.js`, a `watch` on `isEmbedded` sets the mixin's `showListName` to `!embedded`
- Remove the duplicate `computed.showListName` from the three components

## Files and Attribution
- Verification: src=苏州市房地产监测V3/164.md (also 苏州市房地产监测V3-rest/120.md)
- Files: ProjectCertificateDetailDialog.vue, ProjectCertificateTabs.vue, stateLandLic/detail.vue, projectEmbeddedCertificateDetail.js, detailMixins.js, StateTable.vue, projectEmbeddedCertificateList.js, ruoyi.js
- Project: 苏州市房地产监测V3; source session: 82c57f89-5320-4ad9-a2ed-1c48587b738a; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：82c57f89-5320-4ad9-a2ed-1c48587b738a


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "vue2_showlistname_conflict",
  "source_extraction_id": "494398012a1245589ff9d3e73a52e1cb",
  "version": 2,
  "memory_type": "entities"
}
-->
