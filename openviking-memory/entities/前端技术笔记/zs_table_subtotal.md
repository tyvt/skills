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