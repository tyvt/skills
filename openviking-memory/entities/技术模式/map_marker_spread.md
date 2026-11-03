# 地图打点两类坐标问题分流
统计地图按街道打点时，气泡数量少于街道数或点位完全重合，需分两类根因处理。

## 现象与根因
- 一类是接口返回 xcoordinate/ycoordinate 为 null（如羊尖、鹅湖等镇），null 点渲染异常或聚在原点，须前端逐级过滤。
- 另一类是接口给多个街道返回完全相同经纬度（数据质量问题，如两组重复坐标 120.4743,31.60915 / 120.53899,31.70204），坐标合法但不能叠加，前端只能视觉错开。

## 解决方案
- 先按空值过滤掉 null 坐标点。
- 实现 spreadOverlappingMarkers：相同坐标 marker 按小圆环错开；2 个重合时左右各偏移约 450m（偏移量常数 OVERLAP_SPREAD_RADIUS_DEG≈0.004，嫌挤可调 0.006），3 个及以上均匀分布在圆周。
- 结论中向用户明确：根本解法是后端为每个街道返回独立中心点坐标，前端错开只是兜底。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、components/map.vue
- 所属项目：园区物管2.0；来源会话：d5708d08-435c-462f-8076-056d4fde5c7a；代码基线：040.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_marker_spread",
  "source_extraction_id": "7aa21506fd5c4a07951cf74c630599a1",
  "version": 1,
  "memory_type": "entities"
}
-->