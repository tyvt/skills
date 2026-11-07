# Non-modal Dialog Keeps Stale Data When Switching Rows
`zs-dialog` with `modal="false"` does not block the table; switching rows keeps `visible` true so `@open` never fires and `onOpen` reads the old ID.
## Root Cause
- `zs-dialog` `modal="false"` does not overlay the table
- Switching rows keeps `visible` always true, so `@open` never triggers
- `onOpen` calls `getList` before props update, reading the old ID
## Fix
- `refundDetailTable.vue` adds `:key="currentMaintenanceObjectId"` to force re-creation
- `handleView` uses `{...row}` copy
- `refundDetailDialog.vue` extracts `loadDialogData` into `$nextTick` and watches `maintenanceObjectId` to refresh
## Verification
- Verified: extracted source=cursor session d4844f59-a2f6-4821-94b4-6f91ed2f0ff7
- Files: refundDetailTable.vue, refundDetailDialog.vue, commonTable.vue, DepositDetailsDialog.vue, listMixins.js, zsDialog/index.vue
- Project: 惠山G (zhi1-web-admin); Source session: d4844f59-a2f6-4821-94b4-6f91ed2f0ff7; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "nonmodal_dialog_stale",
  "source_extraction_id": "7670f6a3b07a40619eadbd0e48d5e575",
  "version": 1,
  "memory_type": "entities"
}
-->