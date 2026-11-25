# deploy-env 看板
github.com-tyvt-skills 使用的部署环境看板及其凭据库。

## 看板
- 端口 18098，SQLite 注册表 34 个环境。
- nginx 站点与代理单源，提供五环境槽位视图。
- registry.sqlite 受 git 跟踪。

## 凭据库
- 34 个 env 行，两表新增 password_plain 明文列。
- 10 行斜杠式错配引用改为 canonical viking 格式。
- 补历史账号 5 个：管理员 2、业务测试 2、fdc-v3 local 1。
- privacy 库 deploy_env-pwd-county/-fangxun/-super 可解明文。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "部署工具",
  "name": "deploy-env 看板",
  "source_extraction_id": "39f47e941bc2409e8b998b592259bf89",
  "version": 1,
  "memory_type": "entities"
}
-->