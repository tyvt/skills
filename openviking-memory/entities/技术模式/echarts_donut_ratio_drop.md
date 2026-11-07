# 饼图比例弃用接口ratio仅取ECharts计算值
园区物管2.0 资产全景饼图改造中 getDonutSlicePercent 仅用 ECharts percent，弃用接口 ratio 字段。

## 问题根因
- getDonutSlicePercent 移除 card.donutData 的 ratio 读取，仅保留 Math.round(p.percent)
- parseAssetCategories 不再解析写入接口字段 ratio
- tooltip 与 label 的 formatter 调用 getDonutSlicePercent(p)

## 已知缺陷
- count===0 扇区以占位值 1 绘图时 ECharts 占比偏离真实数量
- 需一致须恢复 ratio 或剔除 0 项出 series

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证证据：src=园区物管2.0/053.md
- 涉及文件：benefit/dataSandbox/assetPanorama/index.vue
- 所属项目：园区物管2.0；来源会话：e98b3c2b-020e-45a5-bbab-7177966aefbc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_donut_ratio_drop",
  "source_extraction_id": "8113bd74d4ec46b1b7e66b0d382dcb64",
  "version": 1,
  "memory_type": "entities"
}
-->