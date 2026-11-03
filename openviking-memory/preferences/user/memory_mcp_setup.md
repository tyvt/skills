- For local deployment of TencentDB Memory MCP, add `"Mcp(tencentdb-memory, *)"` to `permissions.allow` in `.cursor/cli-config.json` and Reload Window to grant access.
- Update `.cursor/rules/tencentdb-memory.mdc` with `alwaysApply: true`, set `session_key` to the workspace name, and run `tdai_recall` every round.

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "memory_mcp_setup",
  "source_extraction_id": "f728201d4e1f4b3ea1fe133a83f6b344",
  "version": 1,
  "memory_type": "preferences"
}
-->