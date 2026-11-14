- 执行类任务（跑命令/构建/检索/读大文件/改代码）一律使用 orchestrate {op:"full"}，因其真实执行 _run_pwsh
- op:"tool" 仅做纯文本加工，绝不执行命令、构建或读盘
- 选型须主动判断，不能依赖 gate 拒绝提示纠正：主模型若一开始就选 op:"tool" 不会触发 gate，故规则以 AGENTS.md 与规范主动约束
- 计划审核（plan_review）经 orchestrate op:"full" 内联完整计划文本触发（op 枚举仅 full|tool|list，无独立 plan_review op）；reviewer 池首选 grok-4.7@256k（cursor 已于 2026-11-12 移除）；纯文本直接提交计划内容做审核可用 op:"tool" 规避 reviewer 读盘卡住问题

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "编排器 op 选型策略",
  "source_extraction_id": "a2db3a6730df41a3af43f4122e55dcfb",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "preferences"
}
-->