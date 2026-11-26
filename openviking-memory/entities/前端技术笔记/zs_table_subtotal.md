---
audit_status: valid
last_checked: 2026-11-27T00:50:23+08:00
verdict_note: 产品2.0与园区公共收益命中 showSummary/showMethod/各租赁合同Filing, subtotal属实
---
# zs-table subtotal pattern
A Vue table technique for showing a summed subtotal row on contract filing list pages.
## Usage
- Set showSummary: true in the list page data object.
- Implement showMethod to sum contractAmount and format as two decimals with thousand separators.
- Show 「小计」(subtotal) in the first column.
## Scope
- Applies to resourcesLeaseContractFiling, assetsLeaseContractFiling, parkingSpaceContractFiling list pages.
- Remove redundant ">" from zs-table markup.

<!-- MEMORY_FIELDS
{
  "category": "vue_concept",
  "name": "zs_table_subtotal",
  "source_extraction_id": "e0181ed368f74bb2ace2c92ca2241393",
  "version": 1,
  "memory_type": "entities"
}
-->