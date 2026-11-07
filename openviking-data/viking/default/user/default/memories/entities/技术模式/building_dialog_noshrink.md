# building_dialog_noshrink
对话框中的建筑表格遭受 flex 压缩导致标签垂直显示；需要禁止压缩并启用水平滚动。

## 问题根因
- 对话框内的建筑表格遭受 flex 压缩，导致标签垂直且被压扁

## 解决方案
- 在 BuildingTable.vue 中，.floor-label 和 .unit-label 添加 flex-shrink:0 和 white-space:nowrap
- room-cell 设置 min-width；.table-header 和 .floor-row 设置 flex-wrap:nowrap
- RangeTable.vue 启用 building-table-mode，cell-width="120" 以及容器 .building-table-wrapper 设置水平滚动

## 涉及文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/facility/components/RangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/facility/components/RangeHouseTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/maintenance/components/BuildingTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/benefit/pubElevMaintenanceIncome/detail.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue

## 验证
- 验证证据: src=园区公共收益/022.md
- 来源会话: f5c910bd-d8dd-4878-952a-b6286f9f507f; 代码库: none
- 所属项目: 园区公共收益

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_dialog_noshrink",
  "source_extraction_id": "ccbd39c039a14bdfb4f33ad7c92e7d5f",
  "version": 1,
  "memory_type": "entities"
}
-->
