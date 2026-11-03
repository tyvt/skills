# Basic Info Change Route By Organ Type
In Suzhou Real Estate Monitoring V3, basic-info change (busCode `jbxxbg`) hardcoded a jump to dev-enterprise detail, causing agencies to land on the wrong page; fixed by routing on `organType`.

## Problem
- `src/views/company/companyChangeManage/index.vue` hardcoded navigation to `company/companyManagement/change/detail` for all organ types.
- Agencies were wrongly redirected to the dev-enterprise detail page.

## Solution
- Added `BASIC_CHANGE_TARGET_BY_ORGAN_TYPE` map keyed by `organType` to pick the target route.
- `navigateToChangeDetail` now resolves the route by organ type first; agencies jump to `company/companyRecordAgency/change/detail`.

## Attribution
- Project: Suzhou Real Estate Monitoring V3; source session: 01a1630d-6f7a-70c5-a400-7645f4be3469; evidence: 苏州市房地产监测V3-leftover/081.md.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "basic_change_route",
  "source_extraction_id": "bcc5eb16dfe3422e81daada6b8ca98b0",
  "version": 1,
  "memory_type": "entities"
}
-->