# 负责人选择弹窗复用SelectDialog按企业过滤
园区物管2.0 中负责人选择弹窗复用 SelectDialog 按企业过滤人员。

## 解决方案
- handleOpenPersonnelDialog 调用 SelectDialog.open 访问 /company/personnelRecord/page
- filterParams 仅传 companyRecordId
- isPersonnelLeaderDialogDisabled 在解聘或未选企业时禁用弹窗
- clearCompanyLeader 清空姓名电话

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/property/propertyContract/components/detail.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue、zhi2-web-admin/src/views/benefit/pubFinanceAccountSet/detail.vue、zhi2-web-admin/src/views/benefit/pubChangeleadershipAudit/detail.vue
- 所属项目：园区物管2.0
- 来源会话：ad936249-80e2-4ff9-b8bd-66d0f776406d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_dialog_filter",
  "source_extraction_id": "1b00b3b68d274fa1adfaf22891771f0a",
  "version": 1,
  "memory_type": "entities"
}
-->