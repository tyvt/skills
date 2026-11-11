# 门户H5站点
「门户H5」前端（当前项目，分支 master）的独立 nginx 站点，与旧「门户」站点分离。
## Description
- 配置文件：D:/nginx/conf/sites-available/门户H5，符号链接 D:/nginx/conf/sites-enabled/门户H5.conf（与门户约定一致）。
- 监听端口 8091，root 为 D:/repository/门户H5/dist，server_name localhost。
- API 代理初始复用门户的 v2 dev 网关；2026-11-11 用户要求改指本地后端 127.0.0.1:8086。
- 2026-11-11 新建时因 http 级 gzip 重复报错，已将 gzip 移入 server{} 块，nginx -t 通过并验证 HTTP 200。
## Relations
- 与「门户」站点（8092）共用 nginx，二者独立。

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "menhu_h5_site",
  "source_extraction_id": "eb1361cacb384c28997e79b2364de32f",
  "version": 1,
  "memory_type": "entities"
}
-->