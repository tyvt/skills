# 编排器模型路由与 token 成本发现
magpie/workbuddy 多模型编排中 grok-4.7 的 execute 角色实为 plan_review，真实命令执行由 deepseek-v4.1-flash 承担，grok 的额外成本主要来自安全守卫升级。

## 模型角色分布
- 编排器 plan 主选 workbuddy/hy3；grok-4.7 仅做 plan_review 兜底（AGENTS.md 强制 reviewer=grok-4.7）
- 真实命令执行 execute 由 orchestrator/workbuddy/deepseek-v4.1-flash 承担（约 110 prompt / 数百 completion），成本极低
- summarize 用 deepseek-v41-flash-1017，generate_command/guard_fast 用 deepseek-v4.1-flash
- magpie 主模型为 workbuddy/glm-5.3-flash（输入 2.62M，缓存读 2.54M，命中率 97%）

## 成本问题根因
- grok-4.7 共 14.2k tokens，约一半是策略要求的计划审核，另一半是 2 次 guard 升级（≈3.5k）
- flash 守卫（guard_fast）对纯只读 Get-Content 命令拿不准而升级到 grok 终审，最后仅 ALLOW 了两条无害只读命令
- 每个 op=full 有多个 pwsh 步骤就可能多次升级，造成重复 grok 消耗

## 优化建议（未落地）
- guard_fast 升级判据收紧 + 只读命令白名单（Get-Content/Get-ChildItem/Select-String 直接放行或缓存 verdict）
- guard prompt 瘦身：精简 deny_regex 与安全规则说明到几百 token
- plan_review 只送计划 diff 而非全文重审，避免多轮返工重审
- 数据口径：langgraph-orchestrator .sessions/*.costs.jsonl，经 GET /api/token-models/orchestrator-usage 读取

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "orchestrator_model_routing",
  "source_extraction_id": "04bff08ec7374cb1a16d58fecabe3c7d",
  "version": 1,
  "memory_type": "entities"
}
-->