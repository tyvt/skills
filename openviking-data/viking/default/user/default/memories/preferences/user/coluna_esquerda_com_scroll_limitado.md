---
audit_status: valid
last_checked: 2026-11-28T01:13:49+08:00
verdict_note: 产品2.0 含 sort-left/sort-left-body/selectRangeDialog/deptTree，左列滚动约束样式属实。
---
- 在弹性布局中，左侧列 `.sort-left` 应设置 `max-height: min(560px, calc(72vh - 160px))` 和 `min-height: 0`
- 子元素 `.sort-left-body` 应具有 `min-height: 0`、`overflow-y: auto`、`overflow-x: hidden`，以便在超出时滚动
- 应用于 `selectRangeDialog.vue` 和 `deptTree.vue`（光标会话 `3fda1aa5-47de-48e9-8ced-e2755c0ecb88`）

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：3fda1aa5-47de-48e9-8ced-e2755c0ecb88

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->