# Summary
用户于 2026-11-09 要求 agent 在排查/修复/设计方案前先查记忆，agent 据此在 ~/.dsh/AGENTS.md（符号链接至 D:epository\skills\dsh\AGENTS.md）的 OpenViking 主动检索段新增默认原则：先主动 search（mode=context, purpose=coding）看是否处理过类似问题，命中则 read 展开并优先沿用，查不到才自行排查并将新结论写回记忆；并明确“查到有用信息”的判定标准（同项目/同文件/同报错且 detail 为 overview/full 才算查到，仅 abstract 或无关视为未找到）。
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 我希望他能主动去做这件事，先查记忆有没有处理过类似的问题，如果没有查到有用的信息再自己排查和思考方案。
**assistant [peer=deepseek-harness-default-workspace]**: 明白了——你要的是把"**先查记忆、查不到再自行排查**"变成 agent 的**默认行为**，而不是要你每次提醒。这最好固化成一条 agent 规则（写进每次会话都会加载的 `~/.dsh/AGENTS.md`），同时我也把它作为偏好落进 OpenViking 记忆本身，双保险。

先看一下当前 AGENTS.md 里那段记忆规则的确切写法，再精准插入。
...
**assistant [peer=deepseek-harness-default-workspace]**: 成本提醒收到——刚才那次整读是必要的（要拿到精确文本做修改），接下来不再整读大文件。我已经有第 14–20 行的精确内容，直接改那段"主动检索"规则。

核心改动：把"先查记忆、查不到再自行排查"提为**默认原则**，不再依赖你给禅道 ID 或显式提醒。
...
**assistant [peer=deepseek-harness-default-workspace]**: 已落地。我把这条"**先查记忆、查不到再自行排查**"提升为 [AGENTS.md](<file is external: `~/.dsh/AGENTS.md`, symlinked to `D:\repository\skills\dsh\AGENTS.md`>) 里 OpenViking 主动检索段的**默认原则**，而不再是"给你禅道 ID / 你显式问起"才触发。今后每次会话加载系统提示时都会带上这条，长期生效。

具体新增的默认原则（已写入）：

> **默认原则：先查记忆，再自行排查。** 每当准备排查问题、修复 bug、设计实现方案或给出建议之前，先主动 `search`（`mode=context`，`purpose=coding`）一次，看 OpenViking 里是否处理过类似问题；命中则 `read` 展开细节并优先沿用；只有确认记忆里没有有用信息（或命中项只是无关摘要）时，才自行排查、思考方案。这是默认动作——不必等用户提醒，也不必非要有禅道 ID / bug 号 / 明确模块路径才查。

并补了一条"是否查到有用信息"的判定标准：注入块或搜索结果里存在**同项目/同文件/同报错语义高度相关**且 `detail` 为 `overview`/`full` 的条目才算"查到"；只有标题级摘要（`abstract`）或无关的，视为未找到、继续自行排查并把新结论写回记忆。

这与你上一轮担心的完全对应：之前记忆只在"被动注入 + 语义命中"时才出现，且不展开细节就容易"不知道查过没查过"；现在改成**默认先主动搜一遍并展开细节**，把"该不该查"从可选变成必选。

这次改动落在 `D:\repository\skills\dsh\AGENTS.md`（即 `~/.dsh/AGENTS.md`，属于 `tyvt/skills` 这个 Git 仓库，是 agent 规则文件，按约定走"就地改 + 提交"而非 worktree）。按全局规则，收尾前需要你定一下是否入库：

<!-- MEMORY_FIELDS
{
  "event_name": "AGENTS.md新增主动检索默认原则",
  "goal": "固化先查记忆默认原则",
  "summary": "用户于 2026-11-09 要求 agent 在排查/修复/设计方案前先查记忆，agent 据此在 ~/.dsh/AGENTS.md（符号链接至 D:\repository\\skills\\dsh\\AGENTS.md）的 OpenViking 主动检索段新增默认原则：先主动 search（mode=context, purpose=coding）看是否处理过类似问题，命中则 read 展开并优先沿用，查不到才自行排查并将新结论写回记忆；并明确“查到有用信息”的判定标准（同项目/同文件/同报错且 detail 为 overview/full 才算查到，仅 abstract 或无关视为未找到）。",
  "ranges": "0,1,3,5",
  "source_extraction_id": "4ada5525be5b4b738c21f776639b2af4",
  "version": 1,
  "memory_type": "events"
}
-->