# 变更详情页缺少字段导致 Vue 警告和 API 错误
在 Suzhou Real Estate Monitoring V3 项目中，`change/detail.vue` 未在 `data()` 中声明字段，导致 Vue 警告和 API 路径拼接错误。

## 问题根因
- `change/detail.vue` 未在 `data()` 中声明 `primaryKey`/`moduleName`/`businessName`
- 导致在 mixin `form.js` 的 `getDetail()`/`submitForm()` 中出现 Vue 渲染警告和 API 拼接错误

## 解决方案
- 在 `zhi2-web-admin/src/views/supervision/progress/change/detail.vue` 的 `data()` 中添加了 `primaryKey: 'proChangeId'`, `moduleName: 'prefund'`, `businessName: 'proChange'`

## 验证
- 验证证据: src=苏州市房地产监测V3-leftover/098.md
- 涉及文件: supervision/progress/change/detail.vue, supervision/progress/node/detail.vue, mixins/detailMixins.js, supervision/progress/change/index.vue, mixins/form.js
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 877ff504-7267-4d24-9ee5-644aa1f9adbb; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "change_detail_missing_fields",
  "source_extraction_id": "0b4492fb95804bc7a75d78f6242e5c1b",
  "version": 3,
  "memory_type": "entities"
}
-->