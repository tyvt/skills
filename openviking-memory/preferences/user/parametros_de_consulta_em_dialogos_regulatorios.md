- `regulatorDialog` 应接收来自父表单的 prop `useMoneyApplyType` 并统一构建查询参数。
- 提取 `buildQueryParams()` 以在调用 `getRegProjectByProId` 时包含 `projectId`/`regulatorProjectId`/`useMoneyApplyType`。
- `handleQuery` 应调用 `getList`；父页面（例如：`guarantee/detail.vue`）传递该 prop，兼容 `projectId` 并在切换项目时清空字段。
- 验证证据: `苏州市房地产监测V3-rest/036.md`.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 监管对话框中的查询参数",
  "source_extraction_id": "f95f644aa4cd4dae810385ea25b18d7d",
  "version": 1,
  "memory_type": "preferences"
}
-->
