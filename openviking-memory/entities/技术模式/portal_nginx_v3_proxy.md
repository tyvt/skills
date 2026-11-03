# 门户 Nginx 反代 /api/v3.0 保留路径段
Nginx 反代 /api/v3.0 时 proxy_pass 与调试头须保留 /v3.0 路径段，否则接口 404。
## 问题根因
- 浏览器请求 /api/v3.0/system/... 剥掉 /api 后转发路径必须仍是 /v3.0/system/...
- proxy_pass 写成 http://upstream/ 会丢失 /v3.0 导致 404，应写为 http://upstream/v3.0/
## 解决方案
- 若用 map 生成 X-Proxy-Target-Url 等调试头，map 拼接也要带上 /v3.0，尽量放 http 级全局
- 404/失败响应也应能带上该头便于对照
## 涉及文件与归属
- deploy/nginx.conf
- zhi2-web-admin/vite.config.js
- 所属项目：门户；来源会话：92c56a3b-7408-4bc6-a659-53829f7a14cd；代码基线：db160a9
- 验证证据：platformConfig/getInfo 404；修正 proxy_pass 与 X-Proxy-Target-Url 补 /v3.0 后 200

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_nginx_v3_proxy",
  "source_extraction_id": "d1c4f5df3e10427d9609e97a7b9ada3f",
  "version": 1,
  "memory_type": "entities"
}
-->