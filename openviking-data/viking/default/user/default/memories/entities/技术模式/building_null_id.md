
# 楼栋表 projectId 为空导致点击无响应
在苏州市房地产监测V3项目中，`projectId` 为空导致楼栋表点击无响应。

## 根因与修复
- 根因：`/building/project/detail` 返回的 `projectId` 为 `null`；旧代码 `openBuildingTable()` 中 `if(!this.form.projectId) return` 静默退出。
- 在 `zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue` 中，`projectId` 改为使用兜底链（`this.id`/`$route.params.tableId`/`$route.query.id`）。

## 涉及文件
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/projectManagement/customerProject/detail.vue
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/src/utils/ruoyi.js
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/projectManagement/building-table-debug.spec.js
- D:/repository/苏州市房地产监测V3/zhi2-web-admin/e2e/projectManagement/building-table-meixiang.spec.js

## 验证与来源
- 证据：src=苏州市房地产监测V3-rest/025.md
- 会话：01a16159-63a8-7295-ba46-c2ad374e49ae
- 项目：苏州市房地产监测V3；基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_null_id",
  "source_extraction_id": "880cd4f745e24b6faab82b1cdaea3e14",
  "version": 3,
  "memory_type": "entities"
}
-->