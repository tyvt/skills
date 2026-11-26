---
audit_status: valid
last_checked: 2026-11-26T23:46:33+08:00
verdict_note: ESLint 检查范围偏好类，与项目现状一致。
---
- ESLint 应仅检查更改的文件，而非扫描整个项目 (`src/**/*.{vue,js}` ~3506 项)，以判断诸如 index-new.vue 中的特定更改
- 应用于 portal 项目 (zhi2-web-admin) 的实践

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->