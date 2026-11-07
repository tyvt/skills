
# Dual-End Bank Table Empty State
BankAccountTable.vue in two modules was unified with a Headline wrapper and a right-slot button for consistent empty state and alignment.

## Problem
- Bank tables in supervision/agreement/account and property/propertyAccount had inconsistent empty-state whitespace and button positions

## Solution
- Both `BankAccountTable.vue` files wrap content with `Headline` and move the button to the `#right` slot
- `:table-tr` binds data length to trigger `zs-table` compact empty state
- New props added: `titleText`, `showBalanceQueryButton`, `form`

## Files and Attribution
- Verification: src=苏州市房地产监测V3/166.md
- Files: supervision/agreement/account/detail.vue, components/Headline/index.vue, supervision/agreement/account/components/BankAccountTable.vue, zs-table/zs-table.vue, styles/index.scss, benefit/pubRegulatoryAccount/components/BankAccountTable.vue, benefit/pubRegulatoryAccount/detail.vue, property/propertyAccount/components/BankAccountTable.vue
- Project: 苏州市房地产监测V3; source session: a5d89768-99be-4451-84bf-85a35b766c41; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：a5d89768-99be-4451-84bf-85a35b766c41


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "dual_end_bank_table",
  "source_extraction_id": "494398012a1245589ff9d3e73a52e1cb",
  "version": 1,
  "memory_type": "entities"
}
-->
