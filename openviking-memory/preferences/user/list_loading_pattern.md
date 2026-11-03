- When switching list categories, in `onCategoryChange` first clear the list data (e.g. `facilityList`) then set `listLoading=true`; write the list back after the request finishes to avoid flashing old data.
- When `listLoading` is true, render only the loading component (e.g. `<uni-load-more status="loading" />`) instead of the list content.
- On first `onLoad`, call the data request (e.g. `serachPoi(..., { clearBefore: false })`) also through the loading state to avoid a blank screen.
- Remove unused redundant code such as `nextTick` and `onShow`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "list_loading_pattern",
  "source_extraction_id": "fc3fb9aab39b4ba985bc6fe4fdd46249",
  "version": 1,
  "memory_type": "preferences"
}
-->