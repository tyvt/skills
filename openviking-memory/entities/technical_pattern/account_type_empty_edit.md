# Account Type Empty Edit Enable
In SuzhouHousingG admin, account type field disabled on empty historical data caused save failure due to required validation.
## Root Cause
- Account type auto-generated from user code, edit mode disabled by default.
- When historical `accountType` empty, field remained disabled but validation required, blocking save.
## Fix
- In `src/views/system/user/detail.vue`, `isAccountTypeDisabled` now enables edit when `originForm.accountType` empty.
- Empty case uses `accountTypeOptions` from `sys_account_type` dict; `isAccountTypeEmpty` unified empty check.
- `detailCallback` end assigns `originForm`.
## Involved Files
- `src/views/system/user/detail.vue`, `src/mixins/detailMixins.js`, `src/views/company/userManagement/operator/detail.vue`
- `src/views/system/user/index.vue`, `operatorAddDialog.vue`, `src/utils/terminalUser.js`, `src/mixins/form.js`, `src/components/zs-select/zs-select.vue`
## Verification
- Source: 苏住房G/062.md; session 08df6a66-6dbe-4a03-8d68-a6fa9506abe6.

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：08df6a66-6dbe-4a03-8d68-a6fa9506abe6


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "account_type_empty_edit",
  "source_extraction_id": "fcb70580f7074a5e8c518d8c5fbf82b4",
  "version": 1,
  "memory_type": "entities"
}
-->
