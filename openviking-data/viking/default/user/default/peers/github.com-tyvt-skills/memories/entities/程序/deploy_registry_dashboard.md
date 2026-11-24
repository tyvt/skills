# 部署注册表看板（deploy-env）
本地前端部署看板，以 registry.sqlite 为注册表登记各项目环境，并在浏览器中展示环境状态与账号信息。

## 组成
- 后端 api.py：读取 registry.sqlite，提供 /api/state 及账号密码的 reveal/inject 端点
- 前端 index.html：按存储的项目显示名分组，每个环境卡片渲染多角色账号表（密码掩码 + 显示切换）
- 自测 selftest_dashboard.py：2026-11-24 扩到 13 项用例全部通过；前端脚本通过 node --check
- 迁移脚本 migrate_dashboard.py，以及新建的 migrate_projects.py（幂等、执行前备份、写审计事件）

## 数据模型（2026-11-24 改造后）
- projects 表：key 主键、display_name（治理后干净名）、aliases（旧 key/旧名 JSON）、dist_root、status
- env_registry 增加 project_key 与 sort_order，唯一键改为 (project_key, env)，dist_root 仅用于计算 built_at
- env_accounts 表：一环境多角色（admin/operator/viewer），含 role_label、username、secret_ref、login_selector，唯一键 (project_key, env, role)
- 密码不入库，只存隐私库占位 secret_ref（{{ov_privacy:deploy_env/<key>/<env>/<role>/password}}）；/api/state 只返回掩码，明文需鉴权揭示

## 关键事实
- 看板端口 18098；nginx 站点与代理地址单源登记
- 2026-11-24 迁移后 26 行环境记录未减少，原 id=24 的 8098 改挂 fdc-v3/local-8098，无 Bug 命名
- 榆林G bug6220 的显示名规范为「榆林G」（key=yulin-g），dist_root 与 nginx_conf 保持不变
- 隐私库中暂无 deploy_env 条目，真实账号需按 deploy_env/<key>/<env>/<role>/password 补录；未登记时显示「未登记」

## 遗留项
- 后台启动时端口绑定失败，原因待诊断
- agent-browser 实机截图与用户确认的前端验证门未完成
- 种子账号的处置与提交方式待与用户确认

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "deploy_registry_dashboard",
  "source_extraction_id": "d89ab7af2f734144bbca6c0b69a6e82c",
  "version": 1,
  "memory_type": "entities"
}
-->