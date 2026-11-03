# 滚轮街道层须传市级码与维度3
园区物管2.0 资产统计地图 `getAreaQueryParams` 中滚轮放大至街道总览须用市级编码与 `dimension:3`，点击下钻用区县编码与 `dimension:2`。

## 问题根因
- 滚轮放大至街道总览（`overviewLayerLevel === 'street'`）原误设 `dimension` 为 2，与点击下钻混淆
- 两类请求维度混用导致区域数据错误

## 解决方案
- 滚轮街道总览：用市级 `platformRegionCode` 与 `dimension: 3`
- 点击下钻：经 `getRegionCode()` 取区县编码且 `dimension: 2`

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue、zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue
- 所属项目：园区物管2.0；来源会话：b54c0d36-213e-49e1-97a6-50af9ae3922e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "street_layer_dim3",
  "source_extraction_id": "f03398b51ded4ce1afcdcc21da6e622c",
  "version": 1,
  "memory_type": "entities"
}
-->