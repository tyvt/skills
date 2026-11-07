- 在对话框 (zs-dialog) 中，全局样式 `zs-form > .el-col { width: 100% }` 或 `.form-box .zs-form > .el-col` 会将两列布局压缩为单列布局；保持 `el-row`/`el-col` 在 `zs-form` 内部以避免覆盖。
- `ParcelDialog.vue` 使用 `el-row :gutter="32"` 和 `el-col :span="12"` 实现两列布局，包裹 8 个字段；标签 `label-position="left"` 通过 scoped CSS 设置宽度 120px，不使用 `label-width`；控件 `width: 100%` 并使用 `:deep` 处理日期回退；地图区域保持全宽。
- 使用 `zs-form` 时，定义 `zs-size="mini"`、`label-position="left"` 和 `label-width="120px"`，并清理冗余数据。
- 验证证据: src=苏州市房地产监测V3-leftover/002.md 和 src=苏州市房地产监测V3-rest/018.md; 会话 e55d472c-5d5c-48cc-be69-456859ec148f 和 b5f6bfd3-4e42-4e3e-bed9-19ac9eddac86.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：e55d472c-5d5c-48cc-be69-456859ec148f


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "dialog_form_layout",
  "source_extraction_id": "261683e4b6f6441e994fe34ffbde724a",
  "version": 2,
  "memory_type": "preferences"
}
-->
