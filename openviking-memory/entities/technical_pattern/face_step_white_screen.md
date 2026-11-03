# FaceStep White Screen from Empty Array Truthiness
In 太仓一网通办H5, an empty array `myOptionList` being truthy in JS skipped `optionGroupList`, causing empty optionList, face return submit failure, and FaceStep white screen.

## Root Cause
- `myOptionList` is empty array `[]` which is truthy in JS
- `myOptionList || optionGroupList[0].tMfOptionApplyList` skipped `optionGroupList`
- Callback `optionList` empty caused face return submit failure and `FaceStep` white screen

## Fix
- Option vote directly reads `optionGroupList`
- Added `selectedOptionList` cache
- `FaceStep` added jump prompt, failure retry, and `wx.miniProgram` availability detection

## Verification
- Evidence: extracted source=cursor session=450cf900-8bb2-4bf4-bf8c-b1ac346c87fb
- Files: src/views/owner-decision/ParticipateIn.vue, src/views/decision/ParticipateIn.vue, src/views/decision/components/FaceStep.vue, src/store/vote.js, src/views/owner-decision/components/OptionStepChoose.vue, src/views/owner-decision/components/GeneralStepChoose.vue, src/views/decision/common/StepChoose.vue, src/views/owner-decision/OwnerDecisionDetail.vue
- Project: 太仓一网通办H5; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "face_step_white_screen",
  "source_extraction_id": "51b868d45bcd4aabb0fd66d35fcb7f57",
  "version": 1,
  "memory_type": "entities"
}
-->