
# vite.config.js bypass 请求头修复
产品2.0 的 zhi2-web-admin 修复代理 `bypass` 未应用 `rewrite` 导致 header 显示前端路径而非实际转发地址的问题。

## 问题原因
- `bypass` 里直接用 `req.url` 未走 `rewrite`，`frontend-proxy` header 显示前端请求路径

## 修复内容
- 先应用 `rewrite` 再拼 header：`const rewrittenUrl = options.rewrite ? options.rewrite(req.url) : req.url; res.setHeader("frontend-proxy", `${options.target}${rewrittenUrl}`);`
- 例：请求 `/api/v3.0/foo` 显示 `http://xxx/v3.0/foo`（去 `/api` 前缀）

## 涉及文件与归属
- 文件：`zhi2-web-admin/vite.config.js`
- 所属项目：产品2.0；来源会话：8199e2bb-60dc-46d6-9a57-47b7757e9d8b；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_config_bypass_header_fix",
  "source_extraction_id": "da9bca3f195c4fd8a5e10c92635c7b91",
  "version": 1,
  "memory_type": "entities"
}
-->
