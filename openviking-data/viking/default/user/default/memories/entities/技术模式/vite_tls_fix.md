# 开发代理 HTTPS 证书校验报错修复
园区物管2.0 开发环境用 HTTPS 连接 IP 触发 ERR_TLS_CERT_ALTNAME_INVALID，已在 vite 代理配置跳过证书校验。

## 问题原因
- 用 HTTPS 连接 IP（222.184.31.232），但服务端证书为域名签发，SAN 不含该 IP，Node TLS 握手拒绝
- 原配置 VITE_APP_PROXY_ADDRESS = 'https://222.184.31.232:15777'

## 处理方式
- 推荐：将 VITE_APP_PROXY_ADDRESS 改为证书对应域名（或 hosts 将域名指向该 IP）
- 本地开发：在 vite.config.js 的 createProxyConfig 增加 secure: false，开发代理不校验上游 HTTPS 证书

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/vite.config.js、env/.env
- 所属项目：园区物管2.0
- 来源会话：ee9a14e8-3ae5-42f3-9d6a-f8fb0fad0e5c
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_tls_fix",
  "source_extraction_id": "18bb029c698a48dcbda633e8f296ab54",
  "version": 1,
  "memory_type": "entities"
}
-->