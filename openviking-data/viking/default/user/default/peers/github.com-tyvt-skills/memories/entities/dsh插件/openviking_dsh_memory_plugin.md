# @openviking/dsh-memory-plugin
DSH 记忆插件（v0.5.33），通过 MCP 客户端将 OpenViking 记忆能力接入 DSH，同时无条件挂载 24 个 MCP 工具到模型工具目录。

## 描述
- 注册表依赖 `@openviking/dsh-memory-plugin@0.5.33`，安装于 profile 的 node_modules（非 file: 本地链接）
- 外部 MCP 服务端点 `127.0.0.1:1933`，记忆 capture/recall/commit 走 HTTP 端点，与工具面独立

## 关键事实
- `index.mjs:113` 的 `mountOpenVikingMcp(ctx, config)` 无条件执行，将 24 个 `mcp__openviking__*` 工具全量挂入模型工具目录
- 插件无配置开关（`disableToolSurface`/`toolFilter` 均不存在），无法经 yml 关闭或过滤工具面
- 2026-11-13 实测：24 个工具 JSON schema 合计 33,790 bytes ≈ 8.4k–9.7k tokens，占 dsh standard preset 工具目录 tokens(16,327) 约 52%
- 记忆 capture/recall/commit/skills 由 runtime.mjs/client.mjs/skills.mjs 经 HTTP 端点处理，剥离工具面不影响记忆功能

## 关系
- 与 dsh-mcp-gateway 同类问题：dbx/context-mode 已被 gateway 收编为单入口，openviking 却仍直连常驻
- 优化路径：经 pnpm patch 改插件或上游加开关，再纳入 mcp-gateway

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "DSH插件",
  "name": "openviking_dsh_memory_plugin",
  "source_extraction_id": "6cead5f3b0314ebd8c74ed045ff09064",
  "version": 1,
  "memory_type": "entities"
}
-->