# plan_review_chain
DSH orchestrator 的多步计划审批链，由 dsh/AGENTS.md "Plan Review" 章节要求。

## 触发方式
- orchestrate 工具的 op 枚举仅 full|tool|list，无独立 plan_review op。
- 通过 op:"full" 将完整计划文本内联触发（PLAN_REVIEW 语境）。
- planner 为纯文本模型无磁盘访问，计划文本必须内联。
- 内联计划超过 api.py:299 的 PLAN_REVIEW_CLIP_CHARS 会触发 "plan exceeds review size limit" 保护导致编排失败；正常尺寸计划或直连 `python -m src.jsonbridge` 均正常。

## 链路结构
- planner 产出初始计划（历史曾观测 planner 池 workbuddy/deepseek-v4.1-flash 单点故障重试 ~100s×2 后降级 glm-5.3-flash）。
- plan_reviewer 审核计划；当前池（2026-11-13 19:38 配置）：`cursor/grok-4.7@256k` → `workbuddy/deepseek-v4.1-flash` → `auto/deepseek-v4.1-flash`，max_tokens:8192，timeout:300。
- glm-5.3-flash 产出最终摘要。

## 耗时与可靠性（2026-11-13 排查结论）
- 各步通常 20~70s，全链 1~3min；历史 .costs.jsonl 记录多数为 ok:true。
- grok 基线开销约 deepseek 的 11 倍（单字回复 15.1s vs 1.4s），随 token 线性放大（大计划 173.8s ≈ 11ms/token），但从未失败。
- 历史聚合（75 会话 cost 日志）：grok 8 调用 8 成功 0 失败（29.7s~173.8s）；deepseek 系 72 调用全成功。
- 11-12 的 10 次 plan_review 失败（model=null, ok=false）根因是当时 max_tokens:2048 → DeepSeek reasoning 耗尽预算 → 502 empty reply，已于 11-13 配置升至 8192 修复；11-13 全天零失败。
- "grok 超时无响应"反馈实为 grok 高延迟被误读，非可靠性故障；用户 2026-11-13 决定保持 grok 首选不动。
- 2026-11-14 用户审计误判 grok 已停用（称吞吐约 1.1 tok/s 且停用），核 config.yaml:159-162 确认 grok 为 2026-11-13 controller-bench 路由 1.00/总分 0.90 最高之有意首选，非配置漂移；用户明示「grok 审核还是要的」，当日优化方案保留 grok 首位不动模型池

## 三池复验（2026-11-13 重启后）
- plan_reviewer 池首位 `cursor/grok-4.7@256k` 复验确认，端到端真实 plan_review 实测审核模型为 grok-4.7@256k，verdict PASS，route 1.00
- security_guard 仅 `workbuddy/deepseek-v4.1-flash` 单模型，fail-closed
- planner 池 `codex/gpt-6-luna` → `gpt-5.6-luna` → `deepseek-v4.1-flash`（2026-11-13 改，gpt-6-luna 首选已生效，活体验证 `plan via codex/gpt-6-luna`），带「一步聚合」约束，冒烟验证 1 步输出；遗留监控项：planner 若出现「计划含不存在工具」漂移触发重测

<!-- MEMORY_FIELDS
{
  "category": "mechanism",
  "name": "plan_review_chain",
  "source_extraction_id": "a2db3a6730df41a3af43f4122e55dcfb",
  "peer_id": "github.com-tyvt-skills",
  "version": 7,
  "memory_type": "entities"
}
-->