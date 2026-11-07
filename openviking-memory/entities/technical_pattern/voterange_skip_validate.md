# VoteRangeDialog nextStep Skips Form Validation
VoteRangeDialog.vue's nextStep set active=1 directly without validating required form fields, allowing navigation past incomplete forms.

## Root Cause
- `VoteRangeDialog.vue` `nextStep` directly set `active=1` without calling `this.$refs['form'].validate()`
- Required fields such as `policymaker` were not validated before advancing

## Fix
- In `nextStep`, validate the form first and only proceed after validation passes
- Affected files: `ownerDecision/components/VoteRangeDialog.vue` and `decisionCommon/components/VoteRangeDialog.vue`

## Verification
- Source cursor session: 81005aa4-3a6b-4f6a-9054-7ab69341ff3f
- Project: 太仓G zhi1-web-admin; code baseline: none

## 验证与归属
- 所属项目：太仓G
- 验证证据：extracted source=cursor project=太仓G
- 来源会话：81005aa4-3a6b-4f6a-9054-7ab69341ff3f


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "voterange_skip_validate",
  "source_extraction_id": "979b9870b7a9485d9604960d934aec37",
  "version": 1,
  "memory_type": "entities"
}
-->
