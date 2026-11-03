# Permit survey busCode unified to ysxkcs constant
In 苏州市房地产监测V3, hardcoding `busCode` easily causes inconsistency across modules, so `PERMIT_SURVEY_BUS_CODE = 'ysxkcs'` is defined in `permitConstants.js`.

## Problem Root Cause
- Hardcoded `busCode` easily causes inconsistency between modules

## Solution
- Define `PERMIT_SURVEY_BUS_CODE = 'ysxkcs'` in `permitConstants.js`
- In `PermitApprovalDialog.vue`, both `annex-upload` and `validateSurveyFile()` changed to reference this constant

## Verification and Attribution
- Verification: src=苏州市房地产监测V3-leftover/014.md
- Involved files: zhi2-web-admin/src/views/presale/permit/permitConstants.js, zhi2-web-admin/src/views/presale/permit/components/PermitApprovalDialog.vue, zhi2-web-admin/e2e/presale/presale-permit-real-api-flow.spec.js, zhi2-web-admin/e2e/fixtures/presale-permit-helpers.js, zhi2-web-admin/src/views/presale/permit/components/PresaleProgressDialog.vue
- Project: 苏州市房地产监测V3; source session b1bb7368-21ce-4ac4-9add-5db7c2bf8aa9; code baseline none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_survey_buscode",
  "source_extraction_id": "40b50386543f48a8aa414293683a2a75",
  "version": 1,
  "memory_type": "entities"
}
-->