---
audit_status: invalid
last_checked: 2026-11-26T12:33:49+08:00
verdict_note: 实机核对无锡市区G- VerificationReceiptDetailTable.vue-119-120 单据类型仅用全局 formatter-this.dictFormatter，Dialog.vue-368 contractTypeLabel 直接调 dictFormatter；main.js-135-141 按逗号 split 后 join(', ')，无 contractTypeText() 与日文逗号「、」拼接。记忆描述的实现与现状不符。
---
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