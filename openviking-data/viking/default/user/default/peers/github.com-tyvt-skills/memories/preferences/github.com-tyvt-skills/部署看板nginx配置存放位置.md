- 部署看板生成的 nginx 站点配置不要放在项目目录内，统一放到 nginx 安装目录下的独立位置（当前为 D:\nginx\conf\env-sites，归档在 sites-archive）。
- 项目仓库不再跟踪这些 conf，用 .gitignore 排除，避免配置随项目重新入库。
- 迁移来源文件要求内容零丢失：按哈希一致复制、校验数量后再删旧目录。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "部署看板nginx配置存放位置",
  "source_extraction_id": "74737d96ff2e48979ce610694aa9998f",
  "version": 1,
  "memory_type": "preferences"
}
-->