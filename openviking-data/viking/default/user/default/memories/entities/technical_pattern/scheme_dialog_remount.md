
# Service Scheme Dialog Removes Interception and Remounts with v-if
In Suzhou Real Estate Monitoring V3, the service scheme dialog removed pre-load interception and uses v-if remount to ensure event execution.

## Fix Points
- Removed intercept that blocked dialog open when rootCompanyRecordId not loaded
- Used `v-if="schemeDialogOpen"` to remount each open, ensuring `@open`/`loadPage` execute
- Dialog footer keeps only normal buttons (view close, add/edit cancel + confirm)
- Enable/disable and edit actions remain in list rows

## Involved Files
- zhi2-web-admin/src/views/company/institutionRegister/detail.vue
- zhi2-web-admin/src/views/company/companyRecordAgency/detail.vue
- zhi2-web-admin/src/components/README.md
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/system/bankList/components/BankDialog.vue
- zhi2-web-admin/src/views/company/companyManagement/components/agencyBasicInfoContent.js
- zhi2-web-admin/src/utils/detailLayout.js
- zhi2-web-admin/src/views/company/companyScheme/detail.vue

## Verification
- Evidence: src=苏州市房地产监测V3-rest/026.md and src=苏州市房地产监测V3/079.md
- Session: fe8e14a9-62e2-477a-bd32-f3f069ed26fd
- Project: Suzhou Real Estate Monitoring V3; code baseline: none

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：fe8e14a9-62e2-477a-bd32-f3f069ed26fd


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "scheme_dialog_remount",
  "source_extraction_id": "cf49faa128334ff6ad44b159523193ea",
  "version": 2,
  "memory_type": "entities"
}
-->
