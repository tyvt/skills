# 中介分支 GetOwnCompany
在苏州市房地产监测V3项目中，新建分支页面使用 `getOwnCompany` 代替 `init` 进行预填充的修正。

## 实施要点
- 在 `AgencyBranchDetail.vue` 中，`loadInit` 改为 `loadAddPage`，使用 `getOwnCompany` 获取中介信息并禁用字段。
- 在新增状态下，发送 `configOnly`，并通过 `/add` 的 `attachmentList` 附加 `draftAppendixIds`。
- 没有 `agencyBranchId` 的本地草稿仍注入 `AgencyBranchList.vue`；E2E 用例 `agency-branch-real-api-flow.spec.js` 期望 `getOwnCompany` 而不是 `init`。

## 涉及文件
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchList.vue
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/institution/agency-branch-real-api-flow.spec.js

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/026.md
- 会话: 01a162aa-5047-70c5-a400-7594cbb8728b
- 所属项目: 苏州市房地产监测V3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_getowncompany",
  "source_extraction_id": "2541e120aaed44a78ac4d8041d820fd0",
  "version": 1,
  "memory_type": "entities"
}
-->