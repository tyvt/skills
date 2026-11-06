# 表格列宽全局排查与修复
苏州市房地产监测V3 优化 zs-table-column 与 element-ui 样式，修复表格列宽误算与表头省略问题。

## 修改内容
- `zs-table-column.vue`：新增 `isFixedWidthCustomSlot`，仅 switch/img/custom 等 UI 列用固定 width
- 链接型自定义插槽改为 `min-width: max(floor, resolvedMinWidth)` 并计入弹性列（`isFlexColumn`），表格开启 `fit`
- `containsComplexSlotNode` 仅含文本的 div/span 视为可测算，减少误用 80px
- 表头 `.table-header`/`.table-header-label` 不再省略
- `element-ui.scss`：表体 `td.zs-table-column--auto-width` 保留省略号 + tooltip

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`zs-table-column.vue`、`element-ui.scss`、`mixins/tableComponents.js`、`supervision/unblock/guarantee/components/regulatorDialog.vue`
- 来源会话ID：7c64a6c0-a818-489b-a545-1c33f9163bfe
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_column_width_fix",
  "source_extraction_id": "7363ffb17ce0413da919427f6f448e60",
  "version": 1,
  "memory_type": "entities"
}
-->