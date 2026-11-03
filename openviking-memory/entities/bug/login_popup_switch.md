# Login Project Dialog Switch Logic
Enterprise login project popup is controlled by flag ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN with specific conditions.
## Logic
- Popup shows only when multiple communities exist and no valid cache is present.
- Empty list or only one community does not trigger the popup.
- Branches develop/v2.6.2 (commit b9412a507) and develop/v2.6.2-yulin (merge 69ea69f0a, conflict file serviceItem/detail.vue used fixed version) established this logic.
## Affected Files
- d:/repository/榆林G/zhi2-web-admin/src/utils/projectContext.js
- d:/repository/榆林G/zhi2-web-admin/src/layout/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/utils/terminalUser.js
- d:/repository/榆林G/zhi2-web-admin/src/views/home/bProjectDialog.vue
- d:/repository/榆林G/zhi2-web-admin/src/store/modules/user.js
- d:/repository/榆林G/zhi2-web-admin/src/views/property/serviceItem/detail.vue
## References
- Verification: src=榆林G/002.md
- Source session: b7adac16-6317-40a9-8cb6-2631f68c204c

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "login_popup_switch",
  "source_extraction_id": "e1c3fbfa59ed434c814aef9091c76c5a",
  "version": 1,
  "memory_type": "entities"
}
-->