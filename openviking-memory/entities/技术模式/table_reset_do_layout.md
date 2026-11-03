# Always call doLayout after table reset to fix stale scroll area
In the 园区公共收益 (zhi2-web-admin) project, ScopeSelectDialog.vue skipped doLayout() when listTableTr was unchanged, leaving the scroll area stale after search reset.

## Root Cause
- ScopeSelectDialog.vue returned early and skipped doLayout() when listTableTr was unchanged
- This left the scroll area not updated after a search reset

## Fix
- Always call doLayout() inside $nextTick
- resetQuery calls handleQuery() to reset pageNum

## Verification and Attribution
- Verification: src=园区公共收益/028.md
- Files: maintenance/accountOpen/owner/components/ScopeSelectDialog.vue, OpenDetailTable.vue, zs-table/zs-table.vue, mixins/subTableMixins.js, mixins/table.js, accountOpen/owner/components/detail.vue
- Project: 园区公共收益; Source session: acf40130-9dda-4c08-b943-34292e01cab4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_reset_do_layout",
  "source_extraction_id": "f616b0996c1c4735810b158bfa040c14",
  "version": 1,
  "memory_type": "entities"
}
-->