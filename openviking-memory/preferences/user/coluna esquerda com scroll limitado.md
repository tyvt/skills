- 在弹性布局中，左侧列 `.sort-left` 应设置 `max-height: min(560px, calc(72vh - 160px))` 和 `min-height: 0`
- 子元素 `.sort-left-body` 应具有 `min-height: 0`、`overflow-y: auto`、`overflow-x: hidden`，以便在超出时滚动
- 应用于 `selectRangeDialog.vue` 和 `deptTree.vue`（光标会话 `3fda1aa5-47de-48e9-8ced-e2755c0ecb88`）

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Coluna esquerda com scroll limitado",
  "source_extraction_id": "dff9b0dfa14544cfa914d2f988a5f039",
  "version": 1,
  "memory_type": "preferences"
}
-->