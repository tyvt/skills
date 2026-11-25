# deploy-env 看板
以下为 2026-11-25 确认的看板与凭据库状态。

## 看板配置
- 看板端口为 18098。
- SQLite 注册表含 34 个环境。
- nginx 站点与代理采用单源配置，提供五环境槽位视图。
- `registry.sqlite` 受 git 跟踪。

## 凭据库
- 凭据库含 34 个 env 行，两张表均增加 `password_plain` 明文列。
- 10 行斜杠式错配引用已改为 canonical viking 格式。
- 补录历史账号 5 个：管理员 2 个、业务测试 2 个、fdc-v3 local 1 个。
- privacy 库 `deploy_env-pwd-county`、`deploy_env-pwd-fangxun`、`deploy_env-pwd-super` 可解出明文。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "运维看板",
  "name": "deploy_env",
  "source_extraction_id": "55ec517f876a490cabd712f25c420452",
  "version": 1,
  "memory_type": "entities"
}
-->