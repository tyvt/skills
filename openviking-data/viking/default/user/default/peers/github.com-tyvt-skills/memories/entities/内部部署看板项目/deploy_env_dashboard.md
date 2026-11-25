# deploy-env 部署看板
deploy-env 部署看板是用户维护的内部部署环境管理看板，本轮工作聚焦于恢复并明文持久化历史账号密码。

## 用途与规模
- 看板服务端口 18098，SQLite 注册表记录 34 个环境，含 nginx 站点与管理单源、五环境槽位视图。
- 2026-11-25 的目标：看板展示全部历史账号 + 密码，密码明文持久化在数据库，selftest 与 agent-browser 实机验证通过后由用户确认。

## 密码丢失根因
- api.py 从内存 `_SECRET_CACHE` reveal 密码，进程重启即清空，导致看板账号密码「都没了」；根因行号已核实（137/139 行含脱敏掩码，不引用具体代码）。
- 隐私库盘点出 8 个 target，已解析 4 条明文；存在连字符键与斜杠式 secret_ref 的错配引用，pwd-county、fangxun、super 待补解。

## 实施状态
- 实施计划已通过 plan_review（score 78、P0=0、version=2），用户确认，frontmatter status: approved；计划文件 session-6d359f6f-91fe-4089-b8f5-5a3f2cf3c99d.md。
- 待办顺序：修错配引用与补解 → 明文入库并改 api.py 展示 → 补历史凭据（管理账号 + 业务测试账号）→ selftest + agent-browser 验证 → 收尾。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "内部部署看板项目",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "5991f56841a84886b532de9e6515cc00",
  "version": 1,
  "memory_type": "entities"
}
-->