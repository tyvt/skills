# 资金收支合并图数值格式化修复
园区物管2.0 的 benefit/mapOverview 资金收支合并柱状图修复了数值被四舍五入取整导致 0.22 显示为 0 的问题。

## 问题根因
- chartOptions.js 中 buildFundIncomeExpenseOption 多处使用 formatWanIntegerValue（四舍五入取整）
- 导致 0.22 这类数值会显示为 0

## 解决方案
- 图例总额（入账/支出）、柱顶数值标签、Tooltip、Y 轴刻度均改用 formatWanValue
- formatWanValue 最多保留两位小数

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js、index.vue、dataHelpers.js
- 所属项目：园区物管2.0；来源会话：dd77c94d-98a5-4f59-b393-fb5a4f521aff；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_chart_fix",
  "source_extraction_id": "36621e6addfb4001a7f9fe8c070ff065",
  "version": 1,
  "memory_type": "entities"
}
-->