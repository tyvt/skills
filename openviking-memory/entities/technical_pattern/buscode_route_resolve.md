# Enterprise Detail Page Hardcoded busCode Caused Change Exception
In 苏州市房地产监测V3 project, enterprise model detail page hardcoded busCode caused process exception; fix uses route resolution helpers.

## Root Cause
- Enterprise model detail page hardcoded busCode leading to flow abnormality on change

## Fix
- Dev/agency detail pages call resolveCompanyRecordChangeFlowBusCode(route, organType)
- api/company/personnelRecord.js adds resolvePersonnelChangeBusCode for personnel detail page route resolution

## Verification
- Evidence: src=苏州市房地产监测V3-rest/024.md
- Files: companyRecordChangeRoute.js, routeMeta.js, companyManagement/components/detail.vue, toB/agencyRecord/detail.vue, DeveloperBasicInfoDetail.vue, personnelRecord.js, staffManagement/components/detail.vue, toB/personnelRecord/components/detail.vue
- Project: 苏州市房地产监测V3; source session: 01a16175-7042-7553-b4af-dfce03647058; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "buscode_route_resolve",
  "source_extraction_id": "189598b2f6764b21a56e2b7829ae5bc5",
  "version": 1,
  "memory_type": "entities"
}
-->