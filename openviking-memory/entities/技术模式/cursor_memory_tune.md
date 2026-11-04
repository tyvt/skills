# Cursor 因宽泛索引和 TS 服务消耗大量内存
项目 苏州市房地产监测V3 在 Cursor 编辑器中因语言和索引服务配置不当导致内存消耗过高。

## 原因与调整
- 过度的内存消耗来自于 TS server 限制过高、索引宽泛以及冗余的 MCP
- settings.json: maxTsServerMemory/maxOldSpaceSize 从 8192 降低到 2048
- mcp.json: 移除了 chrome-devtools MCP 进程
- jsconfig.json: include 限制为 src/**/* 并创建了 .cursorignore 以排除 node_modules/, dist/ 等

## 涉及的文件
- vite.config.js, mcp-servers.json, extensions.json, package.json (根目录和 zhi2-web-admin), jsconfig.json, settings.json, mcp.json

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/177.md 和 src=苏州市房地产监测V3-rest/144.md
- 来源会话: 5d1c2a9f-7bac-4b86-936c-8870cfdb6c90
- 所属项目: 苏州市房地产监测V3; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_memory_tune",
  "source_extraction_id": "637076c2ee6643d5b35f55f28e70f356",
  "version": 2,
  "memory_type": "entities"
}
-->