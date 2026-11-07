# Home Menu Trial Alignment
home.vue ensureHouseSelected required houseBoundViaAuth && houseId and cleared house on missing, dropping trial-version houses; aligned with externalWebview.vue to retain trial houses.
## Problem
- home.vue ensureHouseSelected() required houseBoundViaAuth && houseId
- restorePortalSnapshotFromPageStorage() cleared fields when missing via clearPortalHouseFields
- Did not call mergeCtUserIdentityHouseIntoPortalUser to pull trial ctUserIdentity houses
## Fix
- Align home.vue logic with externalWebview.vue
- Support and retain trial-version house recognition in home.vue
## Attribution
- Source session: 0058f23d-986e-4656-8a58-d2a02848f549; code baseline: none
- Files: externalWebview.vue, home.vue, portal-user.js

## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 来源会话：0058f23d-986e-4656-8a58-d2a02848f549


<!-- MEMORY_FIELDS
{
  "category": "mini_program_tech",
  "name": "home_trial_alignment",
  "source_extraction_id": "2682297093f14d8fbda8251389becd32",
  "version": 1,
  "memory_type": "entities"
}
-->
