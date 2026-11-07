# Whitelist $get sends GET causing 405 on POST interface
In Suzhou Real Estate Monitoring V3, `/file/appendix/` sits in the encryption whitelist so `$get` sends a real GET request, while `listByAppendixConfigIdAndBusIdAndBusCode` only supports POST, causing a 405 error.

## Root Cause
- `/file/appendix/` is in the encryption whitelist, so `$get` sends a real GET request
- `listByAppendixConfigIdAndBusIdAndBusCode` only supports POST, causing the 405 error

## Fix
- In `PresaleProgressDialog.vue`'s `checkExistingAttachments`, change `$get` to `$post`
- Unify the call style with the same type of interface in `companyRecord.js`

## Verification and Attribution
- Evidence: src=苏州市房地产监测V3/043.md
- Files: PresaleProgressDialog.vue, PresaleBuildingTable.vue, detail.vue, PresaleHouseTable.vue, detailMixins.js, index.vue, PresaleBuildingSection.vue, listMixins.js
- Project: Suzhou Real Estate Monitoring V3; Source session: fb0248ef-0ab1-4952-b167-0d4b0ecc5257; Code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：fb0248ef-0ab1-4952-b167-0d4b0ecc5257


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "presale_appendix_get_405",
  "source_extraction_id": "3dc465c0a4c94a63b007d08cccf4b6ba",
  "version": 1,
  "memory_type": "entities"
}
-->
