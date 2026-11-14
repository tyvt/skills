- 习惯自己手动重启 dsh web 进程；restart-web.ps1 多次失败后不再依赖该脚本。
- 重启后要求先确认新 web 进程 PID 与启动时间晚于配置改动时间，以判断是否加载新配置。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "DSH web 重启方式",
  "source_extraction_id": "c7e177820f0a4226b8c7ecffec51fb82",
  "version": 1,
  "memory_type": "preferences"
}
-->