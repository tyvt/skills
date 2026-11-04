- 在弹性布局中，左侧列 `.sort-left` 定义 `max-height: min(560px, calc(72vh - 160px))` 和 `min-height: 0`。
- 子元素 `.sort-left-body` 定义 `min-height: 0`、`overflow-y: auto`、`overflow-x: hidden`，以便在内容超出时启用滚动。
- 验证证据: cursor session=3fda1aa5-47de-48e9-8ced-e2755c0ecb88; 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/system/message/components/selectRangeDialog.vue, d:/repository/产品2.0/zhi2-web-admin/src/views/system/message/components/deptTree.vue

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Coluna esquerda com altura limitada requer min-height:0",
  "source_extraction_id": "1c24d55cf1d3406f8b4fcfae3956c253",
  "version": 1,
  "memory_type": "preferences"
}
-->