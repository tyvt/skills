# 经纪分支备案fzjgba变更fzjgbg不取菜单
苏州市房地产监测V3 中经纪分支备案详情用 `fzjgba`、变更详情用 `fzjgbg`，且不从菜单 `meta.busCode` 读取避免编码错误。

## 编码约定
- `AgencyBranchDetail.vue` 备案详情使用 `fzjgba`、变更详情使用 `fzjgbg`
- 不从菜单 `meta.busCode` 读取，避免编码错误
- `agencyBranchChange.js` 定义常量与解析函数

## 路由跳转
- `companyChangeManage/index.vue` 依据 `busCode === fzjgbg` 跳转分支详情

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/155.md
- 涉及文件：institution/agencyBranch/components/AgencyBranchDetail.vue、institution/agencyBranch/components/CancelDialog.vue、institution/agencyBranch/detail.vue、api/company/agencyBranchChange.js、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、company/companyChangeManage/index.vue、e2e/fixtures/institution-menu-config.js、e2e/utils/appendix-requirement-grid.spec.js
- 所属项目：苏州市房地产监测V3；来源会话：0a4df64c-e15c-40ae-81df-5b5eed7d1ceb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_buscode_pattern",
  "source_extraction_id": "c0498ba19aef4c5095e6c258c82f91ce",
  "version": 1,
  "memory_type": "entities"
}
-->