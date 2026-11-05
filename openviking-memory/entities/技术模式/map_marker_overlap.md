# 地图重叠标注错开显示
园区物管2.0 的统计地图页新增 spreadOverlappingMarkers 处理相同坐标的气泡重叠问题。

## 问题根因
- 坐标为 null 的条目（羊尖、鹅湖等 5 条）已过滤，不显示在地图上
- 接口返回相同经纬度（数据问题）导致叠加，如安镇街道、云林街道同坐标 120.4743,31.60915
- 东北塘街道、厚桥街道同坐标 120.53899,31.70204，叠成 2 个气泡而非独立点

## 解决方案
- 增加 spreadOverlappingMarkers：2 个重合左右各偏移约 450m；3 个及以上均匀分布在圆周
- 按示例数据地图显示 6 个气泡（4 组独立 + 2 对错开）
- 可调大 OVERLAP_SPREAD_RADIUS_DEG（当前 0.004）至 0.006 加大间距
- 根本解决需后端为每个街道返回独立中心点坐标

## 验证与归属
- 涉及文件：src/views/benefit/statisticsMap/index.vue、statisticsMap/components/map.vue
- 所属项目：园区物管2.0；来源会话：d5708d08-435c-462f-8076-056d4fde5c7a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_marker_overlap",
  "source_extraction_id": "007d9a4c5d48457c8a0e1e4cd477c61c",
  "version": 1,
  "memory_type": "entities"
}
-->