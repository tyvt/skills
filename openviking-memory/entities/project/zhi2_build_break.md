
# zhi2-web-admin Missing Export Build Break
A missing `LEASE_CHANGE_FLOW_BUS_CODE` export in `companyRecord.js` broke the zhi2-web-admin portal build until it was fixed on 2026-11-11.

## Root Cause
- `AgencyBasicInfoDetail.vue` (added in bug 6365 for the lease org change `isLeaseOrgan` branch) imports `LEASE_CHANGE_FLOW_BUS_CODE` from `companyRecord.js`.
- The export was never added to `companyRecord.js`, causing a rolldown `MISSING_EXPORT` error that broke the entire portal build.

## Fix
- Added `export const LEASE_CHANGE_FLOW_BUS_CODE = 'zljgbgxq'` in `src/api/company/companyRecord.js` next to `LEASE_CHANGE_APPENDIX_BUS_CODE` (1 file, +2).
- Submodule `zhi2-web-admin` @ `develop/v3.0.0` committed as `617fa843b` and pushed; parent `zhi3-web-admin-h5-g-unlimited` gitlink updated to `7173c36` and pushed.
- `npm run build` exit 0 and eslint clean; only pre-existing Sass `@import` deprecation warnings remain.

## Significance
- The fix unblocked bug 6464 build/deploy verification previously blocked by this unrelated missing export.
- `zljgbgxq` is confirmed as the lease org change busCode by four independent sources (companyRecordFlowTarget.js:13, companyRecord.js:36, todoRouteRegistry.js, e2e spec).


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_build_break",
  "source_extraction_id": "12a4bc7ea2fa4bd3be363b4606f83214",
  "version": 2,
  "memory_type": "entities"
}
-->