# guideList URL Typo and Missing ID Check
In zhi2-mobile-shimin, guideList.vue had extra question mark in jump URL and guideDetail.vue lacked empty ID validation.
## Root Cause
- guideList.vue navigated to guideDetail??id (extra ?) and guideDetail.vue did not validate empty options.id causing request with undefined
## Solution
- Corrected URL to guideDetail?id and added empty options.id prompt
## Involved Files
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/elevator/guideDetail.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/elevator/guideList.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_owner/elevator/index.vue
- d:/repository/苏住房C/小程序报错问题汇总.md
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/article.js
- d:/repository/苏住房C/zhi2-mobile-shimin/src/components/article/ListDetail.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/index.js
## Verification
- Extracted from cursor session 396b7339-8e50-4545-8923-92c3135143b9


<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "guidelist_url_typo",
  "source_extraction_id": "7a270ac54cdf4f2198345f3e4a7aa892",
  "version": 1,
  "memory_type": "entities"
}
-->