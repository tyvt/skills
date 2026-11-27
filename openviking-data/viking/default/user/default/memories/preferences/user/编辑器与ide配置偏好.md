---
audit_status: valid
last_checked: 2026-11-28T01:15:22+08:00
verdict_note: 偏好记忆：适用项目苏州V3 jsconfig.json checkJs-false 命中，IDE 轻量化配置与检查关闭属实。
---
- 偏好轻量化编辑器配置，不要提升内存上限（如移除 8192MB 内存配置）
- 关闭 TS/JS 校验与自动建议，开启 `vue.server.hybridMode`，关闭 Vue inlay hints
- 移除或禁用重型扩展：`Vue.volar`（Vetur 若有也卸载）、`shenjiaolong.vue-helper`、`Error Lens`
- `jsconfig.json` 设 `checkJs: false`、移除 `types: ["vite/client"]`、扩充 `exclude`
- 适用项目：苏州市房地产监测V3（zhi2-web-admin）

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "编辑器与IDE配置偏好",
  "source_extraction_id": "953395114c4d48ac9817bfc0fd068089",
  "version": 1,
  "memory_type": "preferences"
}
-->