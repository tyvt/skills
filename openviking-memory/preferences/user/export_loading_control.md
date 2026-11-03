- Prefers adding `exportLoading` state to export button to prevent duplicate clicks by reusing common export in user management page.
- Prefers `handleExport` to call `getQueryParams()` precheck then `download('system/user/publicExport')`, with precheck and download sharing the same params.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "export_loading_control",
  "source_extraction_id": "75f0953d723c4431871c6b13366ef0f3",
  "version": 1,
  "memory_type": "preferences"
}
-->