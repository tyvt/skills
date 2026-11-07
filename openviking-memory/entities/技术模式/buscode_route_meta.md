# 机构备案busCode读取路由meta
机构备案审批流程应读取路由meta中的busCode而非硬编码，以匹配菜单配置。

## 问题根因
- companyApplyAudit/detail.vue 硬编码 `busCode: 'company_apply'` 导致审批流程未匹配菜单配置 `jjjgba`

## 关键修复
- 移除硬编码并引入 `getRouteMetaValue` 从路由meta读取
- CompanyApplyApprovalDialog.vue 新增 `effectiveBusCode` computed 优先父组件传入否则回退路由meta

## 涉及文件
- company/companyApply/detail.vue
- mixins/approval.js
- company/companyApplyAudit/detail.vue
- utils/flowApi.js
- institutionRegister/detail.vue
- components/OperationBtnGroup/index.vue
- components/ZsSubmit/index.vue
- institution/record/detail.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/098.md
- 来源会话ID：c570d618-d3e1-4953-bd62-22a32dd7992a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buscode_route_meta",
  "source_extraction_id": "9e8e2d3533054e708a85237f24078d9d",
  "version": 1,
  "memory_type": "entities"
}
-->