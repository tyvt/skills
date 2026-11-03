
# UseMoney Apply Dialog Area Columns Need Dictionary Formatter
pubUseMoneyApply/detail.vue showPropertyProjectDialog binds street/community columns directly to code fields without using the area mixin formatter to show Chinese names.

## Problem
- In pubUseMoneyApply/detail.vue showPropertyProjectDialog, the street (街道) and community (社区) columns bind directly to code fields.
- They do not use the area mixin's formatter to convert codes to Chinese names.

## Fix
- Add formatter: this.subdistrictFormatter and this.communityFormatter to both columns.
- Depends on detailMixins importing the area mixin to load the dictionary.

## Verification and Attribution
- Files: pubUseMoneyApply/detail.vue, ruoyi.js, pubParkingRate/detail.vue, detailMixins.js, assetsLeaseContractFiling/detail.vue, property/useMoneyApply/detail.vue, area.js, zs-select-dialog-func.vue.
- Project: 园区公共收益; source session: 414b600e-25ec-4a22-8966-2b35fffacd1d; code baseline: none.


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "usemoney_area_formatter",
  "source_extraction_id": "5ce0a0c981c640988963387d2655a557",
  "version": 1,
  "memory_type": "entities"
}
-->