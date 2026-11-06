# zs-table列宽闪动修复
苏州市房地产监测V3 中 zs-table-column 因两段异步改宽叠加导致列宽闪动的问题已修复。

## 原因
- 剩余宽度均分滞后：`scheduleDistributeRemainingWidth` 原在 `requestAnimationFrame` 后 `setTimeout(16)`，子列 `columnStretchExtra` 需等约一帧才加上
- DOM 二次测算：`scheduleDomWidthMeasure` 用 `rAF` 推迟测量，复杂自定义插槽列首帧绘制后才写入 `domMeasuredWidth` 再触发改宽

## 修复方案
- `zs-table.vue` 新增 `queueDistributeAfterColumnsUpdated`：在 `tableData` 变化后等子列 `contentWidth` 更新完的 `$nextTick` 内执行 `distributeRemainingWidth`（再补一次 nextTick 覆盖字典异步就绪）
- `scheduleDistributeRemainingWidth` 改为 `rAF + $nextTick`，去掉 16ms 延迟
- 监听表格列更新相关事件以触发上述逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zs-table.vue`、`zs-table-column.vue`、`shareholder/index.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话：533e9595-631f-446e-8081-9e0ce442a190；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_flicker",
  "source_extraction_id": "8e0e61e5a3c841b68158d2e24ffb43c0",
  "version": 1,
  "memory_type": "entities"
}
-->