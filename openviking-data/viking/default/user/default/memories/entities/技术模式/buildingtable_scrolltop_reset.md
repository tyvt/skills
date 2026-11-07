# Reset scrollTop on pagination to fix blank list in room dialog
In the 园区公共收益 (zhi2-web-admin) project, BuildingTableViewTabs.vue kept a stale scrollTop at the old page bottom after pagination, leaving the new page blank.

## Root Cause
- BuildingTableViewTabs.vue list area uses an overflow: auto scroll container
- After pagination the scrollTop stayed at the old page bottom, making the new page appear blank

## Fix
- Add resetListScroll() to set scrollTop to 0
- Call it on pagination/page-size change (onListPagination), building switch, and switching back to list view (value === 'list')

## Verification and Attribution
- Verification: src=园区公共收益/027.md
- Files: autonomy/candidateCollect/components/CandidateDialog.vue, candidateCollect/collect/preparatoryGroup/detail.vue, components/BuildingTableViewTabs.vue, zs-select-dialog/zs-select-dialog-func.vue, zs-pagination/zs-pagination.vue, zs-select-dialog/zs-select-dialog.vue, election/components/apply/CandidateDialog.vue
- Project: 园区公共收益; Source session: 491750ff-24a5-4f32-af45-003b31a62769

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：491750ff-24a5-4f32-af45-003b31a62769


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildingtable_scrolltop_reset",
  "source_extraction_id": "f616b0996c1c4735810b158bfa040c14",
  "version": 1,
  "memory_type": "entities"
}
-->
