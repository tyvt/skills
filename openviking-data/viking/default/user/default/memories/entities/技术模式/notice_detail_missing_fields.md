# 通知详情中缺少CRUD字段导致Vue警告和API错误
在 Suzhou Real Estate Monitoring V3 项目中，supervision/unblock/notice 的 detail.vue 未在 data() 中声明字段，导致在 mixin form.js 中出现绑定警告和 API 拼接错误。

## 问题根因
- `src/views/supervision/unblock/notice/detail.vue` 未在 `data()` 中声明 `primaryKey`、`moduleName`、`businessName`
- 导致在 `operation-btn-group` 中出现绑定警告，以及在 mixin `form.js` 中出现 API 拼接错误

## 解决方案
- 在 `data()` 中添加了 `primaryKey: 'allotNoticeId'`、`moduleName: 'prefund'`、`businessName: 'notice'`
- 值与模块的 API 路径保持一致

## 验证
- 验证证据: src=苏州市房地产监测V3/238.md
- 涉及文件: detail.vue, detailMixins.js, deposit/notice/detail.vue, form.js, api/capital/notice.js, unblock/noticeChange/detail.vue, unblock/guarantee/changedetail.vue, formComponents.js
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: f35d14e1-f0a5-4fa4-b44d-947275ba1b5c; 代码库: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：f35d14e1-f0a5-4fa4-b44d-947275ba1b5c


<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "notice_detail_missing_fields",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 4,
  "memory_type": "entities"
}
-->
