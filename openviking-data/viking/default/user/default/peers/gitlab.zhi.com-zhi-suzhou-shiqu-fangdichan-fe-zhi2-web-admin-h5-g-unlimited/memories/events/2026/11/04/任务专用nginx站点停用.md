# Summary
2026-11-04，助手将 task 1497 专用的 nginx 8093 站点配置从 sites-enabled 移回 sites-available 保留备查，nginx 配置校验通过并已 reload；8093 不再监听，共享 nginx（2 进程）保持运行，其它站点（如 8092）不受影响。
# 2026-11-04 (Wednesday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 服务停了吧
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: I'll stop the two backend services I started (portal-server and gateway). The nginx service is shared with other sites, so I'll leave nginx itself running — I'll just disable the task-specific 8093 site I added.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Now let me verify the ports are freed, disable the task-specific nginx site (8093), and confirm no orphan java processes remain.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: Both ports freed (8080/9222 not listening), no leftover java processes. Now let me disable the task-specific nginx 8093 site (remove it from sites-enabled so it doesn't linger pointing at a dead backend) and reload nginx. I'll move the conf out to sites-available to keep it as a record.
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi2-web-admin-h5-g-unlimited]**: 已全部停止：

- **后端两进程已停**：`common-portal-server`(9222)、`common-gateway`(8080) 均不再监听，无残留 java 进程。
- **任务专用 nginx 站点（8093）已停用**：配置从 `sites-enabled` 移回 `sites-available` 保留备查，nginx 配置校验通过并已 reload；8093 不再监听。
- **共享 nginx 保持运行**（2 个进程），其它任务/站点的 8092 等不受影响。

代码（子模块 `develop/v2.6.2-portal` @9e980b57b + 父仓库 @aaddc1d）已提交推送，禅道任务 1497 已回写为 done，均不受停服影响。如需再次验证，按 [E2E-EXTERNALINFO.md](<zhi2-web-admin/E2E-EXTERNALINFO.md>) 重新构建启动即可。

<!-- MEMORY_FIELDS
{
  "event_name": "任务专用nginx站点停用",
  "goal": "停用任务nginx站点",
  "summary": "2026-11-04，助手将 task 1497 专用的 nginx 8093 站点配置从 sites-enabled 移回 sites-available 保留备查，nginx 配置校验通过并已 reload；8093 不再监听，共享 nginx（2 进程）保持运行，其它站点（如 8092）不受影响。",
  "ranges": "0-9",
  "source_extraction_id": "78833d4a4a0a498e864cad5a4111eea0",
  "version": 1,
  "memory_type": "events"
}
-->