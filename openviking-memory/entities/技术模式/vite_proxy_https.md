# Vite 代理 HTTPS 配置修复
淮安物管 zhi2-web-admin 中 env/.env 误配 http:// 致代理向 TLS 端口发明文请求，改为 https 并增 secure 配置。

## 问题背景
- env/.env 中 VITE_APP_PROXY_ADDRESS 误配 http:// 使 createProxyConfig 向仅提供 TLS 的端口发明文请求。

## 修复方案
- 改为 https://222.184.31.232:15777。
- 在 vite.config.js 对 target 执行 trim() 及 https: 前缀时增 secure 配置。

## 涉及文件
- zhi2-web-admin/vite.config.js

## 证书域名不匹配致握手失败
- Vite 开发代理访问 HTTPS 目标 IP 时，若证书 SAN 只包含域名，会触发 ERR_TLS_CERT_ALTNAME_INVALID。
- 优先将 VITE_APP_PROXY_ADDRESS 配置为与证书一致的域名。
- 本次 vite.config.js 仅对 HTTPS 纯 IPv4 上游设置 secure:false 以绕过开发代理证书校验，修改后需重启开发服务。
- 涉及文件：zhi2-web-admin/vite.config.js；来源会话：e29a7782-8b08-4a50-8eee-d717a008c419

## 验证与归属
- 验证证据：src=淮安物管/017.md
- 来源会话：c0419709-71ee-413d-b8bd-e7489ed2c10c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_proxy_https",
  "source_extraction_id": "14c4f7c09ae048a298848ab2771b6290",
  "version": 2,
  "memory_type": "entities"
}
-->