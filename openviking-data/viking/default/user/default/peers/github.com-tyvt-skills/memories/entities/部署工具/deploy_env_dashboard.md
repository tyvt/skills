# deploy-env 部署看板
本地多项目部署看板与收敛器，由 env 注册表驱动，以静态页面加后端 API 展示五环境槽位。

## 运行方式
- 后端 `api.py` 以 `pythonw` 后台静默运行，监听 18098；`/api/state` 返回 `Cache-Control: no-store`，密码列明文直显。
- Windows 计划任务名 `deploy-env-dashboard`，由 `D:\repository\skills\deploy-env\install-autostart.ps1` 注册；2026-11-25 起脚本在 Register 后补 `Start-ScheduledTask`，安装/重装即启动，不再是"注册但不启动"的坏状态（旧状态 LastTaskResult=0xFFFFFFFF、18098 拒连）。
- 脚本含中文时依赖 UTF-8 BOM 才能在 Windows PowerShell 5.1 下正确解析，编辑工具会剥掉 BOM，需用 pwsh 重新前置。

## 配置落点
- 生成的站点 conf 自 2026-11-25 起写入 `D:\nginx\conf\env-sites`，归档在 `sites-archive`，由 `D:\nginx\conf\nginx.conf` 第 50 行 include 加载。
- 生成器 `gen_nginx_sites.ps1`、`sync.ps1` 与 `SKILL.md` 已同步新路径，项目内旧 `env-sites`/`sites-archive` 目录删除并入 `.gitignore`；74 个存量 conf 按哈希一致迁移，`nginx -t` 通过后 reload。

## 自愈兜底
- 2026-11-25 起新增自愈：根因是自启任务仅 AtLogOn 触发一次、进程退出后不自愈；`watchdog.ps1` 以 18098（fallback 18099）监听加 `api.py` 进程为健康判据，无监听才拉起，任务卡 Running 时先 Stop 收敛再 Start，命名互斥防并发，全 ASCII 无 BOM，端口确认窗口 30s（api.py 绑定可能超过 15s）。
- `install-watchdog.ps1` 注册 `deploy-env-watchdog` 任务（登录时 + 每 5 分钟），已注册并 Running；原 `install-autostart.ps1` 未改。
- 验证：健康时 watchdog no-op 且单实例；按 18098 OwningProcess 精确杀进程后触发会自动拉起并 HTTP 200；“任务 Running 但端口缺失”分支未自然复现，保留为防御代码。
- 2026-11-25 自愈兜底提交 `4ab7dd4` 已推送 `origin/main`。

## 注册表
- SQLite 注册表 `registry.sqlite` 已入库并受 git 跟踪，32 行 = 8 个项目 × 5 环境（local/dev/test/uat/prod，端口按 base+index：+0/+1/+2/+3/+4）。
- nginx 站点路径改动已提交并推送（`aa7cbb6..2d2855ae`）；自愈兜底见上节。

<!-- MEMORY_FIELDS
{
  "category": "部署工具",
  "name": "deploy_env_dashboard",
  "source_extraction_id": "84afdbe8120d477eb21af304ed94520e",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->