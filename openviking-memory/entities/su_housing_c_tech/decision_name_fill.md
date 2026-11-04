# Decision Option Records Lack Player Name Needs Detail API
In Su Housing C project, getMaintainResult returns decisionOptionResponseAllList without decisionPlayerName; name exists in detail interface.

## Problem Root Cause
- `getMaintainResult` returned `decisionOptionResponseAllList` options lacking `decisionPlayerName`
- Player name only available via detail interface

## Fix Approach
- In DecisionResult.vue, call `getDecisionRecordDetail` by `decisionResponseId` to fill name and write to voteStore
- DecisionRecord.vue merges cache and interface with field fallback support
- autonomy.js adds `zs-desensitize-flag:0` to prevent desensitization

## Involved Files
- src/pages_owner/decision/components/DecisionList.vue
- src/pages_owner/decision/index.vue
- src/pages_owner/decision/needToKnow.vue
- src/pages_owner/decision/detail.vue
- src/pages_vote/decision/components/DecisionList.vue
- src/pages_vote/decision/index.vue
- src/pages_vote/decision/needToKnow.vue
- src/pages_vote/decision/form.vue

## Verification
- Source cursor session: 6e6436fe-112d-4645-b690-9d9bb72bae0c
- Project: Su Housing C (zhi2-mobile-shimin)

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_name_fill",
  "source_extraction_id": "9a18362dd707471eb595985f5916bc72",
  "version": 1,
  "memory_type": "entities"
}
-->