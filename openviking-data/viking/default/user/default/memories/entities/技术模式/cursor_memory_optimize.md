---
audit_status: invalid
last_checked: 2026-11-28T01:17:29+08:00
verdict_note: 记忆称 jsconfig 保留 checkJs-true 及 maxTsServerMemory 8192→2048/.cursorignore 等；实际 jsconfig.json checkJs-false，IDE 全局配置不在代码仓无法证明，描述与现状不符。
---
# Cursor内存占用优化
苏州市房地产监测V3 开发环境下对 Cursor IDE 进行内存占用优化的一系列配置调整。

## 修改内容
- `settings.json` 中 `maxTsServerMemory` / `maxOldSpaceSize` 由 8192 改为 2048
- 从 `mcp.json` 移除 chrome-devtools MCP
- `zhi2-web-admin/jsconfig.json` 增加 `include: ["src/**/*"]`，`exclude` 增加 `e2e`、`report`，保留 `checkJs: true`
- 项目根创建 `.cursorignore` 排除 `node_modules/`、`dist/`、`report/` 等
- 结束闲置进程（如「公租房G」项目）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`settings.json`、`mcp.json`、`jsconfig.json`、`.cursorignore`
- 所属项目：苏州市房地产监测V3；来源会话：5d1c2a9f-7bac-4b86-936c-8870cfdb6c90；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_memory_optimize",
  "source_extraction_id": "366a442c32ce460e8f96d6df14fbd0d7",
  "version": 1,
  "memory_type": "entities"
}
-->