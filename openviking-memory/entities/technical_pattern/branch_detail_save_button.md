
# Branch Detail Save Button Gating
AgencyBranchDetail.vue defines header-button gating so the "保存" button only appears in editable states, not in view mode.

## Problem
- Header button group did not limit editability by business state
- Branch detail view mode incorrectly showed the "保存" (Save) button

## Solution
- `AgencyBranchDetail.vue` defines `canEditInHeader` (B-end and bizState==='0' not deactivated)
- `showSaveButton` is true only when adding or `canEditInHeader` is true
- `isViewDisplay` is read-only when viewing or not editable, aligned with list page conditions

## Files and Attribution
- Verification: src=苏州市房地产监测V3/166.md
- Files: institution/agencyBranch/components/AgencyBranchDetail.vue, institution/agencyPersonnel/components/AgencyPersonnelDetail.vue, mixins/detailMixins.js, property/complex/detail.vue, OperationBtnGroup/index.vue, institution/agencyBranch/components/AgencyBranchList.vue, mixins/form.js, main.js
- Project: 苏州市房地产监测V3; source session: 27689708-9f9b-4386-9993-e547142b1ab3; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：27689708-9f9b-4386-9993-e547142b1ab3


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "branch_detail_save_button",
  "source_extraction_id": "494398012a1245589ff9d3e73a52e1cb",
  "version": 1,
  "memory_type": "entities"
}
-->
