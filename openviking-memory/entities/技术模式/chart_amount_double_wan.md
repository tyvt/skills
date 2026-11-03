# 资金全景分类图金额二次÷10000导致柱形不显示
园区物管2.0 资金全景页分类金额图因 parseCategoryAmount 对已是万元的接口数据再次 ÷10000，金额被缩小一万倍，柱形几乎不可见。

## 问题根因
- 数据清洗函数 parseCategoryAmount 对接口已以「万元」返回的 categoryAmount 又执行 yuanToWan（÷10000），二次缩小一万倍
- 同模块 regionBalance 用 toChartWanAmount 直接按万元取值，故只有余额图正常、分类图异常
- 同类图表取数路径不一致是典型信号

## 解决方案
- 同页面多个图表统一走同一金额换算入口 toChartWanAmount，先确认接口返回单位再决定是否换算
- 禁止在各 parse 函数里单独做 ÷10000
- 图表 Y 轴上限用 Math.ceil(maxVal * 1.12) 自适应小金额（如最大 0.22 万时上限约 1）
- 对接新图表接口时先看一条原始返回样例确认单位

## 验证与归属
- 验证：regionBalance 返回 0.22 正常而 categoryAmount 图为空，根因是 parseCategoryAmount 多做一次 yuanToWan，改用 toChartWanAmount 后修复
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/dataHelpers.js
- 所属项目：园区物管2.0；代码基线：5a288f142；来源会话：028698e5-6e86-4303-861e-cf865cc0fb59

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "chart_amount_double_wan",
  "source_extraction_id": "f46e17a1f6c54021ae5abeaef8eabd8f",
  "version": 1,
  "memory_type": "entities"
}
-->