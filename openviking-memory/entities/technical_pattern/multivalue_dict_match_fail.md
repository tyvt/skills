# Multi-value field single-dict match failure shows code
relBusinessType stores comma-separated multi-values (e.g. 1,2); original translation only matched single values, so dict lookup failed and showed raw codes.

## Root cause
- relBusinessType field stores comma-separated multi-values like '1,2'
- Original dict translation logic only did single-value exact match, failing lookup and displaying the raw code

## Solution
- VerificationReceiptDetailTable.vue uses a scoped slot with contractTypeText() splitting by comma, dict-lookup, and joining with a Japanese comma
- VerificationReceiptDetailDialog.vue contractTypeLabel() upgraded to the same multi-value split translation
- Eliminated dict loading timing risk; applied to assetsLeaseContractFiling/detail.vue, resourcesLeaseContractFiling/detail.vue, subTableMixins.js

## Verification and source
- Verified in src=无锡市区G/004.md
- Project: zhi2-web-admin (无锡市区G); source session: 65ea08fa-ce59-454d-b8a6-f105c14c87a0; code base: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "multivalue_dict_match_fail",
  "source_extraction_id": "2b3b431dfc5c4ca08b1fc7e3928ac2bf",
  "version": 1,
  "memory_type": "entities"
}
-->