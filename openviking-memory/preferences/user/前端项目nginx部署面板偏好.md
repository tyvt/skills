- 前端项目本地部署统一使用 nginx UI 面板管理，站点配置写在 D:/nginx/conf/sites-enabled/*.conf（由面板维护），不使用 http-serve、live-server、python -m http.server 等其他本地静态服务器替代。
- 面板是 nginx 配置的真实来源；手改磁盘 conf 文件后必须到面板执行 Reload/重载，避免面板状态与磁盘配置漂移，面板里的改动也要确实落到 sites-enabled 文件。
- 出现配置冲突（例如两个 server 块抢同一 listen 端口且 server_name 相同导致 "conflicting server name ... ignored"）时，优先在面板对应站点配置中调整端口/服务名，不临时手改后不回写面板。
- 改动端口等会影响本地访问 URL 的配置前，先和用户确认哪个站点保留原端口，避免遮蔽其中一个站点。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "前端项目nginx部署面板偏好",
  "source_extraction_id": "f33d2908a79241a6bf90d25ca98baec3",
  "version": 1,
  "memory_type": "preferences"
}
-->