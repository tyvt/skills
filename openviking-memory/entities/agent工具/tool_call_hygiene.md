# tool-call-hygiene
tool-call-hygiene 是 agent 工具调用自愈规范，包含 SKILL.md 与 dsh/AGENTS.md。

## 规范内容
- 空参数连续出现 2 次则切换会话
- session_search 超时则缩小范围改走 context-mode
- worktree 路径相关自愈处理

## 归属验证
- 来源：2026-11-09 agent 运维报告
- 随提交 c7f682f5 合入 main

<!-- MEMORY_FIELDS
{
  "category": "agent工具",
  "name": "tool_call_hygiene",
  "source_extraction_id": "ddc362a949994fcb96dea1093973f741",
  "version": 1,
  "memory_type": "entities"
}
-->