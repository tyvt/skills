# Select Dialog dictUrl Passthrough Fix
Fix for `zs-select-dialog-func.vue` not passing `dictUrl` to child causing dictionary load failure in detail pages.

## Root Cause
- `zs-table-column` falls back to requesting `underline(prop)` dictionary type when no `dictUrl` given.
- `zs-select-dialog-func.vue` didn't pass `dictUrl` to child, so dicts like `mf_worker_job` specified in `detail.vue` not effective.

## Fix
- Bind and pass `dictUrl` property in `zs-select-dialog-func.vue` to child components.

## Involved Files
- `zhi2-web-admin/src/views/property/propertyManager/detail.vue`
- `zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue`
- `zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue`
- `zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue`

## Verification
- Source cursor session `4487481b-f10d-43d1-9a48-5bdf07280a3d`; code baseline none.

<!-- MEMORY_FIELDS
{
  "category": "frontend_bug",
  "name": "dialog_dicturl_passthrough",
  "source_extraction_id": "75f0953d723c4431871c6b13366ef0f3",
  "version": 1,
  "memory_type": "entities"
}
-->