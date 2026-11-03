- Querying org-type role API requires organType besides roleType: '2'; missing it causes a "type is empty" error
- In loadRoleOptions add organType: this.form.accountType and skip the request when no org type is selected
- Remove the init request from initDict; trigger it after selecting/switching org type, route prefill, or edit load
- Role dropdown loads the corresponding org-role list only after an org type is selected
- Verification: src=园区公共收益/027.md; Files: autonomy/ownerCommitteeWorker/detail.vue, system/user/detail.vue, autonomy/record/components/enums.js, company/userManagement/operator/operatorTable.vue, operatorAddDialog.vue, toB/personnelRecord/components/detail.vue, system/role/detail.vue, login.vue; Source session: 9878244d-a568-49fa-8751-9ff53a3f3559

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "role_api_organ_type",
  "source_extraction_id": "f616b0996c1c4735810b158bfa040c14",
  "version": 1,
  "memory_type": "preferences"
}
-->