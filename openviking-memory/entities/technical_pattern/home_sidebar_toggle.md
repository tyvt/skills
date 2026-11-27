---
audit_status: invalid
last_checked: 2026-11-27T13:46:11+08:00
verdict_note: 产品2.0 Navbar.vue 无 goHome，home/index.vue 仍调用 toggleSideBar；记忆所述「移除 toggleSideBar 并加 goHome」修复在现有代码中不存在。
---
# Home Index Vue Calls toggleSideBar
The `home/index.vue` `created` hook called `toggleSideBar`, collapsing the default expanded sidebar.

## Problem
- `home/index.vue` `created` invoked `toggleSideBar`
- Vuex default `opened: true` sidebar got switched to collapsed

## Solution
- Removed the call in `home/index.vue`
- Added auto-expand logic in `Navbar.vue` `goHome` when sidebar collapsed

## Files and Attribution
- Files: zhi2-web-admin/src/views/home/index.vue, layout/components/Navbar.vue, layout/index.vue, Sidebar/index.vue, TagsView/Hamburger.vue, store/modules/app.js, TagsView/index.vue, router/index.js
- Project: 产品2.0; source session: 7306b6f9-4bed-4195-ab23-cda67731b6e0; code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：7306b6f9-4bed-4195-ab23-cda67731b6e0

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "home_sidebar_toggle",
  "source_extraction_id": "3fcb9cd3e7b9460e85070135e048a497",
  "version": 1,
  "memory_type": "entities"
}
-->