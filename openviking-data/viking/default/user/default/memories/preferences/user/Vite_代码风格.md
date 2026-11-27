---
audit_status: valid
last_checked: 2026-11-27T18:21:22+08:00
verdict_note: iHomePC vite.config.js 与多仓 VITE_APP_BASE_API/import.meta.env 命中，代码风格约定属实
---
- 在 Vite 中优先使用 `import.meta.env.VITE_APP_BASE_API` 而不是 `process.env`，因为 `process.env` 不受支持且会触发 Vue warn
- 将遗留写法（例如：imgBlock.vue, contractTable.vue）从 `process.env` 迁移到 `import.meta.env`，以与 `api/index.js` 保持一致
- 在项目中全局消除对 `process.env` 的引用

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->