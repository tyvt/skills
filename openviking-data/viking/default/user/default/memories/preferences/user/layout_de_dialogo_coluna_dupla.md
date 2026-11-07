- 在 `zs-dialog` 中，`zs-form > .el-col` 里的 `width:100%` 会破坏单列布局。
- `ParcelDialog.vue` 使用 `el-row :gutter="32"` 和 `el-col :span="12"` 实现两列，标签左侧 120px 采用 scoped CSS，控件 100% 采用 `:deep` 回退。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 双列对话框布局",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "preferences"
}
-->
