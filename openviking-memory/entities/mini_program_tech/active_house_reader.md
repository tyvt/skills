# Active House Unified Reader
getActiveHouseFromPortalUser added in utils/portal-user.js unifies active-house reading to fix menu inconsistency caused by snapshot field conflicts after house switching.
## Problem
- mergeCtUserIdentityHouseIntoPortalUser forced houseId/project to override LingXi-selected values
- Menu value fields inconsistent: getPortalComplexId preferred project/houseList[0], portalUser.houseId, buildPortalH5FlatQuery mixed sources
## Solution
- New getActiveHouseFromPortalUser in utils/portal-user.js provides single source for active house
- Menu and community name both read via this function
## Attribution
- Source session: 4b7771ad-3727-4825-9b66-d0df7f681ca0; code baseline: none
- Files: home.vue, externalWebview.vue, portal-user.js, portal-h5-webview.js, custom-tabbar.vue, portalH5Webview.vue, bdc.vue

<!-- MEMORY_FIELDS
{
  "category": "mini_program_tech",
  "name": "active_house_reader",
  "source_extraction_id": "2682297093f14d8fbda8251389becd32",
  "version": 1,
  "memory_type": "entities"
}
-->