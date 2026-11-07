# HandleDelete No-Arg Call
苏州市房地产监测V3 toolbar delete button `@click="handleDelete()"` with no row data caused error when accessing undefined row primaryKey.

## Problem
- Toolbar delete button called `handleDelete()` without passing row data
- `table.js` `let ids = row[this.primaryKey]` threw error when `row` was `undefined`

## Solution
- Change `table.js` to `(row && row[this.primaryKey]) || this.ids` to support no-arg batch delete
- Change `brand/index.vue` to `@click="handleDelete"` without parentheses

## Files and Attribution
- Verification: src=苏州市房地产监测V3-leftover/124.md; src=苏州市房地产监测V3/324.md
- Involved files: company/brand/index.vue, mixins/listMixins.js, mixins/table.js
- Project: 苏州市房地产监测V3; source session: 5bbc22cc-cdf5-42d9-8521-6ed4291d2efc; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：5bbc22cc-cdf5-42d9-8521-6ed4291d2efc


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "handledelete_noarg",
  "source_extraction_id": "bcd04e9a91754eea9e43e07c2c83f87f",
  "version": 2,
  "memory_type": "entities"
}
-->
