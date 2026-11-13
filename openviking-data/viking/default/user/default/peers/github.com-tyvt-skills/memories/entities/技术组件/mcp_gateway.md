# mcp-gateway
DSH 的 mcp-gateway 组件，作为 MCP 工具的单入口网关。

## 描述
- 仅支持 stdio server（config.js:35 已核验）
- 通过 cordis.patch.yml 的 servers: 块注册子 server

## 行为
- 以 env: process.env（dsh 宿主环境）spawn stdio 子进程（stdio.mjs:42）
- server 配置位于 ~/.dsh/mcp-gateway/cordis.patch.yml 的 servers: 块

## A-1 集成
- 2026-11-13 计划在 servers: 加 openviking server（绝对路径解析加 stdio proxy mcp-proxy.mjs）
- 风险：单一 gateway-spawned proxy 为单进程单 peer，per-session peer 隔离可能退化（auth_mode:dev 下尤甚）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术组件",
  "name": "mcp_gateway",
  "source_extraction_id": "ef9f0cb5ce064fa8b070ffe80682fc15",
  "version": 1,
  "memory_type": "entities"
}
-->