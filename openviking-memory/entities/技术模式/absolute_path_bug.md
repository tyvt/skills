# Absolute path static assets cause H5 build failure
Taixing mini-program templates using `/pages_owner/static/` absolute paths caused Vite/Rollup H5 build failures, fixed by switching to relative `import` and `:src` binding.

## Problem Root Cause
- Templates such as `src/pages_owner/decision/detail.vue` used absolute paths `/pages_owner/static/...` for static assets.
- Vite/Rollup H5 build failed because of these absolute path references.

## Solution
- Changed absolute paths to relative path `import` and `:src` dynamic binding.
- Same batch covered `src/pages_owner/elect/detail.vue` and `src/pages_property/gauge/detail.vue`.

## Verification & Attribution
- Verification: extracted source=cursor session=86482c93-650d-48c7-9ed2-4c1ad439ee68
- Files: d:/repository/泰兴小程序/src/pages_owner/decision/detail.vue; d:/repository/泰兴小程序/src/pages_owner/house/index.vue; d:/repository/泰兴小程序/src/pages_owner/elect/detail.vue; d:/repository/泰兴小程序/package.json; d:/repository/泰兴小程序/src/pages_property/gauge/detail.vue; d:/repository/泰兴小程序/src/pages_property/payment/index.vue; d:/repository/泰兴小程序/src/pages_property/payment/components/PaymentChannelPopup.vue; d:/repository/泰兴小程序/src/pages_property/payment/bills.vue
- Source session ID: 86482c93-650d-48c7-9ed2-4c1ad439ee68
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "absolute_path_bug",
  "source_extraction_id": "f03cea45ba7f4409b30026539a4cdb38",
  "version": 1,
  "memory_type": "entities"
}
-->