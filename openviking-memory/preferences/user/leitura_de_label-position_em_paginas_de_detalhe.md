- 详情页面（带有 `detail-container`、`*Detail.vue`）不应有硬编码的 `label-position`。
- 通过 `zs-form` 读取 `platformConfig.formLayout` 来统一；22 个路由的 `detail.vue`（例如：agreement, elevatorRetrofitApply）将 `el-form` 替换为 `zs-form`。
- 验证证据: src=苏州市房地产监测V3/051.md

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 读取详情页面中的 label-position",
  "source_extraction_id": "5a89d476ffe0486290347903c3f03503",
  "version": 1,
  "memory_type": "preferences"
}
-->
