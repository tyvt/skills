# news detail migrated to subpackage but homepage jumps old path
News detail page moved to `pages_main/news/detail` subpackage, but `Home_Suzhufang.vue`'s `goNewsDetail` still navigated to undefined `/pages/news/detail` in `pages.json`, causing MiniProgramError.

## Description
- News detail page migrated to `pages_main/news/detail` subpackage
- `Home_Suzhufang.vue` `goNewsDetail` still jumped to `/pages/news/detail` not defined in `pages.json`
- Caused MiniProgramError on navigation

## Solution
- `Home_Suzhufang.vue` uses `route-map.js` `PAGES.news.detail()` to generate correct path
- `menuRouteMap.js` updated menu routes `3_1_10`, `3_1_16` etc. to `pages_main` subpackage

## Verification
- Source evidence: src=苏住房C/075.md
- Files: pages.json; utils/route-map.js; pages/index/components/Home_Suzhufang.vue; utils/menuRouteMap.js
- Project: Suzhou Housing C (zhi2-mobile-shimin); code baseline: none; session: 29317b48-dcb1-481b-a230-4459674df2a0

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "news_detail_error",
  "source_extraction_id": "ba71f747db594776be8a6b89cd514edd",
  "version": 1,
  "memory_type": "entities"
}
-->