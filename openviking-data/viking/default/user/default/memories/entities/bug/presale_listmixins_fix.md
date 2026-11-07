# 预售楼幢子表误用listMixins修复
苏州市房地产监测V3 中 PresaleBuildingTable.vue 误用 listMixins 导致 Vue2 警告，已通过移除 mixin 修复。

## 问题原因
- `PresaleBuildingTable` 是预售许可详情里的子表，却混入了 `listMixins`
- 该 mixin 在 `created` 里用 `this.$set(this, 'queryParams', …)` 动态挂字段
- 子表未在 `data` 里声明 `queryParams`，触发 Vue 2 的 warn
- 子表实际只用全局 `formatters`、`msgSuccess`，不依赖列表查询等 mixin 能力

## 修复方式
- 已从 `PresaleBuildingTable.vue` 去掉 `listMixins` 的 import 与 `mixins` 配置
- 若「房屋」Tab 仍出现同类提示，`PresaleHouseTable.vue` 可能也误用了 `listMixins`，可按同样方式去掉

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证：刷新详情页后，楼幢 Tab 下警告应消失
- 涉及文件：`PresaleBuildingTable.vue`、`PresaleSelectBuildingDialog.vue`、`mixins/listMixins.js`
- 所属项目：苏州市房地产监测V3；来源会话：69921419-8a4f-4e43-b9d8-780e617536da

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "presale_listmixins_fix",
  "source_extraction_id": "eb7c3c1e01c14b17a2de9c1e4de0e0e9",
  "version": 1,
  "memory_type": "entities"
}
-->