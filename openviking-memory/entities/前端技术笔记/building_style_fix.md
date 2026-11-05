# 选择房屋弹窗样式修复
修复选择房屋弹窗内楼幢表被压扁、单元名竖排等问题。

## 修改内容
- `views/components/BuildingTable.vue`：.floor-label/.unit-label/.unit-rooms 增 flex-shrink:0；.unit-label 增 white-space:nowrap；.room-cell 增 min-width；.table-header/.floor-row 增 flex-wrap:nowrap
- `maintenance/facility/components/RangeTable.vue`：zs-select-dialog 启用 building-table-mode；BuildingTable 设 cell-width="120"；增 .building-table-wrapper 滚动容器；调整弹窗右侧 padding 与 flex 布局

## 验证与归属
- 涉及文件：BuildingTable.vue、RangeTable.vue 等
- 所属项目：园区公共收益；来源会话：f5c910bd-d8dd-4878-952a-b6286f9f507f

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "building_style_fix",
  "source_extraction_id": "4e197fd9c17d47ec9857dc89e475924b",
  "version": 1,
  "memory_type": "entities"
}
-->