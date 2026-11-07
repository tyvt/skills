# 地图行政区文字重影修复
园区物管2.0 修复统计地图中苏州市等行政区文字重影问题。

## 问题根因
- `doMapPolygon` 用 `TMap.MultiLabel` 在行政区中心画名称（如「苏州市」），矢量底图默认还会画 POI 文字（`point`），市中心叠加两套字造成重影。
- `styles` 仅定义键 `label`，但 `geometries` 使用不存在的 `styleId: 'area_label_style' + uid`，渲染异常。

## 解决方案
- `initMap` 为矢量底图增加 `baseMap` 并去掉 `point`，保留 `base`、`road`、`building`、`label`，避免与行政区中心自定义标签重复。
- 修正行政区 `MultiLabel` 的 `styleId` 为 `'label'`。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue、src/components/ZsTencentMap/mapLoader.js
- 所属项目：园区物管2.0；来源会话：f3c5b382-87a4-49cf-9a4e-27efde2b94d2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "map_label_ghosting_fix",
  "source_extraction_id": "33c6d2042a9d403098535653cf9a2ce6",
  "version": 1,
  "memory_type": "entities"
}
-->