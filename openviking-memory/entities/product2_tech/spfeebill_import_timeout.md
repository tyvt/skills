# spFeeBill/import custom 5-minute timeout
The global default 100-second timeout cannot satisfy the long-running /property/spFeeBill/import requirement, so the timeout must be overridden per request.

## Background
- The global request default timeout is 100 seconds, while the spFeeBill batch import interface takes far longer
- Without overriding the timeout, large imports are interrupted midway

## Solution
- Add IMPORT_REQUEST_TIMEOUT = 5 * 60 * 1000 (5 minutes) in enums.js
- Pass timeout in the request config of import.vue and importUploadDialog.vue to override the default
- Reuse the existing timeout prompt logic; no new error-handling logic needed

## Verification and Attribution
- Verification: session f95fd685, src=产品2.0/059.md
- Involved files: zhi2-web-admin/src/utils/request.js、src/api/index.js、vite.config.js、src/views/property/spFeeBill/components/import.vue、importUploadDialog.vue、src/views/property/spFeeBill/components/enums.js
- Project: 产品2.0; source session: f95fd685-fb92-457c-98a8-0d5d19ac9f6f; code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：f95fd685-fb92-457c-98a8-0d5d19ac9f6f


<!-- MEMORY_FIELDS
{
  "category": "product2_tech",
  "name": "spfeebill_import_timeout",
  "source_extraction_id": "2618dad3089247029330eb677f274518",
  "version": 1,
  "memory_type": "entities"
}
-->
