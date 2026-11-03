# Cursor 不可不限服务且广索引否则内存高
苏州市房地产监测V3 项目下 Cursor 编辑器因服务与索引配置不当致内存占用过大，需调优。

## 描述
- Cursor 内存占用过大因 TS 语言服务内存上限高、索引范围广及冗余 MCP
- settings.json 将 maxTsServerMemory/maxOldSpaceSize 由 8192 改 2048
- mcp.json 移除 chrome-devtools MCP
- jsconfig.json 收窄 include 并建 .cursorignore 排除 node_modules/ 等

## 涉及文件
- vite.config.js
- C:/Users/Administrator/.cursor/mcp-configs/mcp-servers.json
- C:/Users/Administrator/.cursor/extensions/extensions.json
- d:/repository/苏州市房地产监测V3/package.json、zhi2-web-admin/package.json
- zhi2-web-admin/jsconfig.json、C:/Users/Administrator/AppData/Roaming/Cursor/User/settings.json
- C:/Users/Administrator/.cursor/mcp.json

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/144.md
- 来源会话：5d1c2a9f-7bac-4b86-936c-8870cfdb6c90
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_memory_tune",
  "source_extraction_id": "f03252ab12034d9281cc6024c18c407b",
  "version": 1,
  "memory_type": "entities"
}
-->