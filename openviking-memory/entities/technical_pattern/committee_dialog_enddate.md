# Filed Committee Member View Dialog Missing Appointment End Date
Filed property-management-committee detail (sourceType=='1') member info via CandidateDialog.vue only bound appointmentStartDate in view mode.

## Problem
- In autonomy/record detail (sourceType=='1'), committee member info uses CandidateDialog.vue.
- View mode only bound appointmentStartDate, omitting appointmentEndDate.

## Fix
- View mode display value changed to `${appointmentStartDate} - ${appointmentEndDate}` to show the full appointment range.

## Verification and Attribution
- Files: src/views/autonomy/record/components/MemberInformationDialog.vue, src/views/autonomy/record/components/directDetail.vue, src/views/autonomy/record/components/MemberInformationTable.vue, src/views/autonomy/record/components/CandidateDialog.vue, src/views/autonomy/record/components/enums.js.
- Project: 园区公共收益; source session: 58932c77-9976-4438-bd4c-10b468124d4c; code baseline: none.

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "committee_dialog_enddate",
  "source_extraction_id": "9101bab5bff9401d855c4c5db50c3276",
  "version": 1,
  "memory_type": "entities"
}
-->