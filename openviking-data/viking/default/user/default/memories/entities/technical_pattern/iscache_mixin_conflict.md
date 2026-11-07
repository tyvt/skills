# IsCache Mixin Data Conflict
苏州市房地产监测V3 component `data` defining `isCache` conflicts with `detailMixins` computed of the same name, causing Vue warnings.

## Problem
- `detailMixins` defines `isCache` in `computed`
- Components `AgencyBranchDetail.vue` and `AgencyPersonnelDetail.vue` define `isCache` in `data`, causing conflict and Vue warnings

## Solution
- Remove `isCache` from component `data`
- Override in `computed` returning `false` to disable form sessionStorage cache logic
- Apply same fix to both `AgencyBranchDetail.vue` and `AgencyPersonnelDetail.vue`

## Files and Attribution
- Verification: src=苏州市房地产监测V3-leftover/122.md
- Involved files: institution/agencyBranch/components/AgencyBranchDetail.vue, institution/agencyPersonnel/components/AgencyPersonnelDetail.vue, mixins/detailMixins.js
- Project: 苏州市房地产监测V3; source session: 0a54735e-51f0-4603-9e93-d900dddbb423; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：0a54735e-51f0-4603-9e93-d900dddbb423


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "iscache_mixin_conflict",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 1,
  "memory_type": "entities"
}
-->
