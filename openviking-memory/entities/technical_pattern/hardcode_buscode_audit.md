# 硬编码busCode致机构备案审批流程未维护
苏州市房地产监测V3的 companyApplyAudit/detail.vue 硬编码 busCode 未用路由 meta，致审批流程未维护，已改为从路由 meta 读取。

## 问题根因
- companyApplyAudit/detail.vue 硬编码 busCode: 'company_apply'
- 未使用路由 meta 菜单配置（如 jjjgba），致审批流程未维护

## 修复方案
- detail.vue 引入 getRouteMetaValue 从路由 meta 读 busCode
- CompanyApplyApprovalDialog.vue 置空 prop 默认值并新增 effectiveBusCode computed 回退路由 meta

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/044.md
- 涉及文件：companyApply/detail.vue、approval.js、companyApplyAudit/detail.vue、flowApi.js、institutionRegister/detail.vue、OperationBtnGroup/index.vue、ZsSubmit/index.vue、record/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：c570d618-d3e1-4953-bd62-22a32dd7992a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "hardcode_buscode_audit",
  "source_extraction_id": "d1feece445ef4148b81c08e9d8a871a2",
  "version": 2,
  "memory_type": "entities"
}
-->