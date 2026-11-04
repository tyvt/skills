- 在 `NodeDetailsDialog.vue` 中，保持 `el-row`/`el-col` 在 `zs-form` 内，以避免样式 `.form-box .zs-form > .el-col { width: 100% }` 将两列变为一列。
- 将 `zs-dialog` 配置为 `zs-size="mini"`、`label-position="left"` 和 `label-width="120px"`。
- 应用此模式时，移除 `data` 中的冗余字段。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Layout de el-col em zs-form",
  "source_extraction_id": "31864a68f6314a71a7d8300079e6f96a",
  "version": 1,
  "memory_type": "preferences"
}
-->