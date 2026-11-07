# prop与data重名listName致Vue警告
苏州市房地产监测V3 的 zhi2-web-admin 中 table.js mixin 的 data() 与组件 prop 同名 listName 冲突，触发 Vue 警告。

## 问题根因
- `table.js` mixin 的 `data()` 中 `listName` 与 `PlanLicRelatedBuildingTable.vue` 等组件的 prop `listName` 同名冲突
- Vue 禁止 props 和 data 同属性

## 修复方案
- 将 API 提交字段 prop 重命名为 `submitDataKey`
- 同步修改 `ConsLicBuildTable.vue`、`planLic/changeDetail.vue`、`consLic/changeDetail.vue` 的相关绑定

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/284.md
- 涉及文件：planLic/components/PlanLicRelatedBuildingTable.vue、mixins/subTableMixins.js、mixins/table.js、mixins/ListTemplate.js、consLic/components/ConsLicBuildTable.vue、planLic/detail.vue、planLic/changeDetail.vue、consLic/changeDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：55d7d7d9-e5d7-412b-9318-c88e962e77f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listname_prop_conflict",
  "source_extraction_id": "f1c4654c51974fa2a2a5c10e8aeed237",
  "version": 1,
  "memory_type": "entities"
}
-->