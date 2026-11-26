# deploy-env
`deploy-env` 是 dsh 的环境看板与凭据管理模块，使用 SQLite 注册表维护环境与路径配置，以下看板与凭据状态截至 2026-11-25。

## 看板配置
- 端口：18098。
- 注册表：SQLite；`registry.sqlite` 受 git 跟踪。
- nginx 站点与代理采用单源配置。
- 提供五环境槽位视图。
- `conf_path_for` 优先使用 `env-sites`，并按 `display_name`/`project`/`project_key` 与 `listen` 端口回退。

## 凭据与数据修复
- 当前有 34 个 env 行。
- 两表新增 `password_plain` 明文列。
- 10 行斜杠式错配引用改为 canonical viking 格式。
- 补历史账号 5 个：管理员 2、业务测试 2、fdc-v3 local 1。
- privacy 库 `deploy_env-pwd-county`、`deploy_env-pwd-fangxun`、`deploy_env-pwd-super` 可解明文。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "内部工具",
  "name": "deploy_env",
  "source_extraction_id": "19f1674e77c6444a9ef773adf8d7b926",
  "version": 1,
  "memory_type": "entities"
}
-->