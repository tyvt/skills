# Sidebar collapse width 0 clips navbar title
Commit 790f35205 (bug1594) changed the navbar width from fixed 276px to var(--sidebar-width), and when the sidebar collapses the variable becomes 0px and clips the title.

## Affected versions
- Only present in v2.6.2
- v2.6.1 uses fixed 276px and needs no fix or merge

## Involved files
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/layout/components/Sidebar/index.vue
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/layout/components/TagsView/index.vue
- zhi2-web-admin/src/store/modules/app.js
- zhi2-web-admin/src/styles/variables.scss
- zhi2-web-admin/src/styles/variables.css

## Source and verification
- Evidence: src=产品2.0/056.md
- Project: 产品2.0; session: d115a3e1-0619-44d4-8a93-3c964fe93a54; baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：d115a3e1-0619-44d4-8a93-3c964fe93a54


<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "sidebar_collapse_width_bug",
  "source_extraction_id": "e7c605a5c99a41d8ac71682f2e3b63a6",
  "version": 1,
  "memory_type": "entities"
}
-->
