# Sidebar Parent Hidden Not Traced
Sidebar child items incorrectly display when a parent Layout has hidden: true because visibility checks ignore ancestor hidden state.

## Root Cause
- `listRouters` child routes set `hidden: false` which conflicts with menu management hidden status.
- `buildNavbarChildrenMenus` flattens children without tracing parent Layout `hidden: true`.
- `isRouteHidden()` only evaluates the current node, not ancestor hidden flags.

## Fix Points
- Add parent-level `hidden` status judgment in `buildNavbarChildrenMenus` and `isRouteHidden()`.
- Alternatively synchronize the `hidden` field on child nodes within `listRouters`.

## Involved Files
- `zhi2-web-admin/src/layout/components/Sidebar/index.vue`
- `zhi2-web-admin/src/utils/menuVisibility.js`
- `zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue`
- `zhi2-web-admin/src/store/modules/permission.js`
- `zhi2-web-admin/src/layout/components/Navbar.vue`
- `zhi2-web-admin/src/api/portal/menu.js`
- `zhi2-web-admin/src/layout/components/TagsView/index.vue`

## Verification and Attribution
- Validation evidence source: portal/027.md
- Project: portal (门户)
- Source session ID: 92104882-f56a-49cf-931b-814063421ad6
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "sidebar_parent_hidden",
  "source_extraction_id": "4e272057a2544379a7ea40025b4387c7",
  "version": 1,
  "memory_type": "entities"
}
-->