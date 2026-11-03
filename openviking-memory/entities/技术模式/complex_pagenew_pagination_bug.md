# Complex list wrong pageNew causes one row per page
In 苏住房G, multiple list requests mistakenly used POST /property/complex/pageNew, causing pagination anomalies with only 1 item returned per page.

## Problem Background
- Normal list queries wrongly called POST /property/complex/pageNew, which returned a list of only 1 item.
- Pagination parameter handling differed from the page interface, showing a single record per page.

## Solution
- Normal queries reverted to GET /property/complex/page.
- Only the advanced-filter scenario uses pageNew.

## Verification and Attribution
- Verification: 苏住房G/026.md
- Files: publicQuery/complex/detail.vue, building/complexSearch/detail.vue, publicQuery/complex/index.vue, property/complex/index.vue, mixins/listMixins.js, mixins/table.js, utils/request.js, api/index.js
- Project: 苏住房G; Source session: 8bdf9717-be50-4471-8d56-923d2b2d1c5a; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "complex_pagenew_pagination_bug",
  "source_extraction_id": "9d6a5afb1d8e4fd5a2e3955461234a78",
  "version": 1,
  "memory_type": "entities"
}
-->