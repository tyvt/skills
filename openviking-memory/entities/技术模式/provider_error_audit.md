# Provider 错误监控与审计修复
2026-11-09 发现 magpie/workbuddy/hy4free 通道供应商错误终结多轮对话，已修复审计与护栏统计口径。

## 现象
- 37 个 turn/end 中 12 个（32.4%）被供应商错误终结，全部集中在 10–12 时、全部跑在 magpie/workbuddy/hy4free 通道（23/24 会话）
- 失败在会话内连续复发：082ae4a7 4/5 轮、154d41f8 2/2、9429e069 2/2，原地继续几乎必再挂
- 7 次 PI_AI_ERROR + 5 次 MALFORMED_RESPONSE（mcp_gateway 工具参数 JSON 被截断）
- 失败轮 inputTokens 均值 67K 低于成功轮 93K，多个失败轮 0 次工具调用即断，指向 magpie 通道不稳而非 Hy4 模型本身

## 护栏缺口
- 12 个失败轮全部不带 llm/retry 事件，内建重试与 dsh-agent-guard 的 planRecovery 都不触发
- 旧 audit.mjs 只统计 llm/retry 导致漏报（报表显示 5 次，实际 12+ 次）

## 修复落地
- audit.mjs / morning-report.mjs 纳入 turn/end reason.kind=error，新口径供应商失败 18 = PI_AI_ERROR 7 + MALFORMED_RESPONSE 6 + TRANSPORT 5
- AGENTS.md 第 11 条扩到 finish_reason:error（连出 2 次立即新开会话/换 provider）、新增第 13 条 mcp_gateway 大参数拆小
- 在独立 worktree skills-wt-finish-reason-20261109（技能库 D:/repository/skills）改 3 文件，提交 dcafe1fa 已 fast-forward 合并 main 并删除 worktree，按用户决定未推送（main 领先 origin/main 2 个提交：c7f682f5、dcafe1fa）
- 用户选择模型暂不换、先观察
- 专项报告见 C:/Users/Administrator/.dsh/reports/provider-finish-reason-2026-11-09.md；一次性分析脚本 finish-reason-scan.mjs、finish-reason-detail.mjs、finish-reason-context.mjs 保留在 ~/.dsh/reports/

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "provider_error_audit",
  "source_extraction_id": "4e6b8b0730b7416da48d56a1da50430b",
  "version": 2,
  "memory_type": "entities"
}
-->