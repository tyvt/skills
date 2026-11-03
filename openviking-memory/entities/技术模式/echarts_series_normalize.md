# ECharts series 归一化防护
在 setOption 前对 option.series 做假值过滤与缺 type 补默认，避免 LineView 读 undefined.type。

## 问题根因
- 控制台报 `Cannot read properties of undefined (reading 'type')`（LineView.render），根因是 `option.series` 混入 undefined/null/false 或空洞项。
- 常见来源：条件拼接 `series: [a && {...}]`，或 `getOption()` 改完再 `setOption` 时 `series[0]` 已清空仍回写。
- 另一来源：图表组件 props 默认值 `() => {}` 返回 undefined，使 `option.series` 含 undefined 项。

## 解决方案
- 在 `setOption` 前统一走 `src/utils/echartsOption.js`：过滤假值项，缺 `type` 的项补默认（如 line/bar/map）。
- 先在地图、气泡、季度申报等高频入口接入，再考虑全局包一层 `setOption`。
- 图表组件 props 默认值由 `() => {}` 改为 `() => ({})`，避免 series 为 undefined。
- 在 `setOption` 前对 series 做 `filter(Boolean)` 并补 `type: 'line'`；同时修正 `LineChart.vue` 的事件监听。

## 验证与归属
- 验证证据：会话 74a5d328 用户贴 LineView.js:567 stack，结论为 series 空值 + 新增 echartsOption 归一化；会话 8dac8daf 补充 LineView.js:567 报错源于 props 默认 `()=>{}` 返回 undefined，图表组件 props 改默认 `()=>({})`、setOption 前 filter(Boolean) 并补 `type:'line'`、修正 LineChart.vue。
- 涉及文件：zhi2-web-admin/src/utils/echartsOption.js；zhi2-web-admin/src/views/benefit/mobilePreview/pubQuarterlyDeclaration/index.vue；zhi2-web-admin/src/views/home/components/BubblesChart.vue；zhi2-web-admin/src/views/transaction/screen/components/map.vue；zhi2-web-admin/src/views/monitor/components/mapChart/index.vue；LineView.js；LineChart.vue。
- 所属项目：2-0；来源会话ID：74a5d328-683e-4a0f-84af-32d70a0281e6 与 8dac8daf-d2d6-4f13-a79c-6e0143d0dbce；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_series_normalize",
  "source_extraction_id": "5dbac103e3d54e85b671d164f7e79f30",
  "version": 2,
  "memory_type": "entities"
}
-->