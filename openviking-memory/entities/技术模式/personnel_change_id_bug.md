# 从业人员变更提交误用备案主键
苏州市房地产监测V3 中 `operation-btn-group` 未传 `:id` 时默认使用路由 `personnelRecordId` 提交变更，误用备案主键导致变更提交错误。

## 问题根因
- `operation-btn-group` 未传 `:id` 时默认使用路由 `personnelRecordId` 作为提交 ID
- 变更态下应使用变更单 ID 而非备案主键，误用导致提交对象错误

## 修复方案
- 在 `AgencyPersonnelDetail.vue` 与 `LeasePersonnelDetail.vue` 增加 `flowBusId` 计算属性
- 变更态取 `personnelRecordChangeId`，非变更态取备案 ID
- 将 `flowBusId` 绑定至 `operation-btn-group` 的 `:id`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/153.md
- 涉及文件：company/staffManagement/components/detail.vue、api/company/personnelRecord.js、toB/personnelRecord/components/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、components/OperationBtnGroup/index.vue、institution/agencyBranch/components/AgencyBranchDetail.vue、institution/leasePersonnel/components/LeasePersonnelDetail.vue、utils/flowApi.js
- 所属项目：苏州市房地产监测V3；来源会话：44e93c46-8334-4d7b-acd0-2ebaf6f3edea；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_change_id_bug",
  "source_extraction_id": "c0498ba19aef4c5095e6c258c82f91ce",
  "version": 1,
  "memory_type": "entities"
}
-->