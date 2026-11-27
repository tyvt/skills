# OpenViking服务端
OpenViking 服务端是提供 MCP 工具接口（含 rule_search）的守护进程，DSH 记忆插件通过其 /mcp 透传调用。

## 角色与架构
- 作为守护进程暴露 MCP 工具，DSH MCP 代理（mcp-proxy.mjs）纯透传 OPENVIKING_MCP_URL
- 插件 dsh-memory-plugin 0.5.33 仅做代理，工具清单由服务端 build 决定
- 服务端升级后工具列表自动重新同步，无需插件发版
- 启动链路：start-server.bat 第 22 行经 wscript.exe 调用 start-server-bat-hidden.vbs（窗口样式 0）隐藏拉起，2026-11-24 起拉起全程无 cmd 窗口

## 关键事实
- 安装位置：C:\Program Files\Python310\Scripts\openviking-server.exe（Python 包 openviking）
- 配置文件：C:\Users\Administrator\.openviking\ov.conf，服务端级设置须置于 server 段下
- 数据目录：~/.openviking/data（含记忆/规则/上下文向量库与 usage_audit 审计库）
- rule_search 需服务端 build 在 /mcp 通告；0.5.3 无此工具，0.5.5 在 mcp_endpoint.py:814 定义
- 2026-11-14 由 0.5.3 升级至 0.5.5

## 已知问题
- 0.5.x 公开版 usage_audit sqlite schema 为 v5，若磁盘审计库已是 v6 会拒启
- 修复：在 ov.conf 的 server 段设 observability.usage_audit.enabled=false，仅关用量审计遥测，不动记忆/规则数据

## 检索帮助度埋点
- 2026-11-27 完成 v6→v7 迁移：`_schema_meta.version=7`，新增 `retrieval_help_audit` 表（含 uri/score/adopted/reworked 等 10 列），旧数据未重置（request_audit 2311 行）
- HTTP `POST /api/v1/search/search`（非 `/api/v1/search`）触发审计：search handler 写 `request.state.retrieval_result_uris/scores`，middleware 落库；探针落 3 行（request_id + viking:// URI + score≈0.82）
- MCP 工具调用走 `src.jsonbridge` 进程，不经过打补丁的 HTTP 审计链路，不触发埋点
- 6 个埋点补丁文件已提交 `4d4bc2af` 并推送 origin/main（2026-11-27；推送曾因 github.com DNS 劫持到 57.155.223.240 失败，网络恢复后直推成功）；服务 `/health` HTTP 200、v0.5.5、端口 1933 单实例
- 未完成：插件 adopted/reworked 上报闭环——服务端 projection 硬编码 0、无信号摄入路径，需新计划（服务端端点+插件上报+幂等）与人工确认，已交接 hop3

<!-- MEMORY_FIELDS
{
  "category": "OpenViking系统",
  "name": "openviking_server",
  "source_extraction_id": "31ac6f048fda409db5a9ad5cc28fbf33",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->