# 分支机构详情查看态按钮修复
修复苏州市房地产监测V3中分支机构详情查看状态仍显示「保存」按钮的问题。

## 问题根因
- AgencyBranchDetail.vue 头部按钮组未按业务状态限制可编辑性，导致查看已备案/主管部门端时仍显示保存

## 修复方案
- canEditInHeader：仅企业端（B端）且 bizState==='0'（未备案）、未注销时可编辑，与列表页编辑按钮条件一致
- showSaveButton：仅在新增或满足 canEditInHeader 的编辑模式显示
- isViewDisplay：查看模式或不可编辑时强制只读，与头部按钮状态对齐

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 查看已备案分支机构为只读展示，头部无「保存」「编辑」按钮
- 涉及文件：AgencyBranchDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：27689708-9f9b-4386-9993-e547142b1ab3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_detail_edit_fix",
  "source_extraction_id": "6f58039a3564482e961b58f9f1b314ce",
  "version": 1,
  "memory_type": "entities"
}
-->