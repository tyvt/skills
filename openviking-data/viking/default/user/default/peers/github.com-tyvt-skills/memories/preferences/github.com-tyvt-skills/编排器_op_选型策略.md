- 执行类任务（跑命令/构建/检索/读大文件/改代码）一律使用 orchestrate {op:"full"}，因其真实执行 _run_pwsh
- op:"tool" 仅做纯文本加工，绝不执行命令、构建或读盘
- 选型须主动判断，不能依赖 gate 拒绝提示纠正：主模型若一开始就选 op:"tool" 不会触发 gate，故规则以 AGENTS.md 与规范主动约束
- 计划审核用 orchestrate 的独立 `op:"plan_review"`（op 枚举含 full|tool|list|plan_review），送审用 `plan_path` 指向 D:\plan\<工作区>\<sessionId>.md（AGENTS.md 禁止手打整篇正文）；reviewer 池首选 `cursor/grok-4.7@256k`（2026-11-26 op:list 实机复核仍在位，旧记忆「cursor 已移除/无独立 plan_review op」已作废）

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->