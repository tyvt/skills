# Bank Branch List Route 404 Fix
In Suzhou Real Estate Monitoring V3, the bank branch list requested the wrong estate path and returned 404 because the route name lacked commercial; fixed by hardcoding the prefix URL.

## Root Cause
- Supervisebank/:tableid route name does not contain commercial
- Bank branch list mistakenly requested estate path and returned 404

## Fix
- superviseBank/detail.vue and superviseBank/components/WdmcDialog.vue set bankBranchPrefixUrl to /prefund/bankBranch/list
- Prefix URL aligned with other interfaces on the same page

## Verification and Attribution
- Verification: src=苏州市房地产监测V3-rest/150.md
- Files: cbyh/index.vue, yhwdgl.js, jgwd/index.vue, cbyh/detail.vue, listMixins.js, YhwdTable.vue, superviseBank/detail.vue, table.js
- Source session: f9ae239b-1970-4f62-b9f6-43dcba0723b3; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f9ae239b-1970-4f62-b9f6-43dcba0723b3


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "bank_branch_404",
  "source_extraction_id": "594543d5a8634a28bf523bd297fd670c",
  "version": 1,
  "memory_type": "entities"
}
-->
