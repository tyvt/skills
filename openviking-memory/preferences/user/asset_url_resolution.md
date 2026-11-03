- Resolves public/server asset URLs based on the current page URL rather than the site root when deployed under a subpath.
- resolveServerAssetUrl.js uses `new URL(relative, window.location.href)` so the browser keeps the subpath prefix.
- bulkImportDialog.vue error-download link was switched to the same current-page-based resolution.


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "asset_url_resolution",
  "source_extraction_id": "7072da725d544d60a6ec2ce79757e096",
  "version": 1,
  "memory_type": "preferences"
}
-->