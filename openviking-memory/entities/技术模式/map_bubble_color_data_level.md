# 地图气泡配色绑定数据层级
园区物管2.0 地图下钻/上钻时气泡颜色错乱，根因是配色绑定缩放目标层级而非数据层级。

## 问题根因
- 层级状态（overviewLayerLevel）在缩放瞬间就变，而气泡数据 markList 要等接口返回才更新，两状态不同步
- 派生的配色提前于数据，出现「街道气泡变蓝」等颜色错乱

## 解决方案
- 为数据驱动的外观单独建与数据同源的层级标记 markListLayerLevel，只在 markList 真正更新时同步修改，不绑定缩放目标层级
- 配色 computed 读它（如 areaDrillStack 有下钻一律 green，否则按 markListLayerLevel 决定 blue/green）
- 接口返回前保持上一级配色，返回后再切换

## 套路
- 地图/图表的视觉状态永远跟数据走，不跟触发动作的意图走

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue
- 所属项目：园区物管2.0；来源会话：7f4f3f1b-a0fd-4692-88cc-921192593ee3；代码基线：49e7729ce

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_bubble_color_data_level",
  "source_extraction_id": "28000d8f11724e7d8c4f29352de82f49",
  "version": 1,
  "memory_type": "entities"
}
-->