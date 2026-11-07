# List Scroll Paging Failure When Not Filled
List data not filling visible height causes no scrollbar, so scroll-to-bottom event never fires and pagination load fails.

## Problem
- `zs-select-dialog-func.vue` restores scroll loading and implements `checkTreeFill` to auto-continue loading until a scrollbar appears or data exhausted.
- Remove page-number pagination control.

## Related Components
- `CandidateDialog.vue` retains `treePageSize: 10` to request 10 items per page.
- Affects `CandidateDialog.vue` under autonomy/record, autonomy/election/apply, autonomy/candidateCollect, and `rangeTable.vue`, `zs-pagination.vue`, `zs-select-dialog.vue`, `SKILL.md`.

## Verification
- Evidence: src=泰兴G/002.md; project: 泰兴G (zhi2-web-admin); source session 908f5228-a584-4485-a746-432febf5a60f; code baseline none.
- Involved files: autonomy/record/components/CandidateDialog.vue, autonomy/election/components/apply/CandidateDialog.vue, zs-select-dialog/zs-select-dialog-func.vue, property/complex/components/rangeTable.vue, zs-select-dialog/SKILL.md, zs-select-dialog/zs-select-dialog.vue, autonomy/candidateCollect/components/CandidateDialog.vue, zs-pagination/zs-pagination.vue.

## 验证与归属
- 所属项目：泰兴G
- 验证证据：extracted source=cursor project=泰兴G
- 来源会话：908f5228-a584-4485-a746-432febf5a60f


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "list_scroll_paging",
  "source_extraction_id": "a7402af70cfa466c86fdee52d80cd310",
  "version": 1,
  "memory_type": "entities"
}
-->
