# listName命名冲突修复
苏州市房地产监测V3 中因 `listName` 在 mixin 的 `data()` 与组件 prop 中重复声明触发 `[Vue warn]` 的问题已修复。

## 问题原因
- `table.js` mixin 在 `data()` 里定义 `listName`（用于列表标题显示）
- `PlanLicRelatedBuildingTable.vue` 又把 `listName` 声明为 prop（用于新增楼幢时 API 请求体字段名）
- Vue 不允许同一属性同时存在于 `props` 和 `data`，因此出现警告

## 核心修复
- 将 API 提交字段的 prop 重命名为 `submitDataKey`，避免与 mixin 的 `listName` 冲突
- `ConsLicBuildTable.vue` 同类问题一并修复
- `planLic/changeDetail.vue`、`consLic/changeDetail.vue` 的 `list-name` 改为 `submit-data-key`

## 验证与归属
- 验证：刷新规划许可证详情页后该 Vue warn 应不再出现
- 涉及文件：`table.js`、`PlanLicRelatedBuildingTable.vue`、`ConsLicBuildTable.vue`、`planLic/changeDetail.vue`、`consLic/changeDetail.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：55d7d7d9-e5d7-412b-9318-c88e962e77f3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "listName命名冲突修复",
  "source_extraction_id": "18ca73be4ea94ff19b5e4b11ed5cacdb",
  "version": 1,
  "memory_type": "entities"
}
-->