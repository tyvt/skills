# changeCompare.js Unified Change Comparison
Xinghua property management (兴化物管) zhi1-web-admin adds src/utils/changeCompare.js to unify number/string, Date and year comparison logic.

## Background
- Change-value comparison logic was scattered and needed centralization into changeCompare.js.

## Solution
- Add src/utils/changeCompare.js to uniformly handle number/string, Date and year comparisons.
- main.js `isShowModify` now calls `isChangeValueEqual`.
- propertychange/detail.vue rolls back build-year special code, keeping only `parseBeforeChangeData` to parse backend JSON strings.

## Verification
- Evidence: 兴化物管/001.md
- Files: src/utils/changeCompare.js, src/main.js, propertychange/detail.vue, mixins/detailMixins.js, propertyProject/detail.vue, directives/form/index.js, api/estate/propertyChange.js, buildinginfo/changeDetail.vue, project/projectinfo/changeDetail.vue
- Project: 兴化物管; Source session: efb19730-94e6-49b0-b515-a5225a01129c

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "change_compare_js",
  "source_extraction_id": "dfed095b4ba749ebb4b9c32e8aad66f8",
  "version": 1,
  "memory_type": "entities"
}
-->