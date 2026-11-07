# 腾讯 GL 地图点位不显示根因与排查
园区物管2.0 腾讯位置服务 GL 地图（MultiMarker/MultiLabel）点位不显示的四类根因与排查套路。

## 问题背景
- 点位不显示或部分不显示，控制台报「Map中已存在id为area_bubble_0的图层」或「所传入参数并非TMap.Map实例」。

## 根因与解法
- 根因1：多个 MultiMarker 几何 id 写死导致冲突；解法：几何/图层 id 按索引唯一化（project_marker_geom_${index}）。
- 根因2：坐标字段含 mapXCoordinate/mapYCoordinate 未参与解析；解法：归一化函数对经纬度做该兜底。
- 根因3：下钻后地图仍停街道气泡中心，小区点在视野外；解法：第三层下钻按所有点范围算中心与缩放。
- 根因4：搜索只传 projectName 后端只认 complexName；解法：搜索参数双传兼容。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：normalizeProjectList 加字段兜底、applyCommunityLayerView 视野拟合、MultiMarker id 索引化、双参搜索。
- 涉及文件：benefit/statisticsMap/index.vue、benefit/statisticsMap/components/map.vue。
- 所属项目：园区物管2.0；来源会话 7936e37a-fa3a-4556-86bf-1afaf2c6a29e；代码基线 f00310232。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "腾讯GL地图点位不显示",
  "source_extraction_id": "2079698ec51f42c99af5e0a35fcac0da",
  "version": 1,
  "memory_type": "entities"
}
-->