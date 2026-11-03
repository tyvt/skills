# Project Dialog Switch Disabled
The B-terminal login project selection popup was actively disabled by setting a constant to false.
## Root Cause
- In zhi2-web-admin/src/utils/projectContext.js, ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN was set to false (commit bf2512af8).
- This actively turned off the enterprise login project selection popup.
## Fix
- Restore popup by changing the constant to true.
## Affected Files
- d:/repository/榆林G/zhi2-web-admin/src/permission.js
- d:/repository/榆林G/zhi2-web-admin/src/layout/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/views/home/bProjectDialog.vue
- d:/repository/榆林G/zhi2-web-admin/src/utils/projectContext.js
- d:/repository/榆林G/zhi2-web-admin/src/utils/terminalUser.js
- d:/repository/榆林G/zhi2-web-admin/src/store/getters.js
- d:/repository/榆林G/zhi2-web-admin/src/store/modules/user.js
- d:/repository/榆林G/zhi2-web-admin/src/layout/components/Navbar.vue
## References
- Verification: src=榆林G/003.md
- Source session: 1aa5a58c-4093-4786-81ac-e958b287e260

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "dialog_switch_false",
  "source_extraction_id": "e1c3fbfa59ed434c814aef9091c76c5a",
  "version": 1,
  "memory_type": "entities"
}
-->