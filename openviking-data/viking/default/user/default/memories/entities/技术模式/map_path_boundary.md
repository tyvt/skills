# 将 map.js 的 path 替换为简化的官方边界
常规多边形区域不遵循真实轮廓；使用行政区划官方来源 320214 并进行保形简化（580 个点缩减为 74 个），并替换 map.js 中的多边形点字符串。

## 背景
- 规则多边形不符合行政区划的真实轮廓
- 行政区划官方来源 320214 提供边界坐标

## 解决方案
- 在官方边界上应用保形简化（580 个点降至 74 个点）
- 将 `map.js` 的 `path` 替换为官方边界多边形的点字符串

## 文件与来源
- 涉及文件: src/views/benefit/statisticsMap/components/map.vue, src/components/ZsTencentMap/index.vue, src/components/ZsTencentMap/mapLoader.js, src/views/benefit/statisticsMap/operatingAssets.vue, src/views/benefit/statisticsMap/mockApi.js, src/views/benefit/statisticsMap/mock.js, src/views/benefit/statisticsMap/components/ParkingAssetDialog.vue, src/views/benefit/statisticsMap/components/VenueAssetDialog.vue
- 所属项目: 产品2.0; 会话: 95e2008d-fb62-4d82-a1ce-c691d8ecfd29; base: none; 验证证据: 产品2.0/030.md

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：95e2008d-fb62-4d82-a1ce-c691d8ecfd29


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_path_boundary",
  "source_extraction_id": "4d80bcc2a01b4c9daeb3c9c060bc1073",
  "version": 1,
  "memory_type": "entities"
}
-->
