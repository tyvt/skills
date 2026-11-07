# 子表混用 listMixins 未声明属性引发 Vue 警告
在项目 Suzhou Real Estate Monitoring V3 (zhi2-web-admin) 中，`PresaleBuildingTable.vue` 作为子表混用了 `listMixins`，并在 `created` 中使用 `this.$set` 动态挂载未在 `data` 中声明的 `queryParams`，触发了 Vue 2 警告。

## 问题根因
- `PresaleBuildingTable.vue` 作为子表混用了 `listMixins`
- 在 `created` 中，`this.$set` 动态挂载了未在 `data` 中声明的 `queryParams`
- 这触发了 Vue 2 的警告

## 解决方案
- 从 `PresaleBuildingTable.vue` 中移除了 `listMixins` 的 import 和 `mixins` 配置
- 如果存在同样的不正确使用，`PresaleHouseTable.vue` 也应进行类似移除

## 验证与文件
- 验证证据: src=苏州市房地产监测V3/286.md
- 涉及文件: PresaleSelectBuildingDialog.vue, listMixins.js, table.js, PresaleBuildingTable.vue, main.js, PresaleHouseTable.vue
- 所属项目: Suzhou Real Estate Monitoring V3; 会话: 69921419-8a4f-4e43-b9d8-780e617536da; baseline: none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：69921419-8a4f-4e43-b9d8-780e617536da


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_listmixins_undeclared_prop",
  "source_extraction_id": "ea52cb840c62465ab3fb0dba5f6a6e78",
  "version": 2,
  "memory_type": "entities"
}
-->
