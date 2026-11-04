# Paid State Sp Pay Status Dict
paidState enum was reversed; aligned with sp_pay_status dictionary.

## Problem
- paidState original enum values were reversed and not aligned with dictionary

## Fix
- enums.js added SP_PAY_STATUS_DICT constant and corrected PAY_STATUS_TAB values (PARTIAL:'1', PAID:'2')
- index.vue, detail.vue, import.vue input params, display, and preview columns uniformly use sp_pay_status dictionary

## Involved Files
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/enums.js
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/import.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/bill/components/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/importUploadDialog.vue
- d:/repository/产品2.0/zhi2-web-admin/vite.config.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/detail.vue

## Verification
- Source: 产品2.0/042.md; session: 80a1a5aa-28bf-448e-ab1d-e5b881e76943

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "pay_status_dict",
  "source_extraction_id": "a2b1f5e322b549a1ab233d8407f12d44",
  "version": 1,
  "memory_type": "entities"
}
-->