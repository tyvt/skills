# 门户H5 nginx配置
nginx 站点配置文件，位于 D:
ginx\conf\sites-enabled\门户H5.conf，负责托管 H5 门户 dist 并反向代理接口。

## Description
- 监听端口 8091，root 指向 H5 门户构建产物 dist，index.html 已设 no-cache，JS 资源带 hash。

## Proxy Rules
- /api/v3.0/ 代理到 127.0.0.1:8086 并剥离 /api（即转发至 8086/v3.0/）。
- /api/v2.0/ 与 /zhi2* 同样代理到 127.0.0.1:8086。

## Significance
- 后端网关地址为本地 8086；修改站点配置后才需执行 nginx -s reload。


<!-- MEMORY_FIELDS
{
  "peer_id": "D--repository---H5",
  "category": "服务器配置",
  "name": "menhu_h5_nginx_conf",
  "source_extraction_id": "dba2f19a9ce34be7b4625c17b2fd44b5",
  "version": 1,
  "memory_type": "entities"
}
-->