# Switching account leaves parentDeptId causing wrong dept filter
After logout without clearing Vuex cachedSearchParams, a new account inherits the previous account's department filter.

## Root Cause
- LogOut/FedLogOut did not clear Vuex cachedSearchParams (which includes parentDeptId)
- After account switch, listMixins and RegionTreeLayout restored the old filter

## Fix
- On logout in zhi2-web-admin/src/store/modules/user.js, dispatch("common/clearAllSearchParams", null, { root: true })

## Verification and Scope
- Verification: src=苏住房G/064.md
- Files: zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue, zhi2-web-admin/src/views/property/complex/index.vue, zhi2-web-admin/src/store/modules/common.js, zhi2-web-admin/src/store/modules/user.js, zhi2-web-admin/src/mixins/listMixins.js, zhi2-web-admin/src/layout/components/Navbar.vue, zhi2-web-admin/src/utils/terminalUser.js
- Project: 苏住房G; Source session: c14c5230-321b-471a-a40a-e48d33f20dbb; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "suzhufang_g_tech",
  "name": "cross_account_parent_deptid",
  "source_extraction_id": "bef229ef9efa47e0b71ee6b556779111",
  "version": 1,
  "memory_type": "entities"
}
-->