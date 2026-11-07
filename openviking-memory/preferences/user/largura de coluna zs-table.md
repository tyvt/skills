- 避免在 `zs-table` 中出现列宽度闪烁：不要将 `scheduleDistributeRemainingWidth` (rAF + setTimeout 16ms) 的异步逻辑与 `scheduleDomWidthMeasure` (rAF) 重叠。
- 在 `zs-table.vue` 中添加 `queueDistributeAfterColumnsUpdated`，在 `tableData` 变化后通过 `$nextTick` 执行。
- 将 `scheduleDistributeRemainingWidth` 改为 `rAF + $nextTick`，移除 16ms 延迟。
- 验证证据: src=苏州市房地产监测V3-leftover/021.md; 会话 533e9595-631f-446e-8081-9e0ce442a190.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：533e9595-631f-446e-8081-9e0ce442a190


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "largura de coluna zs-table",
  "source_extraction_id": "5cb4457da8b74ad0b105228a1b4260cf",
  "version": 1,
  "memory_type": "preferences"
}
-->
