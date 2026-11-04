# TabBar Icons Must Be Imported Locally and Static Paths Corrected
In Su Housing C project, AppTabBar did not import local icons and some pages had wrong static paths, causing icon errors.

## Problem Root Cause
- AppTabBar component did not import local icons
- income/info.vue and maintain/info.vue used wrong image path `./../static` instead of `../static`

## Fix Approach
- Import local icons and mount them to tab pages
- Correct the two files' static path references to `../static`

## Involved Files
- src/pages/index/components/Home_Suzhufang.vue
- src/pages_owner/ownerCard/index.vue
- src/pages_owner/elect/detail.vue
- src/components/PageBg/PageBg.vue
- src/components/ZsImage/ZsImage.vue
- src/utils/index.js
- src/pages_tab/components/Home_Suzhufang.vue
- src/pages_owner/house/index.vue

## Verification
- Source cursor session: 7004b2d1-f4ed-47aa-b1b7-975f6fb37b58
- Project: Su Housing C (zhi2-mobile-shimin)

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "tabbar_icon_import",
  "source_extraction_id": "9a18362dd707471eb595985f5916bc72",
  "version": 1,
  "memory_type": "entities"
}
-->