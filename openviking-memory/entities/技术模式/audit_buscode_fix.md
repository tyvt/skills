# 企业备案审核总线代码路由修复
苏州市房地产监测V3 中修复机构备案审核详情页提交时 busCode 硬编码错误，改为从路由 meta 读取。

## 修改内容
- `companyApplyAudit/detail.vue` 移除硬编码 `busCode: 'company_apply'`，引入 `getRouteMetaValue`，通过 computed 从路由 meta 读取 `busCode`
- 提交、审批、流程查看等场景均使用菜单配置的 `jjjgba`，不再走错误的 `company_apply`
- `CompanyApplyApprovalDialog.vue` 将 `busCode` prop 默认值改为空字符串
- 新增 `effectiveBusCode` computed：优先用父组件传入的 `busCode`，否则回退到路由 meta

## 验证与归属
- 验证：机构备案详情页（草稿状态）点击「提交」，Network 确认请求 `busCode=jjjgba`
- 所属项目：苏州市房地产监测V3
- 涉及文件：`companyApplyAudit/detail.vue`、`CompanyApplyApprovalDialog.vue`、`src/mixins/approval.js`
- 来源会话ID：c570d618-d3e1-4953-bd62-22a32dd7992a
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "audit_buscode_fix",
  "source_extraction_id": "1b437f2445fb45d88bc3adbd9f0c4f74",
  "version": 1,
  "memory_type": "entities"
}
-->