# 机构入网审核详情服务方案不显示修复
苏州市房地产监测V3 修复机构入网审核详情页服务方案「暂无数据」问题。

## 问题原因
- 机构入网审核详情拉取 `/company/companyRegister/detail` 后，服务方案只走 `/company/companyScheme/page` 分页接口
- 审核中的方案在详情内嵌的 `schemeList` / `companySchemeList`，分页接口常为空，表格显示「暂无数据」

## 改动内容
- 优先使用详情内嵌列表：取第一个非空数组 `companySchemeList` 或 `schemeList`
- 内嵌有数据时做前端分页 `slice`，不再请求 `pageCompanySchemes`
- 内嵌为空时仍走原分页接口兜底
- 每次 `loadDetail` 将 `schemeQueryParams.pageNum` 重置为 1
- 经纪 / 租赁入网审核详情共用该页，改一处即可

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- E2E 新增：`zhi2-web-admin/e2e/company/institution-register-audit-scheme.spec.js`
- 涉及文件：`zhi2-web-admin/src/views/company/institutionRegister/detail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：f93aa12c-1cdd-411f-adfa-0e6cc96d1075；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_scheme_fix",
  "source_extraction_id": "0ccd7bff9041434180a90a58ba497359",
  "version": 1,
  "memory_type": "entities"
}
-->