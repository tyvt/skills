- `maintainProject.js` encapsulates `selectConstructionDetail` API (`/v2.0/maintenance/miniapp/owner/selectConstructionDetail`); adds `parsePictureFiles` and `mapConstructionDetail` to map `data.list` into `detailList` (`usccBName`→`companyName`).
- `construction-manage.vue` `onLoad` reads `projectNo` (falls back to `projectId`) and calls `fetchConstructionManage` real API to render, deprecating mock data.
- Verification: src=泰兴小程序/024.md.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "construction_detail_mapping",
  "source_extraction_id": "1347c22671b64dc1a595c525039a2a5f",
  "version": 1,
  "memory_type": "preferences"
}
-->