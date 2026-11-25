# Summary
2026-11-25 编排器 code_editor 主选改为 cursor/composer-2.5（套餐量大、边际消耗低，承担高频代码生成），code_edit_with_signal 的中间兜底也用 composer-2.5 而主选仍为 kimi-k3.1-pro；因 composer-2.5 有「5/6 非 JSON 坍缩」记录，仅用于代码生成池，不进 plan_reviewer/verifier/security_guard 等纯 JSON 角色。
# 2026-11-25 (Wednesday) ChatLog:
**user**: 2026-11-25 按网关现有 11 项模型清单重新分配编排器（dsh/langgraph-orchestrator/config.yaml）模型池：优先 hy4flash 免费版、其次积分版，高级任务用 grok4.7/kimi k3.1pro，composer2.5 分代码任务，并清除失效的 space-bunny 兜底 id。
...
**assistant**: ...方案：①清除全部 5 处失效 id workbuddy/space-bunny（不在网关清单），替换为免费跨通道 auto/workbuddy hy4flash-free；②code_editor 主选改 cursor/composer-2.5（套餐量大、边际消耗低，承担高频代码生成），code_edit_with_signal 中间兜底也放 composer-2.5（主选仍 kimi-k3.1-pro）；...
...
**assistant**: ...plan_review 86 分通过（审核模型 workbuddy/hy4flash-free）。注意：composer-2.5 曾有「5/6 非 JSON 坍缩」记录，故只放代码生成池（纯文本输出），不进 plan_reviewer/verifier/security_guard 等纯 JSON 角色。

<!-- MEMORY_FIELDS
{
  "event_name": "代码生成角色主选切composer2.5",
  "goal": "确定代码生成模型",
  "summary": "2026-11-25 编排器 code_editor 主选改为 cursor/composer-2.5（套餐量大、边际消耗低，承担高频代码生成），code_edit_with_signal 的中间兜底也用 composer-2.5 而主选仍为 kimi-k3.1-pro；因 composer-2.5 有「5/6 非 JSON 坍缩」记录，仅用于代码生成池，不进 plan_reviewer/verifier/security_guard 等纯 JSON 角色。",
  "ranges": "0,2,6",
  "source_extraction_id": "95c35e1e3eab47f4b910788abbebf5b7",
  "version": 1,
  "memory_type": "events"
}
-->