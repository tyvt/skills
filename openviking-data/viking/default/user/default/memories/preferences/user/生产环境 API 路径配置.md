- 在生产环境中要求相对路径解析：`VITE_APP_BASE_API` 在 `.env` 中应为 `api/v2.0`
- Vite 的 `proxy` 键必须以 `/` 开头；`vite.config.js` 通过 `proxyApiPath` 为开发代理添加 `/`，`env/.env` 保持相对

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 生产环境 API 路径配置",
  "source_extraction_id": "f4d822fa0406486f806abebe26b378ee",
  "version": 1,
  "memory_type": "preferences"
}
-->
