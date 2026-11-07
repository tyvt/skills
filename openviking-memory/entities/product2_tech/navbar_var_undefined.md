# Navbar title and menu overlap due to undefined width CSS variable
Navbar.vue uses --sidebar-expanded-width, but that variable is only defined in the unloaded variables.scss, while the effective variables.css does not define it, causing long titles to overlap with the top menu.

## Root Cause
- Navbar.vue references --sidebar-expanded-width, but variables.css (the effective file) lacks this variable
- The variable is only defined in variables.scss, which is not loaded, leading to missing variable
- Long titles and top menu overlap due to failed width calculation

## Solution
- Add --sidebar-expanded-width: 288px to variables.css
- Unify --sidebar-width to 288px
- Add 288px fallback in Navbar.vue

## Verification and Attribution
- Evidence: src=产品2.0/036.md
- Files: zhi2-web-admin/src/layout/index.vue, Navbar.vue, Sidebar/index.vue, TagsView/index.vue, Sidebar/RecursiveMenu.vue, styles/variables.scss, store/modules/app.js, styles/variables.css
- Project: Product 2.0
- Source session ID: 3c5a02bd-dab4-4af1-8656-5c6fc9ed5b9d
- Code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：3c5a02bd-dab4-4af1-8656-5c6fc9ed5b9d


<!-- MEMORY_FIELDS
{
  "category": "product2_tech",
  "name": "navbar_var_undefined",
  "source_extraction_id": "3c9ed998705f417e8c48593f229edd2c",
  "version": 1,
  "memory_type": "entities"
}
-->
