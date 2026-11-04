# Valid Bill Selection Restricted by Payment Status
The `spFeeBill` module's `isSelectable` relied on `isBillPayable`, blocking selection of valid paid bills.

## Problem
- `spFeeBill` `isSelectable` depended on `isBillPayable` allowing only unpaid/partial paid non-voided bills
- Valid already-paid bills could not be selected

## Solution
- Added `isBillValid()` and `validateBillsForDiscount()` in `enums.js`
- Changed `isSelectable` to `isBillValid(row)` so all valid bills selectable
- Receipt and discount go through different validations

## Files and Attribution
- Files: zhi2-web-admin/src/views/property/bill/components/index.vue, declare/components/index.vue, feeDeclare2/index.vue, spFeeBill/components/index.vue, enums.js, discountDialog.vue
- Project: 产品2.0; source session: 3bad7169-f39b-4cf0-bf68-090703c11dcb; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "bill_selectable_valid",
  "source_extraction_id": "3fcb9cd3e7b9460e85070135e048a497",
  "version": 1,
  "memory_type": "entities"
}
-->