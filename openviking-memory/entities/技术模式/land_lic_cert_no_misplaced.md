# Land use planning license property cert number misplaced
In 苏州市房地产监测V3, `BaseLandLicForm.vue` and `changeDetail.vue` place the property rights cert number at the 4th position, not matching the design draft.

## Problem Root Cause
- `BaseLandLicForm.vue` and `changeDetail.vue` have property rights cert number at 4th position, not matching design

## Solution
- Adjust property rights cert number to after land nature (7th position)
- Sync modify view-state `contentInfo` and edit-state template in both files
- Validation and cert number selection logic unchanged

## Verification and Attribution
- Verification: src=苏州市房地产监测V3-leftover/016.md
- Involved files: projectManagement/certificate/planLic/detail.vue, projectManagement/certificate/stateLandLic/detail.vue, 路由信息.json, projectManagement/certificate/conLandLic/detail.vue, projectManagement/certificate/conLandLic/components/BaseLandLicForm.vue, projectManagement/certificate/conLandLicChange/detail.vue, projectManagement/certificate/conLandLic/changeDetail.vue
- Project: 苏州市房地产监测V3; source session 2ad09f88-3393-44cf-96b0-eda0601788c6; code baseline none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_lic_cert_no_misplaced",
  "source_extraction_id": "40b50386543f48a8aa414293683a2a75",
  "version": 1,
  "memory_type": "entities"
}
-->