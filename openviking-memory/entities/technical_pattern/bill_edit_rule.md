# Sp Fee Bill Edit Rule
Only unpaid and non-voided bills are editable; otherwise hide edit entry.

## Implementation
- enums.js adds isBillEditable: editable when paidState === '0' and billStatus !== '2'
- index.vue and detail.vue render edit button based on isBillEditable and permission property:spFeeBill:edit
- detail.vue hides approval info, performs secondary validation before save, and requests PUT /property/spFeeBill

## Involved Files
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/detail.vue
- d:/repository/产品2.0/zhi2-web-admin/src/views/property/spFeeBill/components/enums.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/table.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/detailMixins.js
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/form.js
- d:/repository/产品2.0/zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js

## Verification
- Source: 产品2.0/040.md; session: 5d376bda-346d-42a9-b39d-cc3b000dca1e

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "bill_edit_rule",
  "source_extraction_id": "a2b1f5e322b549a1ab233d8407f12d44",
  "version": 1,
  "memory_type": "entities"
}
-->