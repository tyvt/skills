# vite_bypass_rewrite
在 zhi2-web-admin (产品2.0) 中，Vite 的 `bypass` 应在挂载代理 header 之前应用 `rewrite`。

## 问题背景
- `bypass` 使用原始的 `req.url` 作为 `frontend-proxy` header 的值，未经过 `rewrite`，显示的是前端路径而非真实的转发地址。

## 解决方案
- 在将 header 设置为真实转发地址之前，通过 `options.rewrite` 重写 `req.url`。
- 通用规范：在 dev server 中挂载代理 headers 时，应使用重写后的 URL，而非请求的原始 URL。

## 涉及文件与来源
- zhi2-web-admin/vite.config.js
- 来源会话：8199e2bb-60dc-46d6-9a57-47b7757e9d8b

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_bypass_rewrite",
  "source_extraction_id": "5ba2dade06d048a48e78322216a00bde",
  "version": 1,
  "memory_type": "entities"
}
-->
