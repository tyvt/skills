# operatingAssets 统计区仅用后端 assetStatsMap
operatingAssets.vue 删除 statsConfig() 兜底，统计区仅使用后端返回 statistics.assetStatsMap，缺失时显示为空且不报错。
## 变更内容
- 已删除 statsConfig() 及相关兜底逻辑
- 统计区只使用后端返回 `statistics.assetStatsMap`
- 当 assetStatsMap 缺失/为 null/非对象/为空时，`resolvedStatsConfig` 与 `statsItems` 均返回 `[]`，页面不报错、统计区为空
- 已检查 lint 无报错
## 验证与归属
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue、src/views/benefit/pubVenue/components/venueTable.vue、src/views/benefit/pubParkingSpace/components/parkingTable.vue
- 所属项目：repository；来源会话：8764d18a-96ce-41bc-b2fc-650ff71a2d75；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operatingassets_stats_map",
  "source_extraction_id": "21fd6d90a3ef4a549ff47a78e0a03a47",
  "version": 1,
  "memory_type": "entities"
}
-->