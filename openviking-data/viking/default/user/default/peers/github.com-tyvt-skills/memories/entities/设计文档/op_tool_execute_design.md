# op:tool 真执行设计方案
2026-11-12 由 P3 评估产出的设计文档（仅方案未实现），路径 langgraph-orchestrator/docs/op-tool-execute-design.md。

## 核心结论
- op:"tool" 若真执行须复用 op:"full" 同一条审查执行链：generate_command → security_guard_fast → (escalate) security_guard → _run_pwsh
- 绝不可开绕过 security_guard 的旁路

## 推荐方案
- 方案 A：api.run_tool 对 guarded_tool 构造单步 plan，复用 node_security_guard + node_execute，审查链零重复

## 六条红线
- 不可绕过 security_guard；mock 开关一致；guarded_tools 一致；deny_regex/白名单一致
- 超时用 pwsh_timeout；执行必须写 .costs.jsonl 账单

## 落地建议
- 先用 P0 主动选型规则观察，若仍频发误投再实施方案 A

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "设计文档",
  "name": "op_tool_execute_design",
  "source_extraction_id": "6de2f8cc610942dfb5a44f5af0b32beb",
  "version": 1,
  "memory_type": "entities"
}
-->