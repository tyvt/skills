# 门户H5站点
本地门户H5前端通过 nginx 部署，用于联调本地后端。
## Description
- 监听端口 8091，root 为 D:/repository/门户H5/dist，与「门户」站点(8092)共用同一 nginx 且独立不覆盖。
- 2026-11-11 助手将该站点代理改指本地网关 127.0.0.1:8086，并剥除 /api 前缀（因网关路由本身不带 /api，生产由入口层剥离）。
- 改后联调链路打通：浏览器开 http://localhost:8091 可登录，请求经 nginx 8091 → 网关 8086 → portal-server 9222。
## Relations
- 与「门户」站点（8092）独立；8092 仍走远程网关未改动。
- 与「门户后端」联动，代理指向其网关模块。

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "portal_h5_site",
  "source_extraction_id": "d21087ff39a64b87ab4ee5443c379da4",
  "version": 1,
  "memory_type": "entities"
}
-->