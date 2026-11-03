# Vite 开发代理 HTTPS 连 IP 证书校验失败
园区物管2.0（苏房）中 VITE_APP_PROXY_ADDRESS 配成 https://IP:端口 时触发 ERR_TLS_CERT_ALTNAME_INVALID，/api 代理失败。

## 问题根因
- 上游证书 SAN 只含域名不含该 IP，Node TLS 握手拒绝（ERR_TLS_CERT_ALTNAME_INVALID）
- 改 env 后需重启 dev；若仍不生效查是否被 env/.env.development.local 覆盖（见已知 #1113）

## 解决方案
- 优先级①：改回证书对应域名（本机 hosts 指到 IP）
- 优先级②：仅本地开发在 vite.config.js 的 createProxyConfig 对目标代理加 secure: false 跳过证书校验
- 优先级③：若后端支持改 http://IP 避开 TLS；secure: false 只影响 dev server proxy，不影响 build 产物

## 验证与归属
- 验证：会话 ee9a14e8，env/.env 使用 https://222.184.31.232:15777 触发校验失败，createProxyConfig 增加 secure: false 后本地代理恢复
- 涉及文件：env/.env、zhi2-web-admin/vite.config.js
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：ee9a14e8-3ae5-42f3-9d6a-f8fb0fad0e5c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_proxy_cert",
  "source_extraction_id": "a317e0c50cd34d9a9b397b0502a6a1b0",
  "version": 1,
  "memory_type": "entities"
}
-->