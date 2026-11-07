# Survey Change Project Credit Code Mapping
In Suzhou Real Estate Monitoring V3, `/presale/surveyChange/selectProject` returns `uniformSocialCreditCode`, but the detail page only mapped legacy fields, leaving the field blank; fixed with a compatibility resolver.

## Problem
- `detail.vue`'s `handleProjectSelect` only mapped `companyCreditCode` and `enterpriseCreditCode`.
- The API returns `uniformSocialCreditCode`, so the credit-code field stayed blank.

## Solution
- Added `resolveSurveyChangeCreditCode` and `mapSurveyChangeProjectRow` in `surveyChangeConstants.js` to handle multiple field names.
- `handleProjectSelect` now uses the new helpers for robust mapping.

## Attribution
- Project: Suzhou Real Estate Monitoring V3; source session: 754ddf0b-9295-4421-b9b9-93fc87b9b996; evidence: 苏州市房地产监测V3-leftover/081.md.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：754ddf0b-9295-4421-b9b9-93fc87b9b996


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "survey_credit_mapping",
  "source_extraction_id": "bcc5eb16dfe3422e81daada6b8ca98b0",
  "version": 1,
  "memory_type": "entities"
}
-->
