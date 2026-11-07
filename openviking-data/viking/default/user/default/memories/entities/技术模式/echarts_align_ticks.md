# ECharts 双轴刻度对齐警告修复
园区物管2.0 资金收入/支出趋势图因双 Y 轴 alignTicks 导致刻度不可读警告，已通过独立计算轴范围修复。

## 问题根因
- 资金收入/支出趋势图为双 Y 轴（份数 vs 万元）且开启 alignTicks: true
- 左右轴 yMax 相差很大（如 2000 与 300）时，ECharts 强行对齐刻度算出难读小数刻度并触发 `[ECharts] The ticks may be not readable` 警告

## 解决方案
- 去掉两个 Y 轴上的 alignTicks: true
- 新增 computeTrendAxisScale，分别为左右轴计算整齐的 min/max/interval
- 左侧份数轴用整数步长，右侧万元轴用 1/2/5/10 等友好步长
- 单位标签对齐逻辑改用计算后的 countScale.max、fundScale.max

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 典型结果：收入图左轴 0–2000（步长400）右轴 0–300（步长60）；支出图左轴 0–600（步长120）右轴 0–80（步长20）
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、mock.js
- 所属项目：园区物管2.0；来源会话：7ed0f29d-3da8-4470-918b-f0872f9b6a9f；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_align_ticks",
  "source_extraction_id": "2aa8b6d1567c447481ec957b1d181c1d",
  "version": 1,
  "memory_type": "entities"
}
-->