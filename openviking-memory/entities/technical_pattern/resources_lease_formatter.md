# Resources Lease Contract Street/Community Columns Lack Formatter
resourcesLeaseContractFiling/detail.vue property-area dialog returns subdistrict/community as division codes; table columns not configured with formatter.

## Problem
- In resourcesLeaseContractFiling/detail.vue property-area select dialog, street (街道) and community (社区) columns bind to subdistrict/community code fields.
- The codes are not converted to Chinese names, showing raw codes in the table.

## Fix
- Add subdistrictFormatter and communityFormatter to the street and community columns.
- Reuse mapping logic from area.js mixin introduced via detailMixins.

## Verification and Attribution
- Files: src/views/benefit/resourcesLeaseContractFiling/detail.vue, src/views/benefit/assetsLeaseContractFiling/index.vue, src/views/benefit/assetsLeaseContractFiling/detail.vue, src/mixins/area.js, src/mixins/detailMixins.js, src/components/zs-select-dialog/zs-select-dialog-func.vue, src/components/zs-select-dialog/zs-select-dialog.vue, src/views/benefit/resourcesLeaseContractFiling/index.vue.
- Project: 园区公共收益; source session: 6bb1b34b-eb24-4b0a-b69b-69e34156d925; code baseline: none.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "resources_lease_formatter",
  "source_extraction_id": "9101bab5bff9401d855c4c5db50c3276",
  "version": 1,
  "memory_type": "entities"
}
-->