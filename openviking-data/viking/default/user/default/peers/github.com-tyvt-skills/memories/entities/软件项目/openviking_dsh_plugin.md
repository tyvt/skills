# @openviking/dsh-memory-plugin
OpenViking 记忆插件（registry 版本 0.5.33，pnpm hoisted），为 DSH 提供 OpenViking MCP 工具与记忆能力。

## 描述
- registry 版本 0.5.33，以 pnpm 安装并 hoist
- 提供 24 个 OpenViking 工具（list/search/find/read/remember 等）
- 含 servers/mcp-proxy.mjs（合规 stdio MCP server）

## 结构
- index.mjs 的 apply(ctx, input) 接收原始 input；resolveConfig 经 buildPluginConfig 校验会剥离未知字段
- mountOpenVikingMcp(ctx, config) 在 index.mjs:113 被无条件调用（A-1 前）
- 配置含 recallPeerScope: actor，按会话隔离 peer

## Proxy 组件
- servers/mcp-proxy.mjs 是合规 stdio MCP server（2026-11-13 实测：initialize 返回 serverInfo openviking 1.29.0，tools/list 返回 24 工具）
- mcp-proxy-core.mjs start() 于 line 500 读 stdin 写 stdout
- 凭证从 ~/.dsh/ov.conf 与 ~/.dsh/ovcli.conf 经 loadCredentialFiles 读取（文件型，不依赖 dsh 注入 env）

## A-1 补丁
- 2026-11-13 经 pnpm patch 改 index.mjs：mountOpenVikingMcp 改受原始 input.toolSurface 控制（默认 direct 向后兼容；off 时不挂载改走 mcp-gateway）
- 补丁记录于 pnpm-workspace.yaml patchedDependencies 与 patches/@openviking__dsh-memory-plugin@0.5.33.patch
- A-1 阶段 toolSurface 合法值仅 direct|off；gateway 为 A-2 预留

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "软件项目",
  "name": "openviking_dsh_plugin",
  "source_extraction_id": "ef9f0cb5ce064fa8b070ffe80682fc15",
  "version": 1,
  "memory_type": "entities"
}
-->