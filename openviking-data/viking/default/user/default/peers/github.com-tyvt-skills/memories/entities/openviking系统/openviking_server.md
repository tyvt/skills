# OpenViking服务端
OpenViking 服务端是提供 MCP 工具接口（含 rule_search）的守护进程，DSH 记忆插件通过其 /mcp 透传调用。

## 角色与架构
- 作为守护进程暴露 MCP 工具，DSH MCP 代理（mcp-proxy.mjs）纯透传 OPENVIKING_MCP_URL
- 插件 dsh-memory-plugin 0.5.33 仅做代理，工具清单由服务端 build 决定
- 服务端升级后工具列表自动重新同步，无需插件发版

## 关键事实
- 安装位置：C:\Program Files\Python310\Scripts\openviking-server.exe（Python 包 openviking）
- 配置文件：C:\Users\Administrator\.openviking\ov.conf，服务端级设置须置于 server 段下
- 数据目录：~/.openviking/data（含记忆/规则/上下文向量库与 usage_audit 审计库）
- rule_search 需服务端 build 在 /mcp 通告；0.5.3 无此工具，0.5.5 在 mcp_endpoint.py:814 定义
- 2026-11-14 由 0.5.3 升级至 0.5.5

## 已知问题
- 0.5.x 公开版 usage_audit sqlite schema 为 v5，若磁盘审计库已是 v6 会拒启
- 修复：在 ov.conf 的 server 段设 observability.usage_audit.enabled=false，仅关用量审计遥测，不动记忆/规则数据

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "OpenViking系统",
  "name": "openviking_server",
  "source_extraction_id": "1b7f0841444c44109560e3b342fe9ec1",
  "version": 1,
  "memory_type": "entities"
}
-->