---
audit_status: valid
last_checked: 2026-11-27T19:17:18+08:00
verdict_note: 苏住房C 中 virtualHost、MenuImage 命中，scoped 样式改由子组件集中管理的方案属实。
---
# Mini-program parent scoped style cannot constrain child component
In the WeChat mini-program, parent component scoped or :deep() styles cannot reliably constrain child component sizes like MenuImage, causing icons to fill.

## Problem Cause
- Parent scoped or :deep() styles fail to constrain MenuImage and similar child component dimensions

## Solution
- Manage sizes centrally in MenuImage.vue via img-class attribute, inline style, and global styles
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
  "category": "su_housing_c_tech",
  "name": "scoped_style_child_constraint",
  "source_extraction_id": "cca3283d59234382a661ee1cf592f0d3",
  "version": 1,
  "memory_type": "entities"
}
-->