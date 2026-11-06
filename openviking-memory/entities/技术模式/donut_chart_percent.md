# 饼图占比统一走 ECharts p.percent
园区物管2.0 资产全景饼图 label 与 tooltip 的比例统一使用 ECharts 计算的 `p.percent`。

## 改动摘要
- `getDonutSlicePercent` 去掉从 `card.donutData` 读取 `ratio` 的逻辑，只保留 `Math.round(p.percent)`
- `parseAssetCategories` 不再解析、写入接口字段 `ratio`
- 调用处 tooltip 与 label 的 formatter 改为 `getDonutSlicePercent(p)`

## 注意事项
- `count === 0` 的扇区仍用占位值 `1` 参与绘图，ECharts 算出的占比与真实数量占比不一致
- 若需与接口一致，需恢复接口 `ratio` 或让为 0 的项不参与 series 计算

## 涉及文件与归属
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：e98b3c2b-020e-45a5-bbab-7177966aefbc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "donut_chart_percent",
  "source_extraction_id": "cc4acf3026944bc4a35a55640ad46ac4",
  "version": 1,
  "memory_type": "entities"
}
-->