# Vite代理配置/api前缀移除修复
产品2.0项目zhi2-web-admin/vite.config.js中createProxyConfig补充/api路径rewrite，与presale代理一致。

## 变更说明
- 当proxyContext以/api开头时（如VITE_APP_BASE_API的/api/v3.0），转发前去掉前缀/api
- 前端请求/api/v3.0/company/xxx转发到后端http://192.168.1.199:8080/v3.0/company/xxx

## 涉及文件与验证
- 涉及文件：zhi2-web-admin/vite.config.js
- 函数：createProxyConfig(target, proxyContext)中shouldStripApiPrefix判断并rewrite
- 来源会话ID：f8066b62-67af-4b9b-a005-48c4a5ce8926；项目：产品2.0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_api_rewrite",
  "source_extraction_id": "43d08df398dd40149127f1a7c83beead",
  "version": 1,
  "memory_type": "entities"
}
-->