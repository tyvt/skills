---
audit_status: valid
last_checked: 2026-11-27T20:55:36+08:00
verdict_note: 监测V3 zs-dialog.vue 含 v-dialogDrag、zs-dialog-select-wrapper-padding、select-dialog，无拖拽配置属实
---
- 在 `zs-dialog.vue` 中，于 `select-dialog` 场景下，禁用 `v-dialogDrag` 以避免与 `drag.js` 的 `absolute+top:15vh` 布局和 flex 居中冲突。
- 当未显式传入 `top` 时，将 `attrs` 写为默认值 `'0'` 以避免 Element 的默认 `margin-top`。
- 使用 `--zs-dialog-select-wrapper-padding` 来统一间距和 `max-height` 的计算。
- 验证证据: `苏州市房地产监测V3-rest/035.md`.

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->