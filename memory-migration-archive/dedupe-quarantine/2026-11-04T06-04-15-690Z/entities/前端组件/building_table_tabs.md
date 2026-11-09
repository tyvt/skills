# BuildingTableViewTabs
共享楼幢房屋选择视图组件，用于"选择户室"对话框。

## Description
- 渲染楼幢房屋视图，原含列表视图与楼盘表视图两个选项卡
- 2026-11-03 新增 showBuildingTableTab 属性（默认 true），为 false 时隐藏楼盘表视图选项卡并直接显示列表

## Usage
- 业主自治表决模块 6 个决策范围表格复用（option/multiply/repair/general/election/apply/preparatoryApply），均传 false
- building/building/detail.vue 与 buildingChange/detail.vue 的"楼盘表"弹窗复用，以表格视图为核心功能须保留选项卡

## Relations
- 与 decisionRangeBuildingSelectMixins.js 配合，列表数据由 flattenHouseList 聚合所有楼幢 floorHouses 提供
- 所属项目惠山二期G（zhi2-web-admin 子模块），分支 develop/v2.6.2-huishan

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "building_table_tabs",
  "source_extraction_id": "c841c3ea748d40299ef8b3b0a09b3bed",
  "version": 1,
  "memory_type": "entities"
}
-->