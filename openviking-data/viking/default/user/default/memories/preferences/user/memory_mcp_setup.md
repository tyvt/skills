- 本地部署 TencentDB Memory MCP 时，在 `.cursor/cli-config.json` 的 `permissions.allow` 加入 `"Mcp(tencentdb-memory, *)"` 并执行 Reload Window 以放行记忆工具（当前 Agent 下 `tdai_recall` 已测通）。
- 更新 `.cursor/rules/tencentdb-memory.mdc`（`alwaysApply: true`）：`session_key` 设为工作区文件夹名，每轮先 `tdai_recall` 再可选 `tdai_conversation`。
- Gateway 健康检查地址为 http://127.0.0.1:8420/health，返回 `status: ok` 表示服务正常。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "memory_mcp_setup",
  "source_extraction_id": "4ce75dffad3245d6bcb9c5e5af572229",
  "version": 2,
  "memory_type": "preferences"
}
-->