---
audit_status: valid
last_checked: 2026-11-27T03:51:50+08:00
verdict_note: 偏好与环境一致：产品2.0 zhi2-web-admin/package.json(15) 确有 src/**/*.{vue,js} 全量 lint 脚本，记忆主张仅检查改动文件以规避全量扫描，与现状吻合。
---
- ESLint 应仅检查更改的文件，而非扫描整个项目 (`src/**/*.{vue,js}` ~3506 项)，以判断诸如 index-new.vue 中的特定更改
- 应用于 portal 项目 (zhi2-web-admin) 的实践

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->