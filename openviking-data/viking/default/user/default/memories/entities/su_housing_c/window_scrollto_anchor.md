# Miniprogram window.scrollTo anchor failure
Root cause: pages_transaction/newHouse/detail.vue setTab used H5-only window.scrollTo, missing in WeChat miniprogram.

## Problem
- `pages_transaction/newHouse/detail.vue` `setTab` used H5 API `window.scrollTo`, WeChat miniprogram lacks `window` causing error
- Anchor failed

## Fix
- Use `uni.createSelectorQuery()` and `uni.pageScrollTo()` for cross-end scroll
- Unify anchor class (add `md0`, change `md3` to `md6` corresponding tab value)

## Verification
- Evidence: src=苏住房C/079.md
- Files: d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_transaction\newHouse\detail.vue ; d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_transaction\stockHouse\detail.vue ; d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_main\automaticRobot\index.vue ; d:\repository\苏住房C\zhi2-mobile-shimin\src\utils\index.js ; pages_transaction/newHouse/detail.vue
- Source session: 41a4e64f-0b65-4969-b0c2-d0d6514d2d0c; baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：41a4e64f-0b65-4969-b0c2-d0d6514d2d0c


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c",
  "name": "window_scrollto_anchor",
  "source_extraction_id": "356d1858e539467da8dfffd82a8f6bf9",
  "version": 1,
  "memory_type": "entities"
}
-->
