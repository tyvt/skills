# onOpen And watch Double Trigger Duplicate Dialog Calls
Both `onOpen` and the `maintenanceObjectId` watcher call `loadDialogData()`, and `$nextTick` with `v-if` mounting `commonTable` overlap to cause duplicate requests.
## Root Cause
- `onOpen` and `maintenanceObjectId` watch both invoke `loadDialogData()`
- `$nextTick` and `v-if` mounting `commonTable` timing stacking causes repeated requests
## Fix
- Remove `maintenanceObjectId` watch and its `loadDialogData`
- `onOpen` only fills the form
- `commonTable` with `autoQuery=false` calls `getQuery()` once in `mounted`, guarded by `v-if="$attrs.visible"`
## Verification
- Verified: src=惠山G/001.md
- Files: refundDetailDialog.vue, refundDetailTable.vue, commonTable.vue, listMixins.js, zsDialog/index.vue, SearchContainer/index.vue, ShareDetailDialog.vue, Pagination/index.vue
- Project: 惠山G (zhi1-web-admin); Source session: 69fe4877-9065-40ce-b4bb-17b22cfdb965; Code baseline: none

## 验证与归属
- 所属项目：惠山G
- 验证证据：extracted source=cursor project=惠山G
- 来源会话：69fe4877-9065-40ce-b4bb-17b22cfdb965


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "dialog_double_request",
  "source_extraction_id": "7670f6a3b07a40619eadbd0e48d5e575",
  "version": 1,
  "memory_type": "entities"
}
-->
