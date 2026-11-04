# listName 在 props 和 data 中同时声明会生成 Vue 警告
在 Suzhou Real Estate Monitoring V3 (zhi2-web-admin) 项目中，mixin `table.js` 在 `data()` 中定义了 `listName`，而诸如 `PlanLicRelatedBuildingTable.vue` 等组件将其声明为 prop，违反了 Vue 禁止同一属性共存的规则。

## 问题根因
- mixin `table.js` 在 `data()` 中定义了 `listName`
- 诸如 `PlanLicRelatedBuildingTable.vue` 等组件将其声明为 prop
- Vue 禁止同一属性同时存在于 props 和 data 中，会生成警告

## 解决方案
- 将 API 提交字段的 prop 重命名为 `submitDataKey`
- 修改了 `ConsLicBuildTable.vue` 和 `changeDetail.vue` 中的 `list-name` 绑定以使用新名称

## 验证与文件
- 验证证据: src=苏州市房地产监测V3-leftover/084.md
- 涉及文件: PlanLicRelatedBuildingTable.vue, subTableMixins.js, table.js, ListTemplate.js, ConsLicBuildTable.vue, planLic/detail.vue, planLic/changeDetail.vue, consLic/changeDetail.vue
- 所属项目: Suzhou Real Estate Monitoring V3; session: 55d7d7d9-e5d7-412b-9318-c88e962e77f3; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listname_props_data_conflict",
  "source_extraction_id": "0ec9de86592745d2954137491ac6674b",
  "version": 1,
  "memory_type": "entities"
}
-->