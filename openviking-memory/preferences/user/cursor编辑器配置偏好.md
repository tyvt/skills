- 配置编辑器时不要提升内存上限，保持轻量设置（移除 8192MB 内存配置）
- 考虑移除或禁用不必要的扩展与检查：禁用/卸载 Vue.volar、禁用 shenjiaolong.vue-helper、可选禁用 Error Lens；关闭 TS/JS 校验与 Vue inlay hints
- `zhi2-web-admin/jsconfig.json` 设 `checkJs: false` 并移除 `types: ["vite/client"]`，扩充 `exclude`
- 使用 `.vscode/settings.json` 开启 `vue.server.hybridMode` 等轻量设置，与根目录保持一致

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Cursor编辑器配置偏好",
  "source_extraction_id": "3b2c452f41c0468094892f94a1ad0773",
  "version": 1,
  "memory_type": "preferences"
}
-->