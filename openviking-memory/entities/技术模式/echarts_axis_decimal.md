# ECharts Y轴刻度小数位失控
园区物管2.0 中 ECharts 图表 Y 轴刻度出现三位小数时，必须单独格式化 axisLabel 并约束最小 interval。

## 问题根因
- 经营资产图表柱顶标签、tooltip 已限 2 位小数，但 Y 轴刻度仍出现 0.004 这类三位小数。
- ECharts 的 interval 由数据范围自动计算，数据很小时（如 0.01~0.02 百个）刻度间隔会算出三位小数；只在 series label 和 tooltip 上做格式化管不到 axisLabel。

## 解决方案
- 把数值格式化收敛成统一函数（如 formatHundredValue），Y 轴 axisLabel、柱顶 label、tooltip 三条通道全部复用同一函数，不各写一份。
- 给 Y 轴刻度间隔设最小值（如 interval 最小 0.01）防止极小数据产生超长小数。
- 多处展示同一指标时（图表 + 地图轮播提示）必须复用同一格式化函数，避免口径漂移。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：mapOverview 会话最终结论新增 computeHundredCountYAxis（Y 轴刻度间隔最小 0.01）、axisLabel 用 formatHundredValue，柱顶标签/tooltip 统一同一函数，formatHundredCount 也复用它。
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/dataHelpers.js、chartOptions.js、index.vue；所属项目：园区物管2.0；来源会话：cbc563ef-17dc-4a57-9a8a-a924dda959a7；代码基线：3965548b6；验证证据：src=园区物管2.0/043.md。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_axis_decimal",
  "source_extraction_id": "064aa8abd4864c4c910fd19e1e0dd59b",
  "version": 2,
  "memory_type": "entities"
}
-->