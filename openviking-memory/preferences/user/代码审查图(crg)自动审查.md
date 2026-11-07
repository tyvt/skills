- 在 Cursor 中，当代码变更涉及 ≥3 个文件或 ≥80 行，或用户提到 review/影响范围时，Agent 优先走 CRG（代码审查图）审查。
- 全局规则文件为 ~/cursor/rules/code-review-graph-auto.mdc，对所有项目生效。
- sessionStart Hook（~/.cursor/hooks.json）每次新开 Agent 会话时检查 git diff HEAD，超过阈值则注入「请用 CRG」上下文。
- 阈值可在 C:\Users\Administrator\.cursor\hooks\crg-diff-check.py 顶部修改（FILE_THRESHOLD=3, LINE_THRESHOLD=80）。
- crg-daemon 已在运行：文件变更时自动更新代码图。
- 完全无人值守 review（改完代码 Agent 自动弹出 review）Cursor 无原生能力，暂不支持。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "代码审查图(CRG)自动审查",
  "source_extraction_id": "d93dd562d6324719bb258aed4b224de0",
  "version": 1,
  "memory_type": "preferences"
}
-->