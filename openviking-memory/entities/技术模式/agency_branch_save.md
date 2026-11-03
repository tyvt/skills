# 代理机构分支保存不触发审批备案
苏州市房地产监测V3 的 AgencyBranchDetail.vue 保存仅走表单校验后调保存接口，移除要件预检与审批提交流程，由主机构备案后后端自动置状态。

## 实现要点
- `AgencyBranchDetail.vue` 保存仅走 `handleSave` 做表单校验后调保存接口
- 移除 `validateAppendix` 预检与 `submit`/`approval` 流程
- `agencyBranch.js` 删除 `listAgencyBranchAppendix` 接口
- 主机构备案后后端自动置 `recordState=1`，要件不上前置拦截

## 涉及文件
- zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchDetail.vue
- zhi2-web-admin/src/views/property/complex/detail.vue
- zhi2-web-admin/src/mixins/detailMixins.js、form.js、formComponents.js
- zhi2-web-admin/vite.config.js
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- zhi2-web-admin/src/views/institution/agencyBranch/components/AgencyBranchList.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/115.md
- 来源会话：40edb9e5-354a-4c2b-8557-eea7a3245770；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_save",
  "source_extraction_id": "b79ed4e1f3b24aa293ba672b370861aa",
  "version": 1,
  "memory_type": "entities"
}
-->