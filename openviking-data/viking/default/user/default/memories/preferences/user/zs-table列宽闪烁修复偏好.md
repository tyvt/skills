- `zs-table` 列宽闪动源于 `scheduleDistributeRemainingWidth` 的 `setTimeout(16)` 延迟与 `scheduleDomWidthMeasure` 的 `rAF` 二次测算叠加。
- `zs-table.vue` 新增 `queueDistributeAfterColumnsUpdated` 在 `$nextTick` 执行 `distributeRemainingWidth`。
- 将 `scheduleDistributeRemainingWidth` 改为 `rAF + $nextTick` 以移除 16ms 延迟。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zs-table列宽闪烁修复偏好",
  "source_extraction_id": "d743391f84c8405d8d72212526994dae",
  "version": 1,
  "memory_type": "preferences"
}
-->