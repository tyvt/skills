# House Limit Area Column Requires provinceFormatter
In 苏州市房地产监测V3, houseLimit/index.vue area column was not configured with a formatter, causing raw codes (e.g. 320506) to display.

## Problem Root Cause
- houseLimit/index.vue area column lacked a formatter, showing raw codes instead of district names

## Fix
- Added formatter: this.formatters.provinceFormatter to that column
- Depends on common.allAreas to convert codes like 320506 into district Chinese names, aligned with building/project/index.vue

## Verification & Attribution
- Verification: src=苏州市房地产监测V3-rest/109.md
- Files: building/houseLimit/index.vue, building/project/index.vue, formatters/index.js, building/houseLimit/detail.vue, building/projectChange/index.vue
- Project: 苏州市房地产监测V3; Source session: 101f7d04-3b50-49eb-8e8d-10bc2d789804; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "house_limit_area_formatter",
  "source_extraction_id": "90cef1a211a94d8cae6604bafd443cb9",
  "version": 1,
  "memory_type": "entities"
}
-->