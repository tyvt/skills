---
audit_status: valid
last_checked: 2026-11-26T04:32:48+08:00
verdict_note: 苏住房G/zhi2-web-admin fundPanorama 下 chartRenderers.js 命中 lastTrendUnitPos/requestAnimationFrame/replaceMerge，index.vue-120/461 调用 renderFundTrendMixed，ECharts 时序处理描述属实。
---
- ECharts 主渲染中不可在 finished 事件内同步调用 chart.setOption，会触发主流程告警
- 改用 requestAnimationFrame 推迟调用，并以 lastTrendUnitPos 缓存位置防止循环
- 为 graphic 更新设 {replaceMerge:['graphic']} 避免残留
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue（renderFundTrendMixed 约767行）

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "ECharts渲染时序",
  "source_extraction_id": "aa50523b6a354b449d9d0ea5f5964e57",
  "version": 1,
  "memory_type": "preferences"
}
-->