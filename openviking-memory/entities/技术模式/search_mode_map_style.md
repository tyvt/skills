# 搜索失败地图样式错乱修复
园区物管2.0 地图搜索因过早设置 isSearchMode 导致失败时无结果样式错乱，已加失败回滚修复。

## 问题根因
- handleSearch 里过早设置 isSearchMode = true，而 mapMarkerMode 在搜索模式下固定用物业管理区域样式（project）
- 接口失败或无结果时 isSearchMode 未恢复，地图样式错乱

## 解决方案
- 只在搜索成功且有数据时才设置 isSearchMode = true
- 搜索失败/无结果/异常时调用 restoreAreaLayerAfterSearchFail()：重置 isSearchMode = false 并重新加载行政区划图层 loadAreaComplexLayer
- 失败后回到行政区划气泡样式并重新展示区县级数据

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/index.vue
- 所属项目：园区物管2.0；来源会话：a3789a5a-09f2-4f9a-8236-5d37e21277d1；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_mode_map_style",
  "source_extraction_id": "2aa8b6d1567c447481ec957b1d181c1d",
  "version": 1,
  "memory_type": "entities"
}
-->