# 资金余额整数显示且保留柱高精度
园区物管2.0 资金余额改为整数显示，但与资金收支图表保持一致，且柱高按原始精度绘制。

## 问题背景
- 「资金余额」原先使用 formatWanValue 显示小数，为与资金收支图表一致需改为整数显示。

## 解决方案
- chartOptions.js 中柱顶标签及 tooltip 由 formatWanValue 改为 formatWanIntegerValue。
- index.vue 新增 wanInt 格式，仅对余额取整显示，底层数值未改动。
- 柱高按原始精度（未取整数值）绘制，避免视觉失真。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/mapOverview/index.vue、dataHelpers.js、chartOptions.js
- 所属项目：园区物管2.0；来源会话：fbe088ea-8487-4ab9-a6e1-cc180b6a6a04；代码基线：040.md

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "balance_wan_integer",
  "source_extraction_id": "07a3250ce4124e9d9656ace09511a2c2",
  "version": 1,
  "memory_type": "entities"
}
-->