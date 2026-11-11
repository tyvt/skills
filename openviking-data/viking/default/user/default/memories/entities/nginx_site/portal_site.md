# Portal Site
原「门户」前端（旧 checkout，分支 develop）通过 nginx 部署，与「门户H5」(master) 是不同项目。
## Description
- 配置文件：D:/nginx/conf/sites-enabled/门户.conf（符号链接 → D:/nginx/conf/sites-available/门户），root 为 D:/repository/门户/dist（旧项目门户，分支 develop）。
- 监听端口 8092，server_name localhost；2026-11-11 助手曾误将 root 改为 门户H5/dist 后已还原，nginx 重新加载后确认正常服务门户/dist（HTTP 200，MD5 匹配）。
- 通过 D:/nginx-ui 面板管理；磁盘直接改配置后需面板 Reload 同步避免漂移。
## Relations
- 与「门户H5」站点（端口 8091，root D:/repository/门户H5/dist）共用同一 nginx，二者独立不覆盖。
- 与家园区一网通办H5 共用 nginx，曾通过将该 H5 移至 8093 解决端口冲突。
- 2026-11-11 门户H5(8091) 代理改指本地网关 127.0.0.1:8086 并剥除 /api 前缀以联调；门户(8092) 保持原样仍走远程网关。

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "portal_site",
  "source_extraction_id": "d21087ff39a64b87ab4ee5443c379da4",
  "version": 5,
  "memory_type": "entities"
}
-->