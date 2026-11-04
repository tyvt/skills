- 列表列需换行时配 `showOverflowTooltip: false` + 专属 className 放开多行；需单行完整时同样关 tooltip 但必须显式给宽（width 或 slotWidth）。
- 表格外层加专属 class 让表体横向滚动，窄屏靠滚动而不是压缩列。
- 组件层小范围修复：合并列 className 时保留自定义类、弹性列显式设置 `showOverflowTooltip: false` 时不再强制 true。
- 自定义控件列（开关/图标/按钮）逐列显式配 `showOverflowTooltip: false`、`align: 'center'`、`min-width: 96` 避免省略号与tooltip干扰并防挤压变形。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏住房G-zs-table列样式配置",
  "source_extraction_id": "570e94c34ff24780be3e9a556312f3ad",
  "version": 2,
  "memory_type": "preferences"
}
-->