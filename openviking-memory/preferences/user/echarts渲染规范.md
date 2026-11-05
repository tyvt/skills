- ECharts 图表不应在 finished 等主渲染事件回调中同步调用 setOption，应使用 requestAnimationFrame 推迟到下一帧，避免"setOption should not be called during main process"告警。
- 仅更新 graphic 时应使用 { replaceMerge: ['graphic'] } 明确合并，并用缓存位置避免 finished→setOption→finished 循环。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "ECharts渲染规范",
  "source_extraction_id": "f1f6fbbe87d041748a40bf0ffc758afb",
  "version": 1,
  "memory_type": "preferences"
}
-->