- In the flowBusCode to OperationBtnGroup to zs-approval chain, when form.isLocalOrganization is empty it falls back to the local code, which is inconsistent with meta.busCode, and attachments are pulled prematurely before getDetail completes.
- Required fix: define an explicit interface '0'/'1' contract and add a loading guard inside resolveFlowBusCode.
- Evidence: src=苏住房G/056.md; files: localOrganizationFlow.js, localOrganizationFlowMixin.js, approval.js, OperationBtnGroup/index.vue, zs-approval/index.vue, ApprovalProcessDialog.vue, companyManagement/detail.vue, companyListQuery.js.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "local_org_buscode_handling",
  "source_extraction_id": "4d5aade41f6344da9fefe4ce3287d49a",
  "version": 1,
  "memory_type": "preferences"
}
-->