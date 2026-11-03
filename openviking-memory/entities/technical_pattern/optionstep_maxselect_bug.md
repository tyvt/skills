# OptionStepChoose wrong maxSelect reads decision-level optionNum
In 太仓一网通办H5, OptionStepChoose.vue's maxSelect prioritizes decision-level view.optionNum (total option count) instead of group-level currentGroup.optionNum (max selectable count), misjudging the limit as 4 and allowing over-selection.

## Root Cause
- OptionStepChoose.vue's maxSelect prioritizes decision-level view.optionNum (total option count)
- Does not use group-level currentGroup.optionNum (max selectable count), so limit misjudged as 4

## Fix
- Prioritize group-level optionNum and minOptionNum
- Add second validation on submit

## Verification
- Evidence: extracted source=cursor session=31fcae87-08be-423a-9da7-ea37db71840b
- Files: src/views/owner-decision/components/OptionStepChoose.vue, src/store/vote.ts, src/views/decision/components/StepChoose.vue, src/store/vote.js, src/api/modules/decision.ts, src/views/election/ElectionParticipate.vue, src/views/owner-decision/ParticipateIn.vue, src/views/owner-decision/OwnerDecisionDetail.vue
- Project: 太仓一网通办H5; source session: 31fcae87-08be-423a-9da7-ea37db71840b; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "optionstep_maxselect_bug",
  "source_extraction_id": "7134ec9d5e394459914ac49d71015888",
  "version": 1,
  "memory_type": "entities"
}
-->