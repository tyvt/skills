# 经营资产「百个」单位小数位修复（ECharts Y轴刻度小数位失控）
园区物管2.0 地图概览页经营资产「百个」单位小数位显示三位，应显示两位，已修复；该问题揭示 ECharts 多通道展示同一指标时必须复用同一格式化函数并约束 Y 轴 interval 的通用套路。

## 问题根因
- 柱状图标签和 tooltip 已限制最多 2 位小数，但 Y 轴刻度未做格式化（series label 和 tooltip 格式化管不到 axisLabel）。
- 数据较小时（如 0.01～0.02 百个），ECharts 的 interval 由数据范围自动计算，会算出 0.004 这类三位小数并默认显示三位。

## 解决方案
- dataHelpers.js 新增统一 formatHundredValue；formatHundredCount（地图轮播提示中的经营资产）也复用该函数，避免口径漂移。
- chartOptions.js 经营资产图表新增 computeHundredCountYAxis，Y 轴刻度间隔最小为 0.01；Y 轴 axisLabel 使用 formatHundredValue 格式化；柱顶标签、tooltip 统一使用同一格式化函数。
- 通用套路：ECharts 图表多处展示同一指标时（图表 + 地图轮播提示），三条通道（axisLabel、柱顶 label、tooltip）必须复用同一格式化函数，并给 Y 轴刻度间隔设最小值防止极小数据产生超长小数。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0；验证：刷新地图概览页后，Y 轴刻度、柱顶数值和 tooltip 均最多显示两位小数。
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/dataHelpers.js、chartOptions.js、index.vue
- 所属项目：园区物管2.0；来源会话：cbc563ef-17dc-4a57-9a8a-a924dda959a7；代码基线：3965548b6；验证证据：src=园区物管2.0/043.md

<!-- MEMORY_FIELDS
{
  "category": "缺陷",
  "name": "mapoverview_hundred_decimal",
  "source_extraction_id": "76d89241e51c4a01a1ce662f68beef9e",
  "version": 3,
  "memory_type": "entities"
}
-->