---
audit_status: valid
last_checked: 2026-11-27T09:16:45+08:00
verdict_note: 产品2.0/env/.env 存在 VITE_APP_BASE_API 配置，核心描述与现状一致
---
- 在生产环境中要求相对路径解析：`VITE_APP_BASE_API` 在 `.env` 中应为 `api/v2.0`
- Vite 的 `proxy` 键必须以 `/` 开头；`vite.config.js` 通过 `proxyApiPath` 为开发代理添加 `/`，`env/.env` 保持相对

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->