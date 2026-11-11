# MCP 工具白名单热改致工具失联
在运行中的 DSH 会话里热改 MCP 工具白名单，会导致当前会话工具瞬间“失联”且需新开会话才能恢复。

## 问题现象
- seq 150 将 OPENVIKING_MCP_TOOL_ALLOW 改为 search,find,read,remember,write
- seq 155 调 mcp__openviking__write 报 Error: Connection closed
- seq 156 调 mcp__openviking__remember 报 Error: unknown tool "mcp__openviking__remember"
- seq 169 改回原白名单后 seq 184 仅 find/read/search 回归，remember 与 write 在当前会话被永久踢出

## 根因
- MCP 代理的 tools/list 在客户端（DSH）启动或重连时拉取
- 热改子进程环境变量后，当前会话 MCP 客户端不会重新拉取工具列表
- 代理拒接新工具，而旧工具可能已被替换掉一起消失

## 解决方案
- 不要在运行中的会话改 MCP 工具白名单；应改好所有白名单后直接开新会话
- 若必须在当前会话修，改完后在 AGENTS.md 写：工具报 UNKNOWN_TOOL 先检查是否刚改了 MCP 工具清单，必要时说明需重启会话
- 当前会话已失联的工具（如 remember/write）只能绕开 MCP，用 pwsh 直接调 HTTP API 完成写入

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mcp_whitelist_bug",
  "source_extraction_id": "44169de4e09840858832c49fc20e75b2",
  "version": 1,
  "memory_type": "entities"
}
-->