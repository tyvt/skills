# detail.vue 中缺失字段导致 Vue 警告
在项目 苏州市房地产监测V3 中，InformationPush 的 `detail.vue` 和 `changeDetail.vue` 缺少 `primaryKey`、`moduleName`、`businessName`，且命名不规范，导致 Vue 警告。

## 问题根因
- `supervision/unblock/InformationPush` 下的 `detail.vue` 和 `changeDetail.vue` 缺少 `primaryKey`、`moduleName`、`businessName`
- 组件名称未规范化导致 Vue 警告

## 解决方案
- 已添加字段并将组件重命名为 `InformationPushDetail` 和 `InformationPushChangeDetail`

## 验证
- 验证证据: src=苏州市房地产监测V3-rest/051.md
- 涉及文件: supervision/unblock/InformationPush/detail.vue, mixins/detailMixins.js, supervision/unblock/InformationPush/changeDetail.vue, api/InformationPush.js, supervision/unblock/noticeChange/detail.vue, api/InformationPushChange.js, mixins/form.js, supervision/unblock/notice/detail.vue
- 所属项目: 苏州市房地产监测V3; session: b2283e1b-5660-4ecc-9c6b-175b05319777; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b2283e1b-5660-4ecc-9c6b-175b05319777


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "infopush_detail_missing_fields",
  "source_extraction_id": "d95879747bf7424f888902315b00312c",
  "version": 1,
  "memory_type": "entities"
}
-->
