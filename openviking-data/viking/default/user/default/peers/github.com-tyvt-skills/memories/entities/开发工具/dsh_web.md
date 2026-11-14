# dsh web

dsh web 是本地提供 Web 会话服务的客户端，监听 3080 端口，会话可用工具由 profile 与 cordis.patch.yml 预设决定。

## 描述
- 服务监听 3080 端口，返回 401 属鉴权正常的健康信号。
- profile 配置文件位于 ~/.dsh/profiles/web/cordis.patch.yml，包含 standard、ptc、cordis、full-tools 预设块，DSH 启动会重写/归一化该文件。
- 可用 `--dump-config --profile web` 做静态配置校验，可发现 entry not found / patch 错误及预设的禁用状态。

## 运行时装配
- 会话创建时固化 tools 快照并写入 session_projcache，结构为 record.rows.<key> 下的 contextBreakdown 与 contextHeaders。
- 重启前创建的会话不会刷新 tools 快照，仍保留旧工具集合（如 46 工具、含 schedule_*/goal/workflow，toolsTokens 6182/7177）。
- 验证新配置必须使用重启后新建的 web 会话；`dsh headless` 运行在 headless profile 下，不能用于验证 web profile。
- 重启后新 web 进程的 PID 与启动时间晚于配置改动，是改动已加载的前提条件。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "开发工具",
  "name": "dsh_web",
  "source_extraction_id": "50e392acb9ff44f38b372081e2d2d8fc",
  "version": 1,
  "memory_type": "entities"
}
-->