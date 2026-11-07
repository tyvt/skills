# 缺少字段和组件名称不正确导致 Vue warn
在 Suzhou Real Estate Monitoring V3 项目中，`detail.vue` 和 `changeDetail.vue` 未声明主键和字段，并且组件名称不兼容，触发了 Vue warn。

## 问题根因
- `detail.vue` 和 `changeDetail.vue` 未在 `data()` 中声明 `primaryKey`、`moduleName`、`businessName`
- 组件名称不兼容会触发 Vue warn

## 关键解决方案
- 添加三个字段（`businessName` 分别为 'infoReport' 和 'infoReportChange'）
- 将组件重命名为 `InformationPushDetail` 和 `InformationPushChangeDetail`
- 清理 `data()` 中多余的缩进

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b2283e1b-5660-4ecc-9c6b-175b05319777
- 验证证据: src=苏州市房地产监测V3/103.md
- 涉及文件: detail.vue, changeDetail.vue, detailMixins.js, InformationPush.js, InformationPushChange.js, form.js, notice/detail.vue
- 会话: b2283e1b-5660-4ecc-9c6b-175b05319777; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "vue_component_naming_bug",
  "source_extraction_id": "7f4f7c73a9974a71af95ef834460ef0b",
  "version": 2,
  "memory_type": "entities"
}
-->