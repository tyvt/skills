# Bank List Fixed Column Border and Padding
Bank lists had missing fixed column bottom border and left whitespace from list-card padding; fixed by CSS pseudo-element and padding adjustment.

## Root Cause
- Fixed operation column did not render bottom border.
- `list-card` left padding 8px caused left whitespace and extra multi-select & zebra striping.

## Fix
- `index.scss` uses `::after` to draw 1px bottom border and force last row `border-bottom`.
- Change `list-card` left padding to 0.
- `unionBank/index.vue` set `selectable:false` and `operationButtons` keep only add.
- `sysBankBranch/index.vue` remove `stripe` and bank code link style.

## Affected Files
- `zhi2-web-admin/src/views/benefit/pubWorkBank/index.vue`
- `zhi2-web-admin/src/views/benefit/pubUnionBankCode/index.vue`
- `zhi2-web-admin/src/views/benefit/pubRegulatoryBranch/index.vue`
- `zhi2-web-admin/src/components/zs-table/zs-table.vue`
- `zhi2-web-admin/src/styles/index.scss`

## Source
- Extracted from cursor session e57a5985-4ed9-4121-a10c-c0665c930b19.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "bank_border_padding",
  "source_extraction_id": "8b3bb81b3dec481da722ad672320236c",
  "version": 1,
  "memory_type": "entities"
}
-->