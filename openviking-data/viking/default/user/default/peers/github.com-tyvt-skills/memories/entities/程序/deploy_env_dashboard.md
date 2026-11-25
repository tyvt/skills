# deploy_env_dashboard
deploy-env 多环境部署看板，用 SQLite 注册表管理各项目的环境端口、nginx 站点与登录凭据。

## 基本信息
- 端口 18098；计划任务 deploy-env-dashboard 用 pythonw 静默自启，2026-11-25 起注册即启动
- SQLite 注册表 registry.sqlite 受 git 跟踪，2026-11-25 时共 34 个环境（8 项目 × local/dev/test/uat/prod，端口 base+0~+4），按五环境槽位视图展示
- 生成的 nginx 站点 conf 落 D:\nginx\conf\env-sites（归档 sites-archive），项目内两目录已删并加 .gitignore，nginx.conf include 指向新路径；nginx UI 已移除，仅作静态服务

## 账号密码
- 账号存 env_accounts：login_user + secret_ref；api.py:128-139 仅依据 secret_ref 显示 ****
- api.py:322-328 的密码值只存在内存缓存，进程重启即清空，是"密码没了"的直接原因；/api/state 带 no-store，显示层 2026-11-24 起明文直显
- 2026-11-25 时 34 个环境里仅惠山二期G/dev 与 苏住房G/test 保留 login_user 与 secret_ref，其余已丢
- secret_ref 期望格式为 deploy_env/<project>/<env>/password，隐私库实际 key 为 deploy_env-<project>-<env>，两者错配导致无法解析

## 约定与待办
- 用户 2026-11-25 决定：账号与密码两类都补齐、明文写入数据库（覆盖"密码不入库"约定）、先修错配引用
- 明文入库需改表结构与 api.py，属代码改动，须过 plan_review 计划门后方可动手
- 恢复交接文档 HANDOFF-CHAIN-deploy-dashboard-credentials-hop1-20261125-0910.md：隐私库 4 组凭据 + 对话记录 5 条历史账号 + 6 项待办

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "5a1bdecf0086456ba96bc0a7cf696695",
  "version": 1,
  "memory_type": "entities"
}
-->