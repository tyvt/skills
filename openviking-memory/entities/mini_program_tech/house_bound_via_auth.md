# House Bound Via Auth Marker
utils/portal-user.js introduces houseBoundViaAuth flag, set true only when LingXi authCode house selection succeeds via mergeLingXiHouseIntoPortalUser, used as the formal-version house-binding criterion.
## Behavior
- houseBoundViaAuth defined in utils/portal-user.js, set true only on successful mergeLingXiHouseIntoPortalUser
- externalWebview.vue hasHouse now checks this flag to determine house presence
- refreshPortalProfile no longer fills house fields from ctUserIdentity
## Scope
- Formal version requires LingXi authCode selection success to count as house binding
- Trial version ignores this flag; houseList/houseId presence counts as bound
## Attribution
- Source session: 05b9061d-bcb6-412b-9bf6-24c69eb80182; code baseline: none
- Files: utils/portal-user.js, pages/webview/externalWebview.vue

<!-- MEMORY_FIELDS
{
  "category": "mini_program_tech",
  "name": "house_bound_via_auth",
  "source_extraction_id": "2682297093f14d8fbda8251389becd32",
  "version": 1,
  "memory_type": "entities"
}
-->