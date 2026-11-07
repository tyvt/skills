# ECharts 双轴图表轴名竖排中段
园区物管2.0 Web 端 ECharts 线柱混合图左右双 Y 轴显示单位且与图例争位时，用 nameLocation:'middle' 竖排到轴中段避免遮挡。

## 问题根因
- 默认 nameLocation='end' 把轴名画在轴顶，与 legend 的 top 区域天然重叠；加大 grid.top 浪费图表高度

## 解决方案
- 左轴 nameLocation:'middle' + nameRotate:90，右轴 nameRotate:-90；顶部只保留图例（legend top:6、left/right:8，grid.top 38）
- 给 tooltip 加 confine:true 让提示框画在图表区内；竖排文字离图太近时加大 nameGap 或 grid.left/right

## 验证与归属
- 验证：会话 4e63d96f 给出完整配置（nameLocation middle、grid.top 38、legend top 6、tooltip confine true）
- 涉及文件：benefit/dataSandbox/fundPanorama/index.vue；所属项目：园区物管2.0；代码基线：f00310232
- 复用：zhi2-web-admin 房产监测页 CumulativePanel.vue 的 buildUsageOption 与 unsoldOption 采用相同方案（双轴单位 nameLocation:'middle' + nameRotate:±90 + nameGap:34，legend 改 left:8/top:4 单行不换行，grid.top 34、bottom 30-36），解决单位与 legend 遮挡、X 轴 label 裁切；来源会话：2026-11-04

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_axis_mid",
  "source_extraction_id": "c0ad0a9d312d40b6a54ce9d51b9c054a",
  "version": 2,
  "memory_type": "entities"
}
-->