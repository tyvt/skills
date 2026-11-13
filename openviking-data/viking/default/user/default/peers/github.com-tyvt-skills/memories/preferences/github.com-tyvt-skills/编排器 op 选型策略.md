- 执行类任务（跑命令/构建/检索/读大文件/改代码）一律使用 orchestrate {op:"full"}，因其真实执行 _run_pwsh
- op:"tool" 仅做纯文本加工，绝不执行命令、构建或读盘
- 选型须主动判断，不能依赖 gate 拒绝提示纠正：主模型若一开始就选 op:"tool" 不会触发 gate，故规则以 AGENTS.md 与规范主动约束
- 计划审核类任务应使用 op:"plan_review"（reviewer 池首选 grok-4.7@256k，cursor 已于 2026-11-12 移除），切勿误用 op:"full"；若以纯文本直接提交计划内容做审核，可用 op:"tool" 规避 reviewer 读盘卡住的问题

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "编排器 op 选型策略",
  "source_extraction_id": "26da6062875b4822b8d43b0ca2658d1e",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "preferences"
}
-->