# Scoped style cannot constrain child component
In the WeChat mini-program, parent scoped or :deep() styles cannot reliably constrain sizes of child components like MenuImage, causing icons to fill, so child must manage its own size.

## Problem Cause
- Parent scoped or :deep() styles fail to reliably constrain MenuImage child component size, causing icon overflow

## Solution
- Manage size in MenuImage.vue via img-class prop, inline style, and global styles
- Callers pass img-class and enable virtualHost: true

## Involved Files
- src/pages.json
- src/pages/index/project.vue
- src/pages/index/temp.vue
- src/custom-tab-bar/index.vue
- src/utils/tabBar.js
- src/pages/index/home.vue
- src/pages/index/my.vue
- src/utils/route-map.js

## Verification
- Project: SuHousingC (zhi2-mobile-shimin)
- Source session: fd31d266-ac37-45f4-a828-8a29b307c443

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：fd31d266-ac37-45f4-a828-8a29b307c443


<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "scoped_style_child",
  "source_extraction_id": "22a74bef41a84490857d2c3b5457400d",
  "version": 1,
  "memory_type": "entities"
}
-->
