- `common` store preloads `subdistrictList` and `communityList`; `formatters/index.js` provides `subdistrictFormatter` and `communityFormatter` to resolve display names from codes.
- `zs-table-column.vue` auto-applies these formatters for `subdistrict`/`subdistrictCode`/`community`/`communityCode` columns when no explicit formatter is set, covering list pages and `SelectDialog`.
- Avoids per-page manual formatter configuration for street/community code columns.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "table_column_formatter",
  "source_extraction_id": "7edae260dc5b4c619dbc8dc085a84546",
  "version": 1,
  "memory_type": "preferences"
}
-->