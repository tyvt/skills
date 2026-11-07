# ECharts finished 事件同步 setOption 告警防护
园区物管2.0 Web 端 ECharts 在 finished 事件里同步 setOption 会报主流程告警，需用 rAF 推迟+位置缓存+replaceMerge 通用套路解决。

## 问题背景
- 在 ECharts finished 事件回调里同步调用 chart.setOption（如渲染后用 graphic 定位 Y 轴单位文案），控制台持续告警 `[ECharts] setOption should not be called during main process`
- 存在 finished→setOption→finished 自激循环风险
- 根因：setOption 在 finished 触发时仍处于主渲染流程内，ECharts 禁止在渲染流程中再次触发渲染

## 解决方案
- 用 requestAnimationFrame 把 finished 里的 setOption 推迟到下一帧，脱离主渲染流程
- 缓存上次定位结果（如 lastTrendUnitPos），位置未变化时直接跳过 setOption，切断循环
- 仅更新 graphic 时给 setOption 加 `{ replaceMerge: ['graphic'] }`，让合并语义明确、避免残留
- 该套路与小程序端 2d 同层渲染问题相互独立

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：会话 94419466（fundPanorama/index.vue）根因为 renderFundTrendMixed 在 finished 事件里同步 setOption（约 767 行），修复为 rAF 推迟+lastTrendUnitPos 缓存+replaceMerge:['graphic']，刷新后告警消失且单位对齐逻辑不变
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0；代码基线：7814a0c2a…f00310232；来源会话：94419466-19b6-4c9f-a1f3-1926eccfdd49

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_finished_setoption",
  "source_extraction_id": "8c9ff18cd576499fa45b34aa0decf72e",
  "version": 1,
  "memory_type": "entities"
}
-->