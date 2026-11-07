# 饼图占比统一走 ECharts 计算
园区物管2.0 资产全景饼图 label 与 tooltip 占比统一仅使用 ECharts 的 `p.percent`。

## 修改内容
- `getDonutSlicePercent` 去掉从 `card.donutData` 读 `ratio` 逻辑，仅保留 `Math.round(p.percent)`
- `parseAssetCategories` 不再解析、写入接口字段 `ratio`
- 调用处 tooltip 与 label 的 formatter 改为 `getDonutSlicePercent(p)`

## 遗留说明
- `count === 0` 扇区仍用占位值 `1` 参与绘图，ECharts 占比与真实数量占比不一致
- 若需与接口一致，恢复接口 `ratio` 或对为 0 项不参与 series 计算

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：e98b3c2b-020e-45a5-bbab-7177966aefbc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "donut_percent_echarts",
  "source_extraction_id": "c518d16edcc64eb0894003e93bc52572",
  "version": 1,
  "memory_type": "entities"
}
-->