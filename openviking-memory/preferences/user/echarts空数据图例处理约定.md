- 无有效数据时，ECharts 图例仅展示 value>0 的分类，避免出现全部子分类但 series.data 为空导致的报错（series not exists. Legend data should be same with series name or data name.）
- 当无任何有效数据（value 全为 0 或无数据）时，隐藏图例并显示「暂无数据」占位
- 适用范围：benefit/dataSandbox/assetPanorama、fundPanorama 等数据沙盘图表

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "ECharts空数据图例处理约定",
  "source_extraction_id": "236e0ad1f0424f45996c7c5522b4f29a",
  "version": 1,
  "memory_type": "preferences"
}
-->