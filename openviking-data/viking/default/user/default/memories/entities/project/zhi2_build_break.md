# zhi2-web-admin Build Break
Pre-existing production build break in zhi2-web-admin portal caused by a missing export in an unrelated module.

## Description
- Module `company/companyManagement/components/AgencyBasicInfoDetail.vue` (company management) imports `LEASE_CHANGE_FLOW_BUS_CODE`.
- `companyRecord.js` does not export `LEASE_CHANGE_FLOW_BUS_CODE`, causing a rolldown binding error during build.

## Significance
- The error is pre-existing (reproduces on clean HEAD) and outside any single bug fix scope.
- On 2026-11-11, fixing bug 6464 had its build verification blocked by this error (recorded as "build not fully executed").
- Suggest opening a separate task to investigate the missing `LEASE_CHANGE_FLOW_BUS_CODE` export in `companyRecord.js`.

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "zhi2_build_break",
  "source_extraction_id": "6b22be1af5724556b45c355958221d0f",
  "version": 1,
  "memory_type": "entities"
}
-->