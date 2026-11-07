# 统计地图街道级接口参数区分滚动与下钻
园区物管2.0 statisticsMap 的 `getAreaQueryParams` 需区分滚轮放大与点击下钻的街道级取数维度。

## 参数对照
- 滚轮放大到街道总览（`overviewLayerLevel === 'street'` 未点击下钻）：`regionCode` 用市级 `platformRegionCode`，`dimension` 为 3
- 点击区县下钻（`areaDrillStack` 含区县）：`regionCode` 用点击区县编码 `getRegionCode()`，`dimension` 为 2
- 区县级总览：`regionCode` 用市级 `platformRegionCode`，`dimension` 为 1

## 问题背景
- 原先滚轮放大到街道层会把 `dimension` 设为 2，与「滚动用 3、点击用 2」不一致
- 现已改为滚轮街道层单独走 `dimension: 3` + 市级 `regionCode`，点击下钻仍用 `getRegionCode()` + `dimension: 2`

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 b54c0d36 用户要求滚动放大街道级参数改为 regionCode 市级、dimension 3
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0；来源会话：b54c0d36-213e-49e1-97a6-50af9ae3922e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_street_dimension",
  "source_extraction_id": "36c9965ef43747f1beeac292278e36f5",
  "version": 1,
  "memory_type": "entities"
}
-->