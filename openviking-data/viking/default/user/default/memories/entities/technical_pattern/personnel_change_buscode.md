# Institution-side change attachment busCode mapped by institution type
In Suzhou Real Estate Monitoring V3, `personnelRecord.js` removed menu-fallback and forced-revert logic, switching to organType-priority mapping to ensure correct busCode for institution-side changes.

## Root Cause
- `personnelRecord.js`'s `findRouterByFilePath` menu fallback and `normalizeAgencyPersonnelAppendixBusCode` forced-revert logic made busCode unreliable
- Institution-side changes could end up with the wrong busCode

## Fix
- Remove `findRouterByFilePath` and `normalizeAgencyPersonnelAppendixBusCode`
- Add `resolvePersonnelAppendixBusCode` and `resolvePersonnelChangeBusCode` mapping by organType priority (agency maps to jgcyrybg)

## Verification and Attribution
- Evidence: src=苏州市房地产监测V3/044.md
- Files: src/api/company/personnelRecord.js, LeasePersonnelDetail.vue, personnelRecordMenuConstants.js, AgencyPersonnelDetail.vue, company/staffManagement/components/detail.vue, toB/personnelRecord/components/detail.vue
- Project: Suzhou Real Estate Monitoring V3; Source session: 01a16352-5dfe-70c5-a400-76737bd529ea; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "personnel_change_buscode",
  "source_extraction_id": "3dc465c0a4c94a63b007d08cccf4b6ba",
  "version": 1,
  "memory_type": "entities"
}
-->