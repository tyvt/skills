# Subpackage Cross-Package Static Resource Error
SuZhuFangC mini-program: a subpackage page cross-referencing static resources causes WeChat App.onError; such resources must be placed in the same or main package.

## Problem
- `pages_main/announcement/index.vue` is in a subpackage and cross-references static resources, causing WeChat mini-program `App.onError`.
- Root cause is WeChat's package isolation: a subpackage cannot load static assets from another subpackage.

## Solution
- Place static resources in the current subpackage's own `static` directory or in the main package `src/static`.
- Avoid cross-package static asset references; if sharing is needed, copy the asset or use a main-package whitelist path.

## Verification
- Evidence: source `苏住房C/024.md`.
- Involved files: `package.json`, `src/pages.json`, `src/components/ZsPicker/ZsPicker.vue`, `src/manifest.json`, `scripts/relocate-datetime-picker.mjs`, `scripts/validate-dist.mjs`, `dist/pages_main/node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.js`.
- Project: SuZhuFangC; source session: 283d2149-aad6-4b95-83d3-698be7a1f675; code baseline: none.

<!-- MEMORY_FIELDS
{
  "category": "suzhufangc_tech",
  "name": "subpackage_static_error",
  "source_extraction_id": "4656c42590084da4bf12a8a609364eb0",
  "version": 1,
  "memory_type": "entities"
}
-->