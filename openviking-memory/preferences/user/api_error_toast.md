- Prefers API exceptions to extract backend msg/message via extractMaintenanceApiErrorMessage instead of only showing status code
- Uses showApiErrorToast in pages/webview/home.vue for unified error popup
- Returns empty string for 401 to avoid duplicate prompt with portal expiration notice

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "api_error_toast",
  "source_extraction_id": "71711547f6984c3c811af6b30fdf76a0",
  "version": 1,
  "memory_type": "preferences"
}
-->