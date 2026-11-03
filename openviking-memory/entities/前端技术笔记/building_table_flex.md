# 楼盘表组件窄弹窗防压扁
zs-select-dialog 开启 building-table-mode 后共享 BuildingTable 在右侧宽度不足时楼层/单元标签与户室格被 flex 压缩。

## 现象
- 公共设施维护「选择房屋」弹窗内，BuildingTable 楼层/单元标签与户室格被 flex 压缩：单元名竖排、格子过窄
- 用户反馈弹框「就这么点点大的框」

## 解决方案
- .floor-label、.unit-label、.unit-rooms 设 flex-shrink:0；.unit-label white-space:nowrap；.room-cell min-width
- 表头与 .floor-row flex-wrap:nowrap
- 宿主 RangeTable 侧包 .building-table-wrapper 横向滚动、cell-width="120"，避免继续压缩格子适配宽表

## 验证与归属
- 改动 BuildingTable.vue 防压扁 + RangeTable building-table-mode 与横向滚动容器
- 涉及文件：zhi2-web-admin/src/views/components/BuildingTable.vue、zhi2-web-admin/src/views/maintenance/facility/components/RangeTable.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue
- 所属项目：园区公共收益；来源会话ID：f5c910bd-d8dd-4878-952a-b6286f9f507f；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "building_table_flex",
  "source_extraction_id": "6118528a4b464171955db25f75310ed3",
  "version": 1,
  "memory_type": "entities"
}
-->