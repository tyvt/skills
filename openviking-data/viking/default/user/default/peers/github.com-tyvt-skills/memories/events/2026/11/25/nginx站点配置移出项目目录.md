# Summary
2026-11-25，用户要求部署看板的 nginx 配置不要放在项目目录内。据此把 gen_nginx_sites.ps1 与 sync.ps1 的生成落点、D:\nginx\conf\nginx.conf 的 include 一并改到 D:\nginx\conf\env-sites（归档用 sites-archive），74 个存量 conf 按哈希一致复制迁移后删除项目内旧目录，项目仓库中 25 个被跟踪 conf 记为删除，SKILL.md 与 .gitignore 同步。nginx -t 通过并 reload，改动提交推送 aa7cbb6..2d2855ae；registry.sqlite 与 3 个 .bak 属既有未提交内容未纳入。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 开机默认后台启动部署看板，部署看板的nginx配置不要放在项目目录里面
...
**assistant [peer=github.com-tyvt-skills]**: I have enough facts now. Both issues are confirmed:

1. **Autostart is broken**: task `deploy-env-dashboard` is `Ready` with last result `0xFFFFFFFF`, no `pythonw` process, port 18098 refused. The install script registers but never starts the task.
2. **nginx configs live inside the project**: `env-sites/` + `sites-archive/` are under `D:\repository\skills\deploy-env\`, and `nginx.conf:50` directly includes that project path.

Let me check the git/worktree state and plan directory before drafting the plan.
...
**assistant [peer=github.com-tyvt-skills]**: Note: 12 tracked conf files have local modifications — I'll move files (not discard) so content is preserved. Target dirs don't exist; the generator's `New-Item -Force` will create them.

Let me read the two files I haven't opened with `read` yet (needed before editing), then apply all edits.
...
**assistant [peer=github.com-tyvt-skills]**: All code edits done. Now migrate the conf files with content preserved (copy → verify counts → remove old dirs).
...
**assistant [peer=github.com-tyvt-skills]**: All 74 conf files copied with identical hashes (local modifications preserved). Now remove the old project dirs and reinstall the autostart task.
...
**assistant [peer=github.com-tyvt-skills]**: `nginx -t` passes, stray process cleaned, dashboard healthy. Now reload nginx so the new include takes effect, then stage only my changed paths and review the diff before committing.
...
**assistant [peer=github.com-tyvt-skills]**: 两项改动均已完成、验收通过并推送。

**结论**
- 看板已改为安装即启动：任务 `deploy-env-dashboard` 现为 `Running`，pythonw 后台静默运行，18098 `/api/state` 返回 HTTP 200。...

<!-- MEMORY_FIELDS
{
  "event_name": "nginx站点配置移出项目目录",
  "goal": "迁移站点配置目录",
  "summary": "2026-11-25，用户要求部署看板的 nginx 配置不要放在项目目录内。据此把 gen_nginx_sites.ps1 与 sync.ps1 的生成落点、D:\\nginx\\conf\\nginx.conf 的 include 一并改到 D:\\nginx\\conf\\env-sites（归档用 sites-archive），74 个存量 conf 按哈希一致复制迁移后删除项目内旧目录，项目仓库中 25 个被跟踪 conf 记为删除，SKILL.md 与 .gitignore 同步。nginx -t 通过并 reload，改动提交推送 aa7cbb6..2d2855ae；registry.sqlite 与 3 个 .bak 属既有未提交内容未纳入。",
  "ranges": "0,28,53,72,80,118,130",
  "source_extraction_id": "74737d96ff2e48979ce610694aa9998f",
  "version": 1,
  "memory_type": "events"
}
-->