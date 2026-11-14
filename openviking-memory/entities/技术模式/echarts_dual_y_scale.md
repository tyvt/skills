# 双 Y 轴量纲悬殊去掉 alignTicks
园区物管2.0 双 Y 轴趋势图（份数 vs 万元）开启 alignTicks:true 后报刻度不可读警告。

## 问题根因
- 左右轴量纲相差很大（如 2000 vs 300）时，alignTicks 强行对齐刻度，在手工指定的 min/max 上会算出非整数、不可读的刻度
- 控制台报 [ECharts] The ticks may be not readable when set min: 0, max: 300 and alignTicks: true
- 双 Y 轴趋势图开启 alignTicks:true 且左右 yMax 差异大时，ECharts 强行对齐产生难读小数刻度触发警告

## 解决方案
- 去掉双轴的 alignTicks:true，改为分别为左右轴计算整齐的 min/max/interval
- 左轴整数步长，右轴用 1/2/5/10 系友好步长
- 新增 computeTrendAxisScale 分别算两轴 min/max/interval（如左 0–2000 步长400/右 0–300 步长60）
- 单位标签改用 countScale.max 与 fundScale.max（即计算后的两轴 max）

## 套路
- 双 Y 轴不同量纲时不要依赖 alignTicks 自动对齐，自己按友好步长算刻度既消除警告又保证可读

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：园区物管2.0/047.md
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/mock.js
- 典型结果：收入图左轴 0–2000（步长400）右轴 0–300（步长60）；支出图左轴 0–600（步长120）右轴 0–80（步长20）
- 所属项目：园区物管2.0；来源会话：7ed0f29d-3da8-4470-918b-f0872f9b6a9f；代码基线：c97957703

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_dual_y_scale",
  "source_extraction_id": "831d3fafc2784244ba1296acd85f732b",
  "version": 3,
  "memory_type": "entities"
}
-->