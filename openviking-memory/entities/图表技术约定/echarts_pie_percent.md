# ECharts 饼图占比约定
数据沙盘饼图 label/tooltip 的占比统一读取 p.percent，不再解析接口 ratio 字段。

## 背景
- 数据沙盘饼图占比曾在「走接口 ratio 字段」与「走 ECharts 自算 percent」之间切换
- ECharts 的 p.percent 按 series 内所有数据项的 value 计算占比

## 关键事实
- 本项目对 count===0 的扇区仍塞占位值 1 参与绘图，假值计入分母，导致 percent 与真实数量占比不一致
- getDonutSlicePercent 内只 Math.round(p.percent)，占比展示与绘图口径天然一致
- 排查「饼图百分比对不上」时先查是否有占位 value 混入 series

## 关联
- 涉及文件：src/views/benefit/dataSandbox/assetPanorama/index.vue
- 所属项目：园区物管2.0（zhi2-web-admin，基线 6a4835a08）
- 来源会话：e98b3c2b-020e-45a5-bbab-7177966aefbc

<!-- MEMORY_FIELDS
{
  "category": "图表技术约定",
  "name": "echarts_pie_percent",
  "source_extraction_id": "c2bae86dadf94c5dbe29e2855b2b27c1",
  "version": 1,
  "memory_type": "entities"
}
-->