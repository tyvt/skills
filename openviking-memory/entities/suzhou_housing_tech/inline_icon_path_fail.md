# Inline relative icon path fails on H5
add.vue used inline :style with hardcoded relative icon path, breaking under Vite build and H5 base './'; fixed via resolveStaticUrl with import.meta.env.BASE_URL.
## Root cause
- pages_owner/repair/add.vue categorized icons using inline :style with relative path strings.
- Relative paths bypassed Vite build and, with H5 base './', WebView resolved them incorrectly.
## Solution
- Introduced resolveStaticUrl based on import.meta.env.BASE_URL to generate correct paths.
- Applied in add.vue, immediate-list.vue, info.vue, IdentityEntry.vue, utils/index.js.
- Updated vite.config.ts and pages.json as needed.
## Verification
- Source session 80e004b0-7fee-4cde-af50-62f07a822d3a; baseline none; from 苏住房C/062.md.
- Involved files: add.vue, utils/index.js, immediate-list.vue, info.vue, IdentityEntry.vue, pages.json, vite.config.ts.

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：80e004b0-7fee-4cde-af50-62f07a822d3a


<!-- MEMORY_FIELDS
{
  "category": "suzhou_housing_tech",
  "name": "inline_icon_path_fail",
  "source_extraction_id": "bf93ed7583b04cdc899775f3a7eb2b15",
  "version": 1,
  "memory_type": "entities"
}
-->
