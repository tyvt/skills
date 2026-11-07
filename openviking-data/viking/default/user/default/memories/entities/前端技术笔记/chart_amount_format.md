# 图表金额格式化误用取整丢失小数
园区物管2.0 的地图/统计大屏图表误用取整格式化函数，导致 0.几万元显示为 0，数据看似「未展示」。

## 现象
- 地图/统计大屏的资金余额、资金收支图表里，某区有 0.22 万元小数数据但页面显示为 0（宜兴市 fundBalance=0.22 未展示）。
- 数据丢失表现为「没展示」而非报错，容易误判为接口或地图区域匹配问题。

## 根因
- 图表配置（图例总额、柱顶数值标签、Tooltip、Y 轴刻度）多处调用 formatWanIntegerValue 这类「四舍五入取整」函数，0.几万被取整成 0。

## 解决方案
- 金额/占比类图表格式化一律用保留小数的 formatWanValue（最多两位小数），取整函数只用于确定是整数计数的场景。
- 四处展示点（图例、标签、tooltip、轴刻度）必须同步换，漏一处会出现同一数值不同显示。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js（buildFundIncomeExpenseOption）。
- 所属项目：园区物管2.0；来源会话：dd77c94d-98a5-4f59-b393-fb5a4f521aff；代码基线：f101dd464。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "chart_amount_format",
  "source_extraction_id": "f614d32fd9654c25aca3ddc2036cbb52",
  "version": 1,
  "memory_type": "entities"
}
-->
