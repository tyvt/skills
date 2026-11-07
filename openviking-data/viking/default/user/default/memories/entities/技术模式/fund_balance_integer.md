# 资金余额整数显示
园区物管2.0 的地图总览页将「资金余额」改为整数展示，与「资金收支」图表一致。

## 修改内容
- 右侧「资金余额」柱状图（chartOptions.js）：柱顶标签与 tooltip 由 formatWanValue 改为 formatWanIntegerValue，如 535.73 显示 536
- 地图轮播提示（index.vue）新增 wanInt 格式，仅对资金余额取整
- 资金收入、资金支出仍保留两位小数

## 注意事项
- 底层数值未改动，仅影响展示格式
- 图表柱高仍按原始精度绘制

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：src/views/benefit/mapOverview/index.vue、dataHelpers.js、chartOptions.js
- 所属项目：园区物管2.0；来源会话：fbe088ea-8487-4ab9-a6e1-cc180b6a6a04；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_balance_integer",
  "source_extraction_id": "007d9a4c5d48457c8a0e1e4cd477c61c",
  "version": 1,
  "memory_type": "entities"
}
-->