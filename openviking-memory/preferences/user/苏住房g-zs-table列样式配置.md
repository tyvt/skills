- 列表列需换行时配 `showOverflowTooltip: false` + 专属 className 放开多行；需单行完整时同样关 tooltip 但必须显式给宽（width 或 slotWidth）。
- 表格外层加专属 class 让表体横向滚动，窄屏靠滚动而不是压缩列。
- 组件层小范围修复：合并列 className 时保留自定义类、弹性列显式设置 `showOverflowTooltip: false` 时不再强制 true。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房G-zs-table列样式配置",
  "source_extraction_id": "8bcd077e3b6849d5b8c4d44b4b5a633f",
  "version": 1,
  "memory_type": "preferences"
}
-->