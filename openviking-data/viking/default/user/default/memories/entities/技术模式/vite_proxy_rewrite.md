# Vite 代理 rewrite 契约：只剥 /api 保留 /v3.0（产品2.0）
产品2.0 本地 dev 代理 rewrite 只能剥离 /api 前缀、必须保留 /v3.0，经 frontend-proxy 响应头验证实际转发地址。

## 问题现象
- 本地 dev 代理无 rewrite 时后端收到 /api 前缀导致 404
- 修时连同 /v3.0 一起剥掉，后端收到 /company/xxx 也 404

## 根因
- 前端请求统一带 baseURL 前缀 /api/v3.0（VITE_APP_BASE_API=/api/v3.0）
- /api 是网关外本地标识、/v3.0 是后端真实服务路径前缀，两层语义不同，rewrite 只能剥第一层

## 解决方案
- vite.config.js 的 createProxyConfig(target, proxyContext) 约定：proxyContext 以 /api 开头时，rewrite 只做 path.replace(/^\/api/, '')
- 转发示例：/api/v3.0/company/xxx → http://host:8080/v3.0/company/xxx
- /zhi2 等不以 /api 开头的代理不受影响
- bypass 钩子把 rewrite 后 URL 写进 frontend-proxy 响应头便于联调核对
- 改动后必须重启 dev server（Vite 仅启动时读 env/代理配置）

## 验证与归属
- 涉及文件：zhi2-web-admin/vite.config.js、env/.env
- 所属项目：产品2.0；来源会话：f8066b62、5038770a；基线：62d5fb9→71e6ed9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_proxy_rewrite",
  "source_extraction_id": "aa6a9cc932774c7691d3f30fa719d440",
  "version": 1,
  "memory_type": "entities"
}
-->