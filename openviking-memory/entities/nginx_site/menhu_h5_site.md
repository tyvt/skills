---
audit_status: valid
last_checked: 2026-11-26T16:23:27+08:00
verdict_note: appid __UNI__FLOOD_C 在 苏住房防汛C端 构建产物 vendor.js 中确认；nginx 站点配置属部署事实，无矛盾证据。
---
# 门户H5站点
「门户H5」前端（当前项目，分支 master）的独立 nginx 站点，与旧「门户」站点分离。
## Description
- 配置文件：D:/nginx/conf/sites-available/门户H5，符号链接 D:/nginx/conf/sites-enabled/门户H5.conf（与门户约定一致）。
- 监听端口 8091，root 为 D:/repository/门户H5/dist，server_name localhost。
- API 代理初始复用门户的 v2 dev 网关；2026-11-11 用户要求改指本地后端 127.0.0.1:8086。
- 2026-11-11 新建时因 http 级 gzip 重复报错，已将 gzip 移入 server{} 块，nginx -t 通过并验证 HTTP 200。
## Relations
- 与「门户」站点（8092）共用 nginx，二者独立。
- 2026-11-24 确认 8091 门户H5 的 manifest name 为「苏住房防台防汛」；登录后从「应用列表」点防汛卡片，由后端下发 launch URL 跳转防汛C端；门户登录需手机号+短信码，无法自主进入。
- 门户将防汛作为子应用 `__UNI__FLOOD_C`（async 异步加载）挂在 8091 自源下；2026-11-24 核对其内嵌防汛为 11-18 旧构建（js hash `CxVsCj6a`、index 481 字节），与当前 dist（index 1033 字节）不同。

<!-- MEMORY_FIELDS
{
  "category": "nginx_site",
  "name": "menhu_h5_site",
  "source_extraction_id": "a5bb84377f824810939d97ca9ef65808",
  "version": 2,
  "memory_type": "entities"
}
-->