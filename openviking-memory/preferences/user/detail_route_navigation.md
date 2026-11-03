- For detail navigation without `:tableid`, prefer `buildNavigationByFilePath` or align the `routeName`+`query` branch of `ruoyi.js`'s `buildDetailNavigation` over concatenating `${basePath}/${changeId}` with `query.id` (causes 404).
- Validate the resolved target with `isRoutablePath` before `push`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "detail_route_navigation",
  "source_extraction_id": "bcc5eb16dfe3422e81daada6b8ca98b0",
  "version": 1,
  "memory_type": "preferences"
}
-->