# dialog_emit_refresh
A dialog calling the parent component method via `this.$parent` after submit was unstable and threw a method-not-found error; replaced with `$emit('refresh')` handled by the parent.

## Root Cause
- MaintainResultDialog.vue called `this.$parent.getList()` on submit success; `$parent` did not stably point to VotingItemsTable, causing the method to be undefined

## Fix
- Changed to `this.$emit('refresh')`
- VotingItemsTable.vue and detail.vue added `@refresh` handlers to refresh the list and detail

## Verification
- Files: autonomy/multiply/components/MaintainResultDialog.vue, autonomy/multiply/components/VotingItemsTable.vue, autonomy/multiply/detail.vue, autonomy/option/components/MaintainResultDialog.vue, autonomy/general/components/MaintainResultDialog.vue, mixins/subTableMixins.js, mixins/table.js, components/Headline/index.vue
- Source session: efcad380-fb66-4184-a744-9ea41461ecde; code baseline: none

## 验证与归属
- 所属项目：园区公共收益
- 验证证据：extracted source=cursor project=园区公共收益
- 来源会话：efcad380-fb66-4184-a744-9ea41461ecde


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_emit_refresh",
  "source_extraction_id": "5106496ed8504ce0a2fa830793207d6b",
  "version": 1,
  "memory_type": "entities"
}
-->
