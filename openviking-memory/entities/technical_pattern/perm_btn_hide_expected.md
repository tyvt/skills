# Permission-Based Button Hiding Is Expected
Normal users lacking a permission char see no button; this is intended behavior, not a code defect, so no fix is needed.

## Root Cause
- Button visibility depends on permission characters
- Admin `*:*:*` bypasses all checks; normal users without the matching char (e.g. `deposit:depositnotice:rev`) are hidden by both `checkPermission` and `v-hasPermi`
- This is expected behavior, not a bug

## Affected Files
- `directives/permission/hasPermi.js`, `hasRole.js`, `index.js`
- `main.js`, `store/modules/user.js`, `utils/permission.js`
- `permission/index.js`, `views/repairFunds/deposit/depositnotice/detail.vue`

## Verification
- Source cursor session: 4c6ee833-9c90-4028-9924-d76a48a30e77
- Project: 太仓G zhi1-web-admin; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "perm_btn_hide_expected",
  "source_extraction_id": "979b9870b7a9485d9604960d934aec37",
  "version": 1,
  "memory_type": "entities"
}
-->