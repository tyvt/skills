# ECharts Geo+SVG 轮播高亮套路
园区物管2.0 地图大屏用 ECharts geo + registerMap 注册 SVG 底图，轮播切换区域时需同步高亮对应区，与 hover emphasis 效果一致。

## 问题根因
- 轮播是程序驱动状态变化，dispatchAction hover 类事件在 SVG geo 上不稳且会被下次交互打断
- 一个行政区可能对应多个 path（如江阴市主体+飞地），飞地不显示标签也需加高亮否则只盖住主体

## 解决方案
- 抽常量 WUXI_GEO_HIGHLIGHT_ITEM_STYLE 与 geo.emphasis.itemStyle 完全相同保证高亮色一致
- 写 buildMapGeoCarouselRegions(highlightName) 生成 regions 数组：「全市」只保留飞地 path 静默配置、其它区恢复默认底色；轮到某区追加高亮 regions 项
- 用 chart.setOption({ geo: { regions } }) 增量更新
- 三处触发点：watch 轮播索引（$nextTick 更新）、轮播重置回第0张（手动同步）、initMap 首帧 setOption 后调一次
- 「全市」汇总幻灯片用独立字段标记汇总页，避免硬编码文案判断

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 89d6d616-b337-43c4-bc8d-a3268340e46f 中 mapOverview/index.vue 轮播到某区 SVG 对应区高亮，用 setOption+三处触发点+飞地同步实现
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话ID：89d6d616-b337-43c4-bc8d-a3268340e46f；代码基线：fb0e2899f / 3353ef164

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_geo_regions",
  "source_extraction_id": "8e90ed7f7e304631b0c6fbdcf7cbe027",
  "version": 1,
  "memory_type": "entities"
}
-->