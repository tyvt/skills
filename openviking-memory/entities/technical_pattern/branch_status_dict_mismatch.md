# Branch Status Dict Mismatch
Branch_record_state dictionary conflicted with bizState interface code causing misdisplay of "已注销" in Suzhou real estate monitoring V3.

## Problem
- branch_record_state dict value 2 means 已注销, but interface bizState value 2 means 已备案
- Directly querying table caused list to misdisplay "已注销"

## Fix
- branchStatus.js maps via cancelStatus and bizState dictionary code
- Added e2e/institution/agency-branch-status.spec.js for validation

## Verification
- Evidence: src=苏州市房地产监测V3/024.md
- Source session: db358c02-d2dc-45a3-b641-20f260d73f4b
- Files: AgencyPersonnelList.vue, personnelStatus.js, AgencyBranchList.vue, branchStatus.js, AgencyPersonnelDetail.vue, StatusAdjustDialog.vue, InfoCardDialog.vue, zs-table-column.vue

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "branch_status_dict_mismatch",
  "source_extraction_id": "1cc45ec5d4884c59bd02675edfddcc14",
  "version": 1,
  "memory_type": "entities"
}
-->