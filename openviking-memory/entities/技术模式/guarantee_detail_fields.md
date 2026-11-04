# 担保详情缺少字段导致请求错误
在项目 Suzhou Real Estate Monitoring V3 中，`guarantee/detail.vue` 的 `data()` 缺少 `primaryKey`、`moduleName`、`businessName`，导致 Vue 警告并阻止 `getDetail()` 挂载 `/prefund/useMoneyApply/detail`。

## 问题根因
- `guarantee/detail.vue` 的 `data()` 缺少字段 `primaryKey`、`moduleName`、`businessName`
- 导致 Vue 警告并且 `getDetail()` 拼接 `/prefund/useMoneyApply/detail` 失败

## 解决方案
- 在 `guarantee/detail.vue` 的 `data()` 中补全这三个字段，与 `guarantee/index.vue` 对齐

## 验证与归因
- 验证证据: src=苏州市房地产监测V3/202.md
- 涉及文件: supervision/unblock/guarantee/detail.vue, mixins/detailMixins.js, supervision/unblock/guarantee/index.vue, supervision/unblock/usemoney/detail.vue, supervision/unblock/guarantee/changedetail.vue, supervision/unblock/usemoneyRevoke/detail.vue, mixins/form.js, supervision/unblock/notice/detail.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: e533c035-bd03-4c12-aa72-72937c898843; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "guarantee_detail_fields",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 2,
  "memory_type": "entities"
}
-->