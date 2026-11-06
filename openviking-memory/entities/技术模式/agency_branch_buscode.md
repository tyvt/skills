# 经纪机构分支机构busCode对齐
苏州市房地产监测V3 按约定对齐经纪机构分支机构的 `busCode` 使用方式，避免菜单配置不一致导致要件或流程编码错误。

## 改动要点
- `AgencyBranchDetail.vue`（分支机构详情/变更详情共用页）：备案详情（非变更态）用 `fzjgba`，变更详情用 `fzjgbg`，不再从菜单 `meta.busCode` 读取
- `agencyBranchChange.js`：新增常量 `AGENCY_BRANCH_RECORD_BUS_CODE = 'fzjgba'`、`AGENCY_BRANCH_CHANGE_BUS_CODE = 'fzjgbg'`
- `agencyBranchChange.js`：新增 `resolveAgencyBranchRecordBusCode()` / `resolveAgencyBranchChangeBusCode()`，写法与从业人员 `jgcyryba` / `jgcyrybg` 一致
- `companyChangeManage/index.vue`：变更管理列表中 `busCode === fzjgbg` 时跳转 `institution/agencyBranch/detail` 并带 `agencyBranch` 参数

## 涉及文件与归属
- 涉及：`AgencyBranchDetail.vue`、`agencyBranchChange.js`、`companyChangeManage/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：0a4df64c-e15c-40ae-81df-5b5eed7d1ceb；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_buscode",
  "source_extraction_id": "8ee8ad2a783a42efa0955c2b001cebc4",
  "version": 1,
  "memory_type": "entities"
}
-->