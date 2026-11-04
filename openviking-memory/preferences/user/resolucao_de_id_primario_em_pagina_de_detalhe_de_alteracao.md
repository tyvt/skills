- 变更详情页应当从多个路由来源获取主键 ID，而不仅仅是 `$route.query.id`。
- 添加计算属性，从 `$route.query.id`、`$route.params.tableid`、`getId()` 和 `form` 解析 ID，以便在 `getDetail` 中使用。
- `detailCallback` 应当填充路由 ID 以避免主键为空。
- 已在 companyRecord/detail.vue, companyRecord.js, companyBasicInfoContent.js, CompanyBasicInfoDetail.vue, detailMixins.js, change/detail.vue, form.js, toB/change/detail.vue 中验证。
- 会话来源: 24a5c5a8-dd40-426d-9696-d87bebf426bd

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 变更详情页中的主 ID 解析",
  "source_extraction_id": "2caf19ed878349fabc9e287d547e1439",
  "version": 1,
  "memory_type": "preferences"
}
-->
