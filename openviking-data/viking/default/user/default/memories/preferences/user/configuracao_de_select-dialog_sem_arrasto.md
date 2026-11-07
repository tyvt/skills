- 在 `zs-dialog.vue` 中，于 `select-dialog` 场景下，禁用 `v-dialogDrag` 以避免与 `drag.js` 的 `absolute+top:15vh` 布局和 flex 居中冲突。
- 当未显式传入 `top` 时，将 `attrs` 写为默认值 `'0'` 以避免 Element 的默认 `margin-top`。
- 使用 `--zs-dialog-select-wrapper-padding` 来统一间距和 `max-height` 的计算。
- 验证证据: `苏州市房地产监测V3-rest/035.md`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 无拖拽的 select-dialog 配置",
  "source_extraction_id": "f95f644aa4cd4dae810385ea25b18d7d",
  "version": 1,
  "memory_type": "preferences"
}
-->
