# Cursor MCP 权限层拦截 tdai_recall 根因
`Blocked by permissions configuration` 并非 MCP 服务器连不上，而是 Cursor 的 InteractivePermissionsService.shouldBlockMcp 在权限层直接拦截了工具调用。

## 现象
- tdai_recall 被拦截，日志显示 `shouldBlockMcp: BLOCKED (readonly mode) toolName="tdai_recall", providerIdentifier="tencentdb-memory"`。
- 报错文案 `Blocked by permissions configuration` 易误判为 MCP 服务器连接故障。

## 根因
- 根因位于 Cursor 权限层 InteractivePermissionsService.shouldBlockMcp，readonly mode 下直接拦截 tencentdb-memory 的 tdai_recall 工具。
- 与 MCP 服务器是否可达无关，是客户端权限配置层的主动拦截。

## 证据与文件
- 日志文件：C:\Users\Administrator\AppData\Roaming\Cursor\logs\20260918T090323\window1\workbench.mcp.allowlist.log（2026-09-18 10:48:05~06）
- 涉及文件：C:\Users\Administrator\AppData\Local\Programs\cursor\resources\app\extensions\cursor-agent-exec\dist\main.js、C:\Users\Administrator\.cursor、C:\Users\Administrator\AppData\Roaming\Cursor、C:\Users\Administrator\.cursor\projects\C-Users-Administrator\mcp-approvals.json、C:\Users\Administrator\.cursor\mcp.js
- 所属项目：d-repository-V3；来源会话：56762270-ca33-4cac-b4f5-48b368cd2d8d

## 关联
- 与 preferences(memory_mcp_setup) 互补：需在 .cursor/cli-config.json 的 permissions.allow 加 `Mcp(tencentdb-memory, *)` 并 Reload Window 才能解除该拦截。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_mcp权限拦截根因",
  "source_extraction_id": "158fd3ccf0e941a496ba59fe8840a41e",
  "version": 1,
  "memory_type": "entities"
}
-->