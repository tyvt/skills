# 门户H5
uni-app Vue3 移动端门户前端项目，当前工作项目（分支 master）。
## Description
- 本地目录 D:/repository/门户H5，git 分支 master。
- 构建命令 `uni build`，产物落在 门户H5/dist（含 index.html、assets/、static/）。
- 与旧 checkout `门户`（分支 develop/v2.6.2-portal-mobile，目录 D:/repository/门户）是不同目录；旧目录 dist 由端口 8092 站点服务（还原后），门户H5 由独立端口 8091 站点服务。
## Relations
- 本地通过 nginx 独立站点「门户H5」部署，端口 8091，root 指向 D:/repository/门户H5/dist（详见 menhu_h5_site 实体）。
- 后端接口由 `门户后端` 项目（端口 8086）提供。

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "menhu_h5",
  "source_extraction_id": "eb1361cacb384c28997e79b2364de32f",
  "version": 2,
  "memory_type": "entities"
}
-->