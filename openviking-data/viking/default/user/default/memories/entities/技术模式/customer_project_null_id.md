# 由于 projectId 为 null 导致点击建筑表格无响应
在 zhi2-web-admin 的 customerProject 模块中，`openBuildingTable()` 静默返回，因为 `form.projectId` 为 null。

## 问题
- 在 `customerProject/detail.vue` 中，`openBuildingTable()` 在 `form.projectId` 为 null 时静默返回，导致点击无响应
- `form.projectId` 的值为 null，且控制台没有报错

## 解决方案
- 使用了回退链：`this.form.projectId || this.id || this.$route.params.tableId || this.$route.query.id` 来获取 projectId

## 文件与验证
- 涉及文件: `projectManagement/customerProject/detail.vue`, `utils/ruoyi.js`, `e2e/projectManagement/building-table-debug.spec.js`, `e2e/projectManagement/building-table-meixiang.spec.js`
- 验证证据: src=苏州市房地产监测V3/082.md
- 会话: 01a16159-63a8-7295-ba46-c2ad374e49ae; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "customer_project_null_id",
  "source_extraction_id": "76e4ca67ffce43169e9634f0f346d6db",
  "version": 1,
  "memory_type": "entities"
}
-->