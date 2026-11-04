# ContentInfo Missing Remark Field
In propertyContractFeeStandardDialog.vue, DetailTemplate renders contentInfo without the remark field that facilityDialog.vue includes.

## Problem
- DetailTemplate's contentInfo config lacked a `label: '备注'` (remark) entry compared to facilityDialog.vue

## Solution
- Add config `label: '备注', value: this.form.remark, type: 'textarea'` to align with facilityDialog.vue

## Files
- propertyContractFeeStandardDialog.vue
- propertyChargeStandardDialog.vue
- facilityDialog.vue

## Attribution
- Source session: 36d9b40d-3d14-49fe-953c-f9ad9284a5ee
- Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "contentinfo_missing_remark",
  "source_extraction_id": "d091c1719d0b45a59013948f120e8a2d",
  "version": 1,
  "memory_type": "entities"
}
-->