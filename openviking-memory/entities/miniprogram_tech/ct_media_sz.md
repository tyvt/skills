
# CT media URL missing /sz path causes load failure
In utils/portal-env-config.js the CT API base URL contains the /sz path; the old resolveCtMediaUrl regex only took the origin and dropped /sz, causing wrong carousel image URLs.

## Root cause
- CT API base URL contains the `/sz` path (e.g. https://host/sz)
- Old `resolveCtMediaUrl` regex only captured the origin, dropping `/sz`, producing incorrect carousel image URLs that fail to load

## Verification and ownership
- Evidence: extracted source=cursor session=b626c0b5-4df0-46de-a16a-ec035ee4e656
- Files: utils/portal-env-config.js, pages/webview/home.vue, api/common.js, utils/portal-user.js
- Source session: b626c0b5-4df0-46de-a16a-ec035ee4e656; code baseline: none


<!-- MEMORY_FIELDS
{
  "category": "miniprogram_tech",
  "name": "ct_media_sz",
  "source_extraction_id": "74400517991b4f5fbc932da6d5306cd6",
  "version": 1,
  "memory_type": "entities"
}
-->