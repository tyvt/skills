# MP branch repair list old params cause empty API data
The MP branch repair list used outdated request parameters causing the API to return empty data; aligned with suzhou-shiqu-suzhufang-main-v2.1 branch parameters and response mapping.

## Root Cause
- `repair/index.vue` list request used old params `eventType`, `eventStates`, `startTime` etc. causing empty API response

## Fix
- Aligned with `suzhou-shiqu-suzhufang-main-v2.1` branch: use `orderType`, `orderStatus`, `keyWord`, `startDate`/`endDate` and omit `houseId`/`complexId`
- Response mapping `orderContent`→`remark`, `submitTime`→`date`, `orderStatus`→`state`; status dict uses `work_order_status`

## Verification and Attribution
- Verification evidence: src=pages_owner_extra/001.md
- Involved files: src/pages.json, src/pages_owner_extra/ownerCard/index.vue, src/api/property.js, src/pages_owner/repair/index.vue, src/pages_owner/repair/components/RepairCard.vue, src/pages_owner_extra/repair/index.vue, src/pages_owner_extra/repair/components/RepairCard.vue, src/store/repair.js
- Project: Suzhou Housing C (zhi2-mobile-shimin); source session ID: d7c6bb90-123e-48a6-b85b-c6fd05eafa28; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "repair_list_param_fix",
  "source_extraction_id": "8b1b47199b0a48f3b0981f8b08337d6d",
  "version": 1,
  "memory_type": "entities"
}
-->