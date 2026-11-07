# Personnel Change Attachment busCode Fix
In 苏州市房地产监测V3, AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue, and staffManagement/detail.vue had appendixBusCode hardcoded to return the filing code, inconsistent with the change-submit busCode.

## Problem Root Cause
- Three files' appendixBusCode fixed to return filing code
- Mismatch with change-submit busCode; attachment list, upload, and validation broke

## Fix
- Changed appendixBusCode in all three files to return this.auditBusCode
- Attachment list, upload, and validation now switch dynamically with filing or change context

## Verification & Attribution
- Verification: src=苏州市房地产监测V3-rest/109.md
- Files: institution/agencyPersonnel/components/AgencyPersonnelDetail.vue, institution/leasePersonnel/components/LeasePersonnelDetail.vue, company/staffManagement/components/detail.vue
- Project: 苏州市房地产监测V3; Source session: 01a1631f-8ce8-70c5-a400-766aeafe6174; Code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "personnel_appendix_buscode_fix",
  "source_extraction_id": "90cef1a211a94d8cae6604bafd443cb9",
  "version": 1,
  "memory_type": "entities"
}
-->