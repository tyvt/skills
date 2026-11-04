# Subpackage Image Relative Path Mis-resolved to Main Package
In WeChat mini-program subpackage pages, writing relative image paths in templates mistakenly resolves them to the main package, causing load failures.

## Problem Root Cause
- Subpackage page templates using relative paths (e.g., /static/images/szf/publishBanner.png) are mis-parsed to main package
- Images fail to load because they are not present in main package static directory

## Fix Approach
- Use same-subpackage import introduction: `import publishBanner from '../static/images/szf/publishBanner.png'`
- Bind imported asset to `:src` in template (reference intention/my.vue)

## Involved Files
- src/pages_transaction/stockHouse/index.vue
- src/pages.json
- src/components/ZsImage/ZsImage.vue
- src/pages_transaction/publishHouse/index.vue
- src/components/commonNew/tabLine.vue
- src/utils/index.js
- src/env/mp.js
- src/vite.config.ts

## Verification
- Source cursor session: ea94d6f1-423c-4f81-89fd-77047f891ebe
- Project: Su Housing C (zhi2-mobile-shimin)

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "subpackage_image_import",
  "source_extraction_id": "9a18362dd707471eb595985f5916bc72",
  "version": 1,
  "memory_type": "entities"
}
-->