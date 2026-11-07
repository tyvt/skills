# 地图弹窗轮播SVG高亮对应区
园区物管2.0 地图概览页轮播到某区时，ECharts geo 注册的 SVG 对应区需高亮。

## 实现要点
- 地图使用 ECharts `geo` + SVG 注册图，区名来自 `injectWuxiSvgRegionNames` 给 path 打的 `name`
- 轮播当前项在 `mapCarouselCurrent`，名称与 SVG 区名一致（如 `惠山区`、`江阴市`）
- 高亮样式 `WUXI_GEO_HIGHLIGHT_ITEM_STYLE` 与原 `geo.emphasis.itemStyle` 相同，保证轮播与悬停色一致
- `buildMapGeoCarouselRegions(highlightName)`：全市时仅保留江阴飞地静默配置；某一区时追加 regions 高亮+加粗标签
- 江阴市两块 path（主体+飞地）均加高亮 itemStyle，飞地不显示标签
- `updateMapGeoCarouselHighlight()` 通过 `chart.setOption({ geo: { regions: ... } })` 更新

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/views/benefit/mapOverview/index.vue、mock.js
- 所属项目：园区物管2.0；来源会话ID：89d6d616-b337-43c4-bc8d-a3268340e46f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "map_carousel_svg_highlight",
  "source_extraction_id": "fb80bfca03ac4c659cad7642f8b60177",
  "version": 1,
  "memory_type": "entities"
}
-->