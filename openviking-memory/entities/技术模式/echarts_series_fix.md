# ECharts series 为 undefined 导致渲染崩溃修复
产品2.0 中图表组件存在 `setOption` 传入 `undefined` 的写法，导致 ECharts 渲染时访问 `series.type` 崩溃（`LineView.js:567 Uncaught ... reading 'type'`）。

## 问题根因
- 图表组件 props 默认值写成 `default: () => {}`，实际返回 `undefined`，随后 `myChart.setOption(undefined)`。
- ECharts 在渲染某 series 时拿到 `undefined/null` 配置，内部访问 `series.type` 直接报错。

## 解决方案
- 修正 props 默认值：将 `default: () => {}` / `default: {}` 统一改为 `default: () => ({})`，避免传入 `undefined` 或共享对象。
- `setOption` 前兜底清洗：对 `option.series` 做 `filter(Boolean)`，并对缺失 `type` 的 series 兜底补 `type: 'line'`。
- 顺手修复 `LineChart.vue` 中 `addEventListener` 相关明显 bug。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：`LineView.js`、`LineChart.vue`、`zhi2-web-admin/src/views/home/components/LineChart.vue`、`zhi2-web-admin/src/views/monitor/components/ComponentCharts.vue`
- 所属项目：2-0；来源会话ID：8dac8daf-d2d6-4f13-a79c-6e0143d0dbce；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_series_fix",
  "source_extraction_id": "0b32d9e61ff4450e8b51bba7f0ece5cc",
  "version": 1,
  "memory_type": "entities"
}
-->