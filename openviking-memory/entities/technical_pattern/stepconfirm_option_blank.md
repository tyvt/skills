# StepConfirm missing OPTION branch causes blank content
In 太仓一网通办H5, StepConfirm.vue only implements the MAINTAIN display branch and lacks an OPTION branch template, leaving the confirmation page content area blank.

## Root Cause
- src/views/owner-decision/components/StepConfirm.vue only implements the MAINTAIN display branch
- Lacks OPTION branch template; when decisionType==='OPTION' the content area is blank

## Fix
- Add selectedOptionItems computed property to read checked items in optionGroupList
- Render selected decision items when decisionType==='OPTION'

## Verification
- Evidence: extracted source=cursor session=6eb5120c-c134-4e15-a744-163291e6d855
- Files: src/views/owner-decision/ParticipateIn.vue, src/views/owner-decision/components/OptionStepChoose.vue, src/views/decision/components/StepConfirm.vue, src/views/decision/ParticipateIn.vue, src/store/vote.ts, src/store/vote.js, src/views/election/ElectionConfirm.vue, src/views/decision/components/StepChoose.vue
- Project: 太仓一网通办H5; source session: 6eb5120c-c134-4e15-a744-163291e6d855; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "stepconfirm_option_blank",
  "source_extraction_id": "7134ec9d5e394459914ac49d71015888",
  "version": 1,
  "memory_type": "entities"
}
-->