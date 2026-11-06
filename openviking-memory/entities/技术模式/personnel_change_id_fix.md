# 从业人员变更提交 ID 修复
苏州市房地产监测V3 修复经纪/租赁从业人员页内变更提交时误用备案 ID 的问题，改为使用变更单 ID。

## 问题根因
- 路由里的 `id` 仍是备案主键 `personnelRecordId`，变更单 ID 在 `personnelRecordChangeId`
- `operation-btn-group` 未传 `:id` 时会用路由 `id` 做提交，导致变更提交误用了备案 ID

## 修改内容
- `AgencyPersonnelDetail.vue`（经纪机构）、`LeasePersonnelDetail.vue`（租赁机构）增加计算属性 `flowBusId`：变更态用 `changeRecordId`（即 `personnelRecordChangeId`），否则用 `personnelRecordId`
- `primaryKey` 改为计算属性：变更态为 `personnelRecordChangeId`
- 给 `operation-btn-group` 传入 `:id="flowBusId"`
- 参考 `staffManagement/detail.vue`、`AgencyBranchDetail.vue` 的写法；开发企业从业人员变更（`company/staffManagement/components/detail.vue`）此前已正确传入 `flowBusId`，未改

## 效果
- 发起变更后点「提交」，请求体应变为变更单 ID

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：44e93c46-8334-4d7b-acd0-2ebaf6f3edea
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_change_id_fix",
  "source_extraction_id": "b6820f9cb17546e1b9b6efc01324a33b",
  "version": 1,
  "memory_type": "entities"
}
-->