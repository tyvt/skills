- 不提升编辑器内存上限，倾向轻量设置（如移除 8192MB 内存配置）
- `jsconfig.json` 设 `checkJs: false`、移除 `types: ["vite/client"]`、扩充 `exclude`（playwright-report、test-results 等）
- 关闭 TS/JS 校验与自动建议，开启 `vue.server.hybridMode`，关闭 Vue inlay hints
- 禁用/卸载 `Vue.volar`（Vetur 若有也卸载），禁用 `shenjiaolong.vue-helper`，可选禁用 `Error Lens`
- 目的是减轻校验与渲染压力，而非增加资源占用

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "Cursor开发环境配置",
  "source_extraction_id": "64135c6de2f8446c95b85023673ec5dc",
  "version": 1,
  "memory_type": "preferences"
}
-->