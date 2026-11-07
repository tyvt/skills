# 选择房屋弹窗楼盘表样式修复
修复园区公共收益项目选择房屋弹窗中楼盘表被压扁、单元名竖排换行等问题。

## 修改内容
- `views/components/BuildingTable.vue`：`.floor-label`、`.unit-label`、`.unit-rooms` 增加 `flex-shrink: 0`，`.unit-label` 增加 `white-space: nowrap`，`.room-cell` 增加 `min-width`，`.table-header`、`.floor-row` 增加 `flex-wrap: nowrap`
- `maintenance/facility/components/RangeTable.vue`：启用 `zs-select-dialog` 的 `building-table-mode`，`BuildingTable` 设 `cell-width="120"`，增加 `.building-table-wrapper` 滚动容器，调整右侧区域 padding 与 flex 布局

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：BuildingTable.vue、RangeTable.vue、RangeHouseTable.vue
- 所属项目：园区公共收益；来源会话：f5c910bd-d8dd-4878-952a-b6286f9f507f

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "building_table_fix",
  "source_extraction_id": "4362f32ddadb43a382566e25423341a1",
  "version": 1,
  "memory_type": "entities"
}
-->