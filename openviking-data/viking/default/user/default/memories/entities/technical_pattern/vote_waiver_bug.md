# vote.js misreads waiver location causing empty abstention param
In 太仓一网通办H5, vote.js reads the waiver option from data.data.waiver (actually at top-level data.waiver), causing optionList to be empty.

## Root Cause
- vote.js fetchSelectView mistakenly read waiver from data.data.waiver after refactor
- Interface waiver option is actually at top-level data.waiver
- Caused optionList empty and missing abstention param

## Fix
- vote.js fetchSelectView uses detail.waiver || data.waiver to write voteWaiver
- OptionStepChoose.vue and election.ts sync the read logic

## Verification
- Evidence: extracted source=cursor session=a8c326c2-9bf5-46ac-a057-08be20ab8806
- Files: src/views/owner-decision/components/OptionStepChoose.vue, src/views/owner-decision/ParticipateIn.vue, src/views/owner-decision/components/GeneralStepChoose.vue, src/store/vote.js, src/views/election/ElectionParticipate.vue, src/store/election.ts, src/views/election/ElectionForm.vue, src/views/decision/components/StepChoose.vue
- Project: 太仓一网通办H5; source session: a8c326c2-9bf5-46ac-a057-08be20ab8806; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "vote_waiver_bug",
  "source_extraction_id": "7134ec9d5e394459914ac49d71015888",
  "version": 1,
  "memory_type": "entities"
}
-->