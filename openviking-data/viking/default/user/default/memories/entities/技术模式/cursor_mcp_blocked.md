# Cursor 权限层拦截 MCP 调用
Cursor 的 InteractivePermissionsService.shouldBlockMcp 在权限层直接拦截 MCP 工具调用（如 tdai_recall），并非服务器连接失败。

## 现象
- MCP 工具调用（如 tdai_recall）被拦截，日志 workbench.mcp.allowlist.log 记录 `BLOCKED (readonly mode)`。
- 表现为调用失败，易被误判为服务器连接异常。

## 根因
- 根因位于 Cursor 权限层 InteractivePermissionsService.shouldBlockMcp，直接阻塞 MCP 调用。
- 并非服务器或 MCP 连接故障，而是权限配置或 allowlist 未放行对应 providerIdentifier。

## 修复方案
- 调整 Cursor 权限配置或将对应 providerIdentifier 加入 allowlist 放行。
- 涉及配置项位于 Cursor 项目级与用户级配置（mcp.json、settings.json、hooks.json 等）。

## 验证与归属
- 所属项目：d-repository-V3
- 验证证据：extracted source=cursor project=d-repository-V3
- 验证证据：src=d-repository-V3/001.md。
- 涉及文件：C:/Users/Administrator/.cursor/projects/C-Users-Administrator/mcp-approvals.json、.cursor/mcp.json、.cursor/plans/修复_tencentdb-memory_mcp_0d60ad3b.plan.md、AppData/Roaming/Cursor/User/settings.json、.cursor/hooks.json、globalStorage/storage.json、.cursor/skills-cursor/create-hook/SKILL.md、.cursor/cli-config.json。
- 来源会话：56762270-ca33-4cac-b4f5-48b368cd2d8d；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_mcp_blocked",
  "source_extraction_id": "2db41374574b4ea093fd1cc9302aead3",
  "version": 1,
  "memory_type": "entities"
}
-->