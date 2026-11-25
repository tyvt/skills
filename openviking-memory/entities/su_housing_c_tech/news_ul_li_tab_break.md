---
audit_status: valid
last_checked: 2026-11-25T23:34:22+08:00
verdict_note: 苏住房C pages_main/news/index.vue-3-12 用 scroll-view+view 横向 tab；components/article/ListIndex.vue-2 用 @tap="goDetail" 替代 @click，inner 为 view。与 ul/li 破坏布局修复描述一致。
---
# News page ul/li breaks tab layout and click
In 苏住房C (zhi2-mobile-shimin), using ul/li in the news page broke the horizontal tab layout and disabled item clicks.

## Root Cause
- pages_main/news/index.vue used ul/li which broke flex, causing tabs to stack vertically
- components/article/ListIndex.vue bound @click on the custom base-card component, which did not fire

## Solution
- Replace ul/li with scroll-view + view for horizontal tabs
- Wrap an outer view and use @tap='goDetail' instead of @click
- Change inner div elements to view

## Verification and Attribution
- Evidence: src=cursor session=81595210-d77b-4b6b-b35b-a2d8a5bf4a14
- Files: pages_main/news/index.vue, components/article/ListIndex.vue, pages.json, components/commonNew/baseCard.vue, pages/news/detail.vue, pages/news/index.vue, pages_main/news/detail.vue, components/article/ListDetail.vue
- Project: 苏住房C (zhi2-mobile-shimin); code baseline: none

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：81595210-d77b-4b6b-b35b-a2d8a5bf4a14

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "news_ul_li_tab_break",
  "source_extraction_id": "5edfa1599d644844a125308dfde52d91",
  "version": 1,
  "memory_type": "entities"
}
-->