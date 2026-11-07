# Vite 代理 HTTPS 配置修复
淮安物管 zhi2-web-admin 中 env/.env 误配 http:// 致代理向 TLS 端口发明文请求，改为 https 并增 secure 配置。

## 问题背景
- env/.env 中 VITE_APP_PROXY_ADDRESS 误配 http:// 使 createProxyConfig 向仅提供 TLS 的端口发明文请求。

## 修复方案
- 改为 https://222.184.31.232:15777。
- 在 vite.config.js 对 target 执行 trim() 及 https: 前缀时增 secure 配置。

## 涉及文件
- zhi2-web-admin/vite.config.js
- env/.env（路径 d:\repository\淮安物管\env\.env）

## 证书域名不匹配致握手失败
- 终端报错 **ERR_TLS_CERT_ALTNAME_INVALID** 含义：代理向 `https://222.184.31.232:15777` 发请求时用 IP 做 TLS 校验，而服务器证书 SAN 一般只含域名不含此 IP，Node 认为主机名不匹配，握手失败。
- `env/.env` 中配置：`VITE_APP_PROXY_ADDRESS = https://222.184.31.232:15777`（路径 `d:\repository\淮安物管\env\.env`）。
- 在 `vite.config.js` 的 `createProxyConfig` 中：当 `target` 为 `https:` 且主机是纯 IPv4 时，自动加 `secure: false`，让开发代理不校验上游证书与 IP 是否一致（仅影响 Vite 开发代理到该上游，不改变本地页面 HTTPS）。
- 涉及文件：`d:\repository\淮安物管\zhi2-web-admin\vite.config.js`、`d:\repository\淮安物管\env\.env`；来源会话：e29a7782-8b08-4a50-8eee-d717a008c419。
- 可选正规做法：若运维提供与证书一致的域名，将 `VITE_APP_PROXY_ADDRESS` 改为 `https://域名:15777`，一般无需关闭 `secure`，也不再触发此类错误。
- 修改后需重启一次 `npm run dev` 使配置生效。
- 优先将 `VITE_APP_PROXY_ADDRESS` 配置为与证书一致的域名（同可选做法）。

## 验证与归属
- 所属项目：淮安物管
- 验证证据：extracted source=cursor project=淮安物管
- 验证证据：src=淮安物管/017.md
- 来源会话：c0419709-71ee-413d-b8bd-e7489ed2c10c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_proxy_https",
  "source_extraction_id": "e5fada55461549569c8499e46453a5b2",
  "version": 3,
  "memory_type": "entities"
}
-->