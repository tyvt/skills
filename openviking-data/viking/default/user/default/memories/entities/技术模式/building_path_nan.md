# 园区路径分号切分误用空格致NaN
园区物管2.0 统计地图（statisticsMap）中 `getBuildingPaths` 对分号分隔的园区路径误用 `split(' ')` 切分，导致首点解析为 `LatLng(NaN, 120.311972)` 并触发腾讯地图异常。

## 问题根因
- `zhi2-web-admin/src/views/benefit/statisticsMap/components/map.vue` 中 `getBuildingPaths` 对分号分隔的园区路径误用 `split(' ')` 切分
- 首点被解析为 `LatLng(NaN, 120.311972)`，触发腾讯地图异常

## 解决方案
- 新增 `createSafeLatLng` 校验非法值（NaN 等）并返回 null
- 改 `getBuildingPaths` 按 `;` 与 `,` 切分并逐点校验
- `initMap`、`updateCenter`、`nameLocation` 均走安全构造以兼容脏数据

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/081.md
- 涉及文件：statisticsMap/components/map.vue、src/constant/map.js、statisticsMap/index.vue
- 来源会话：4ba54bd2-24d5-4b33-92bc-49f3cc906331；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_path_nan",
  "source_extraction_id": "36adc3f9f252485a8b7cdd7530b6990f",
  "version": 1,
  "memory_type": "entities"
}
-->