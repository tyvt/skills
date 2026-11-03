# detail_date_concat
In the detail page view mode, the handover date range field only bound startDate without concatenating endDate, causing the end date to be missing; fixed by joining the start/end date array with " - ".

## Root Cause
- zhi2-web-admin/src/views/property/handover/detail.vue in formMode=view only bound startDate for the handover date range, omitting endDate

## Fix
- Changed field value to `[this.form.startDate, this.form.endDate].filter(Boolean).join(' - ')`
- The contract period field on the same page needs similar handling

## Verification
- Files: property/handover/detail.vue, benefit/resourcesLeaseContractFiling/detail.vue, evaluation/assessmentPlan/detail.vue
- Source session: a6391fef-ca00-4f65-9b24-3652ab37afa9; code baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_date_concat",
  "source_extraction_id": "5106496ed8504ce0a2fa830793207d6b",
  "version": 1,
  "memory_type": "entities"
}
-->