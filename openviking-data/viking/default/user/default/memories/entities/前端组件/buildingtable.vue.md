# BuildingTable.vue
园区物管2.0 中展示二维楼盘表（名义层×单元×户室格子图）的统一主组件，被 14+ 处引用。
## 实现拓扑
- 唯一主组件位于 zhi2-web-admin/src/views/components/BuildingTable.vue，样式走 SCSS flex + CSS 变量 --cell-width/--columns-per-row，房间格支持选中三角标与自定义 cellStyle。
- 维修资金侧另有副本 zhi2-web-admin/src/views/maintenance/components/BuildingTable.vue，改前必须 grep 全部引用确认两条实现各自影响面。
## 关联
- 楼盘管理、维修资金（开户/缴存通知）、业主自治（表决/维修/多筹）、收益等模块共用二维楼盘表。
- 选房弹窗壳复用 zs-select-dialog，弹窗标题「楼盘表」、tab 文案「楼盘表视图」散落在 building/houseSplit、houseMerge、maintenance/*/ScopeSelectDialog 等处，收敛文案需逐处核对。
## 约定
- 需要统一调整楼盘表样式/行为时以主组件为优先入口；两套实现、三套 tab 切换写法需注意改动漂移。

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "BuildingTable.vue",
  "source_extraction_id": "bac00bb0f43c43b58b0b15478530d125",
  "version": 1,
  "memory_type": "entities"
}
-->