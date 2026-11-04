# Deposit Amount Column Alignment Override
The `AccountDetailTable.vue` in zhi2-web-admin hardcoded `align: 'left'` for the deposit amount column, overriding the default right alignment.

## Problem
- `guaranteeDepositAccount/components/AccountDetailTable.vue` set `align: 'left'` on the "缴存金额(元)" column
- This overrode `zs-table-column` default right alignment for amount columns

## Solution
- Changed `align` to `'right'` to match list page and detail basic info area

## Files and Attribution
- Files: zhi2-web-admin/src/views/maintenance/guaranteeDepositAccount/components/AccountDetailTable.vue, detail.vue, zs-table-column/zs-table-column.vue
- Project: 产品2.0; source session: 9ce2b292-a0dd-4ce0-84c9-8366477a8a75; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "deposit_amount_align",
  "source_extraction_id": "3fcb9cd3e7b9460e85070135e048a497",
  "version": 1,
  "memory_type": "entities"
}
-->