# Summary
已为 Cursor 全局配置 CRG（Code Review Graph）自动审查：全局规则 ~/.cursor/rules/code-review-graph-auto.mdc 规定在 ≥3 个文件或 ≥80 行变更、或提到 review/影响范围时优先走 CRG；sessionStart Hook ~/.cursor/hooks.json 在每次新开 Agent 会话时检查 git diff HEAD，超过阈值则注入「请用 CRG」上下文；阈值可在 C:\Users\Administrator\.cursor\hooks\crg-diff-check.py 顶部通过 FILE_THRESHOLD 与 LINE_THRESHOLD 修改。当前 crg-daemon 已在运行，文件变更时自动更新代码图，改动大时自动调 MCP 且只看相关文件；完全无人值守 review 因 Cursor 无原生能力暂不可行。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】preference
【标题】我看tencentdb-memory也有Code_G
【内容】可以，但要说清楚边界： ## 能自动什么、不能自动什么 | 层级 | 行为 | 状态 | |------|------|------| | **crg-daemon** | 文件变更时自动更新代码图 | ✅ 已在跑 | | **Agent 自动走 CRG 审查** | 改动大时自动调 MCP、只看相关文件 | ✅ 刚配好（见下） | | **完全无人值守 review** | 改完代码 Agent 自己弹 review | ❌ Cursor 无此原生能力 | ## 已为你配置（全局，所有项目生效） 1. **全局规则** `~/.cursor/rules/code-review-graph-auto.mdc` Agent 在 **≥3 文件** 或 **≥80 行** 变更、或你提到 review/影响范围时，优先走 CRG。 2. **sessionStart Hook** `~/.cursor/hooks.json` 每次新开 Agent 会话时检查 `git diff HEAD`；超过阈值则注入「请用 CRG」的上下文。 阈值可在 `C:\Users\Administrator\.cursor\hooks\crg-diff-check.py` 顶部修改： ```python FILE_THRESHOLD = 3 LINE_THRESHOLD = 80 ``` ## 实际效果 
【验证证据】extracted source=cursor project=d-repository
【涉及文件】`~/.cursor/hooks.js ; 涉及文件：C:\Users\Administrator\.cursor\projects\d-repository\uploads\code-review-graph-0.md、C:\Users\Administrator\.cursor\mcp.js
【所属项目】d-repository
【来源会话ID】5aa352f0-b2f8-4e43-b5b9-53a9a6793268
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "配置 CRG 自动审查",
  "goal": "配置自动审查",
  "summary": "已为 Cursor 全局配置 CRG（Code Review Graph）自动审查：全局规则 ~/.cursor/rules/code-review-graph-auto.mdc 规定在 ≥3 个文件或 ≥80 行变更、或提到 review/影响范围时优先走 CRG；sessionStart Hook ~/.cursor/hooks.json 在每次新开 Agent 会话时检查 git diff HEAD，超过阈值则注入「请用 CRG」上下文；阈值可在 C:\\Users\\Administrator\\.cursor\\hooks\\crg-diff-check.py 顶部通过 FILE_THRESHOLD 与 LINE_THRESHOLD 修改。当前 crg-daemon 已在运行，文件变更时自动更新代码图，改动大时自动调 MCP 且只看相关文件；完全无人值守 review 因 Cursor 无原生能力暂不可行。",
  "ranges": "0-5",
  "source_extraction_id": "04896cf780f2427a8dbc38fa9bd80cf3",
  "version": 1,
  "memory_type": "events"
}
-->