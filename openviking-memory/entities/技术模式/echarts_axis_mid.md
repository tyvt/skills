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

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_axis_mid",
  "source_extraction_id": "080e089d30224d56846c26374eea4472",
  "version": 1,
  "memory_type": "entities"
}
-->