---
audit_status: valid
last_checked: 2026-11-28T01:49:31+08:00
verdict_note: 命中 $route.params.tableid/$route.query.id/getId()/detailCallback/getDetail/companyRecord/detailMixins，变更详情主 ID 解析属实。
---
- 变更详情页应当从多个路由来源获取主键 ID，而不仅仅是 `$route.query.id`。
- 添加计算属性，从 `$route.query.id`、`$route.params.tableid`、`getId()` 和 `form` 解析 ID，以便在 `getDetail` 中使用。
- `detailCallback` 应当填充路由 ID 以避免主键为空。
- 已在 companyRecord/detail.vue, companyRecord.js, companyBasicInfoContent.js, CompanyBasicInfoDetail.vue, detailMixins.js, change/detail.vue, form.js, toB/change/detail.vue 中验证。
- 会话来源: 24a5c5a8-dd40-426d-9696-d87bebf426bd

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：24a5c5a8-dd40-426d-9696-d87bebf426bd

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->