# SVG Icon Direct Reference
Icons not registered to the SVG sprite need a direct static file reference instead of a sprite symbol.

## Problem
- vite-plugin-svg-icons only registers icons under public/assets/images/svg/
- Files at public/assets/images/menu-fold.svg cannot be referenced via `#icon-menu-fold`

## Solution
- Hamburger.vue uses an `img` to load /assets/images/menu-fold.svg directly, keeping outer container and hover styles

## Files
- layout: TagsView/Hamburger.vue, TagsView/index.vue, Navbar.vue
- components: SvgIcon/index.vue, BuildingStateTable.vue
- build: vite.config.js, generate-sprite.js
- views: home/index.vue

## Attribution
- Source session: b5854166-69ad-4373-b2ce-06fc224fa0a4
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "svg_icon_reference",
  "source_extraction_id": "d091c1719d0b45a59013948f120e8a2d",
  "version": 1,
  "memory_type": "entities"
}
-->