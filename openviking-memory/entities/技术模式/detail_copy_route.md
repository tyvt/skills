# 详情页复制须遵detailMixins删query
苏州市房地产监测V3 中 template/detail.vue 复制与路由变更集中在 copyContract、getForm 与 addCallback，遵循 detailMixins + buildDetailNavigation 模式。

## 实现要点
- `template/detail.vue` 复制与路由变更集中在 `copyContract`、`getForm` 与 `addCallback`
- 遵循 `detailMixins` + `buildDetailNavigation` 模式
- `delete query.id` 避免新增页误用旧 `query.id` 触发 `getId()`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/201.md
- 涉及文件：template/detail.vue、mixins/detailMixins.js、utils/ruoyi.js、mixins/form.js、template/index.vue、main.js、mixins/formComponents.js、presale/entrustSale/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：7ac76176-7f32-49ff-b2a2-3fcca652d3e1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_copy_route",
  "source_extraction_id": "c2f3492a784b4a58801149b7d05e2e19",
  "version": 1,
  "memory_type": "entities"
}
-->