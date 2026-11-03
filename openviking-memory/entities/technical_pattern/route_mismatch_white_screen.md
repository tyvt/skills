# Route Name Mismatch and Empty route.name Cause White Screen
Hardcoded route names failed to match refactored menus and `$route.name.split('/')` threw on unnamed routes, blanking the voting detail page.

## Root Cause
- Code hardcoded route name `OwnerDecision/maintain/:tableid`, not matching refactored menu `estate/maintainDecision/detail`
- `maintainDecision/detail.vue` and `ownerDecision/detail.vue` called `$route.name.split('/')` which threw when route had no `name`, causing white screen

## Fix
- Added `pushMaintainDecisionDetail()` in `decisionCommon/config.js` to auto-match routes and stay compatible with legacy names
- Added `parseMaintainVoteSession()` to safely read prefilled data

## Verification
- Source cursor session: 5ba671bd-1b41-4095-aeb7-c9806fc7b5c2
- Affected files: step4-5.vue, ownerDecision/detail.vue, MaintainResultDialog.vue, DecisionRangeTable.vue, ownerDecision/components/DecisionRangeTable.vue, detailMixins.js, MaintainObjectDialog.vue, listMixins.js
- Project: 太仓G zhi1-web-admin; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "route_mismatch_white_screen",
  "source_extraction_id": "979b9870b7a9485d9604960d934aec37",
  "version": 1,
  "memory_type": "entities"
}
-->