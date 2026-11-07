# 分支机构备案草稿行丢失修复
苏州市房地产监测V3 中分支机构备案返回列表后找不到草稿行的问题已修复，改用独立草稿 key。

## 问题根因
- 新增页的 `sessionStorage`（`/jjjg/agencyBranch/add`）在离开时被清掉，导致返回列表后找不到草稿行

## 修改内容
- `AgencyBranchDetail.vue`：填表时写入 `agencyBranchListDraft`，离开新增页回列表时再写一次；保存成功后清除
- `AgencyBranchList.vue`：`mergeDraftRowFromSession()` 优先读该 key，删除成功后一并清理

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyBranchDetail.vue、AgencyBranchList.vue、e2e/institution/agency-branch-real-api-flow.spec.js、e2e/fixtures/institution-helpers.js
- 所属项目：苏州市房地产监测V3；来源会话ID：ead67c00-2a16-4a80-bddc-d79c14aab439；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_draft_fix",
  "source_extraction_id": "81e9f941fa0f412b93a6270edb81daa5",
  "version": 1,
  "memory_type": "entities"
}
-->