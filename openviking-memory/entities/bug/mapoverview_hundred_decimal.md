# 经营资产「百个」单位小数位修复
园区物管2.0 地图概览页经营资产「百个」单位小数位显示三位，应显示两位，已修复。

## 根因分析
- 柱状图标签和 tooltip 已限制最多 2 位小数，但 Y 轴刻度未做格式化。
- 数据较小时（如 0.01～0.02 百个），interval 会算出 0.004 这类值，ECharts 默认显示三位小数。

## 修复内容
- dataHelpers.js 新增统一 formatHundredValue；formatHundredCount（地图轮播提示中的经营资产）也复用该函数。
- chartOptions.js 经营资产图表新增 computeHundredCountYAxis，Y 轴刻度间隔最小为 0.01；Y 轴 axisLabel 使用 formatHundredValue 格式化；柱顶标签、tooltip 统一使用同一格式化函数。

## 验证与归属
- 验证：刷新地图概览页后，Y 轴刻度、柱顶数值和 tooltip 均最多显示两位小数。
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/dataHelpers.js、chartOptions.js、index.vue
- 所属项目：园区物管2.0；来源会话：cbc563ef-17dc-4a57-9a8a-a924dda959a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "mapoverview_hundred_decimal",
  "source_extraction_id": "2074bf66f64b451aa5c966c53659c840",
  "version": 1,
  "memory_type": "entities"
}
-->