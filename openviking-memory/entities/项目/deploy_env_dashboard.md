# 本地前端部署看板（deploy-env）

deploy-env 仓库中的本地前端部署看板与收敛器，登记注册表、站点与代理地址并在单页集中展示。

## 运行形态
- 看板进程为 dashboard/api.py，PID 12164，监听 18098，/api/state 返回 HTTP 200。
- deploy-env 是主仓普通目录（非子模块），当前在 main 分支，registry.sqlite 随仓库提交。
- 每次请求实时读库，但 state 有 CACHE_TTL=20 秒缓存与后台刷新线程，改库后等缓存刷新即生效，无需重启。
- 提交后 registry.sqlite 常因运行时写入显示 M，属运行时字节抖动，数据层一致时可 restore 到 HEAD 保持工作区干净。

## 数据与页面
- 2026-11-24 复核：items=26、projects=17、env_registry=26，无 Bug 名残留，无明文密码泄露。
- 「苏州市房地产监测V3」分组下 8098 站点挂 fdc-v3 并有 admin 账号表；「门户」分组含 admin（超级管理员）与 guest（只读），密码显示 ****。
- env_accounts 表原有 3 条占位种子账号（portal/local 的 admin、guest 与 fdc-v3/local 的 admin），真实密码未补录。

## 变更与交付
- 2026-11-24 hop2 完成去重与多角色改造，提交 c305a0ba 推送 origin/main（含 hop1 初版共 2 笔），远程 SHA 与本地一致。
- 同一任务中按用户选择清空 3 条种子账号（accounts=0），缓存刷新后 /api/state 确认生效。
- migration-audit/ 与 .bak 为审计/备份产物不入提交，过程产物已全部清零。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "e0a5b363ca0149dd81e5edec5cc49189",
  "version": 1,
  "memory_type": "entities"
}
-->