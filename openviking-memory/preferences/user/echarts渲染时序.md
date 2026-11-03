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