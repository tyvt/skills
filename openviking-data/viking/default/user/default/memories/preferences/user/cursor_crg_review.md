- Cursor 无原生完全无人值守代码审查能力（改完代码 Agent 自己弹 review 不可行）。
- 用户依赖全局规则 `~/.cursor/rules/code-review-graph-auto.mdc`：在 ≥3 文件或 ≥80 行变更、或提到 review/影响范围时，Agent 优先走 CRG。
- 已配置 `sessionStart` Hook `~/.cursor/hooks.json`：每次新开 Agent 会话检查 `git diff HEAD`，超阈值注入「请用 CRG」上下文。
- 阈值在 `C:\Users\Administrator\.cursor\hooks\crg-diff-check.py` 顶部设置：`FILE_THRESHOLD = 3`、`LINE_THRESHOLD = 80`。
- crg-daemon 已在跑：文件变更时自动更新代码图。
- tencentdb-memory（记忆 MCP）也提供 Code_G 代码图能力，可与 CRG 配合用于代码审查。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "cursor_crg_review",
  "source_extraction_id": "a43fe14465934de181b8a03d18d22854",
  "version": 3,
  "memory_type": "preferences"
}
-->