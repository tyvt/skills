# WXSS local background image causes render-layer error
In pages_owner/house/index.vue, WXSS background images for .top-empty and .history-container used local paths, causing render-layer network errors in WeChat mini-program.

## Problem
- pages_owner/house/index.vue used local-path WXSS backgrounds for .top-empty and .history-container
- WeChat mini-program could not load local paths, producing render-layer network errors

## Solution
- Conditional compilation: H5 uses local ../../static/images/szf/Bg-szf.png; mini-program uses CDN https://szf.szzfcjj.cn:8888/static/images/szf/Bg-szf.png

## Verification
- Verification: src=苏住房C/069.md
- Files: pages_owner/house/index.vue, ZsImage.vue, pages_owner/tenant/index.vue, TypeChoose_Suzhufang.vue
- Source session: 5fbd3e35-025c-45df-996f-22495a68d907

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "wxss_bg_error",
  "source_extraction_id": "6a5f40753ef0432f99d9c80a416f56e7",
  "version": 1,
  "memory_type": "entities"
}
-->