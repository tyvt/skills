# 搜索失败未复位isSearchMode致样式错乱
园区物管2.0 统计地图中 handleSearch 过早设 isSearchMode=true，搜索失败未恢复致地图样式错乱。

## 问题根因
- handleSearch 在接口返回前过早设置 isSearchMode=true
- mapMarkerMode 在搜索模式下固定使用 project 样式
- 接口失败或异常时未恢复 isSearchMode，导致行政区划图层样式错乱

## 解决方案
- 仅当搜索成功且有数据时设置 isSearchMode=true
- 失败或异常调用 restoreAreaLayerAfterSearchFail() 重置 false 并重载 loadAreaComplexLayer 行政区划图层

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证证据：src=园区物管2.0/047.md
- 涉及文件：benefit/statisticsMap/index.vue
- 所属项目：园区物管2.0；来源会话：a3789a5a-09f2-4f9a-8236-5d37e21277d1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_mode_reset_bug",
  "source_extraction_id": "8113bd74d4ec46b1b7e66b0d382dcb64",
  "version": 1,
  "memory_type": "entities"
}
-->