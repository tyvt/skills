# 从业人员变更须传变更态id
苏州市房地产监测V3 中经纪/租赁从业人员页内变更时 operation-btn-group 未传 :id 误用路由 personnelRecordId 提交，实际需 personnelRecordChangeId。

## 问题根因
- 经纪/租赁从业人员页内变更时 `operation-btn-group` 未传 `:id`
- 误用路由 `personnelRecordId` 提交，实际需 `personnelRecordChangeId`

## 修复方案
- `AgencyPersonnelDetail.vue` 与 `LeasePersonnelDetail.vue` 增加 `flowBusId` 计算属性并传 `:id="flowBusId"`
- `primaryKey` 改为变更态取 `personnelRecordChangeId`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/201.md
- 涉及文件：company/staffManagement/components/detail.vue、api/company/personnelRecord.js、toB/personnelRecord/components/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、components/OperationBtnGroup/index.vue、institution/agencyBranch/components/AgencyBranchDetail.vue、institution/leasePersonnel/components/LeasePersonnelDetail.vue、utils/flowApi.js
- 所属项目：苏州市房地产监测V3；来源会话：44e93c46-8334-4d7b-acd0-2ebaf6f3edea；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_change_id",
  "source_extraction_id": "c2f3492a784b4a58801149b7d05e2e19",
  "version": 1,
  "memory_type": "entities"
}
-->