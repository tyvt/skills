# Filed warning contract selectable and ignore uses latest row
In 苏住房G benefit contract filing lists, reserve-selection desynced selected-row fields from tableData, and filed-warning contract selection/style checks were inconsistent.

## Problem Background
- reserve-selection caused selected-row fields to fall out of sync with the current tableData.
- Filed-warning contracts had inconsistent selection state versus style judgment logic.

## Solution
- assetsLeaseContractFiling/index.vue added isWarningContract(row) unifying whetherWarning checks for 1/'1'/true.
- Both isSelectable and setRowStyle call isWarningContract(row).
- getIgnore filters by revenueContractId from the latest tableData row; ignore button disables when no warning row is selected.

## Verification and Attribution
- Verification: 苏住房G/028.md
- Files: benefit/assetsLeaseContractFiling/index.vue, benefit/parkingSpaceContractFiling/index.vue, mixins/table.js, benefit/resourcesLeaseContractFiling/index.vue, benefit/pubRevenueContract/index.vue, components/zs-select-column/zs-select-column.vue, workbuddy/memory/2026-09-10.md, workbuddy/memory/2026-09-11.md
- Project: 苏住房G; Source session: 7960611d-0d3b-4ae8-a217-98664ba2c7a2; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "warning_contract_selection_sync",
  "source_extraction_id": "9d6a5afb1d8e4fd5a2e3955461234a78",
  "version": 1,
  "memory_type": "entities"
}
-->