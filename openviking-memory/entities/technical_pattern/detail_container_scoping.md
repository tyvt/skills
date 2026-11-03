# Detail Container Height Scoping Fix
`.detail-container` had hardcoded height causing bottom blank; scoping fixed.

## Description
- Project: 苏州市房地产监测V3 (zhi2-web-admin), file src/styles/index.scss.
- `.detail-container { height: calc(100vh - 120px); }` over-subtracted 16px vs actual header 104px.
- Caused 40px bottom blank and truncated title; 468 references in el-dialog affected.

## Fix
- Scope style to `#app-main.app-main:has(> .detail-container)` to avoid affecting el-dialog references.

## Verification
- Evidence: src=苏州市房地产监测V3-rest/085.md
- Source session: 21609fbb-aecf-47c4-8d70-955eeb1e9b2b
- Files: companyManagement/change/detail.vue, toB/companyRecord/detail.vue, layout/index.vue, AppMain.vue, index.scss, DeveloperBasicInfoForm.vue, Headline/index.vue, Navbar.vue

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "detail_container_scoping",
  "source_extraction_id": "00d57bddf9a64d5a9050828e7fc3d93f",
  "version": 1,
  "memory_type": "entities"
}
-->