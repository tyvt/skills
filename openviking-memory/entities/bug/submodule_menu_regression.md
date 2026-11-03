# Submodule Menu Regression
Merging the zhi2-web-admin submodule with the wrong old commit caused menu navigation to roll back.
## Description
- Merge conflict on commit 47984b5 mistakenly selected old version 19b67c4 instead of aaf95c0 or a8203a6.
- Resulted in menu navigation regression in the admin web frontend.
## Fix
- Submodule must point to commit a8203a6 which contains the menu navigation fixes.
## Affected Files
- d:/repository/榆林G/zhi2-web-admin/src/settings.js
- d:/repository/榆林G/zhi2-web-admin/src/layout/components/Sidebar/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- d:/repository/榆林G/zhi2-web-admin/src/layout/components/Navbar.vue
- d:/repository/榆林G/zhi2-web-admin/src/layout/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/layout/components/TagsView/index.vue
- d:/repository/榆林G/zhi2-web-admin/src/store/modules/permission.js
## References
- Verification: src=榆林G/001.md
- Source session: 3e1bb84d-7826-444e-ba65-f297d674c06d

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "submodule_menu_regression",
  "source_extraction_id": "e1c3fbfa59ed434c814aef9091c76c5a",
  "version": 1,
  "memory_type": "entities"
}
-->