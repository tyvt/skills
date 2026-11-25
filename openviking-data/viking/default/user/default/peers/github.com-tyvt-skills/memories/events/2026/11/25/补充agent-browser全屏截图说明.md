# Summary
2026-11-25，用户要求 agent-browser 截图使用全屏并补充到 md 文档；助手在 agent-browser/SKILL.md 新增「Screenshots (verification)」小节，说明默认 screenshot 仅截视口、前端验证证据须用 --full / -f 全页截图并输出到 %TEMP% 带时间戳路径，指向 screenshot --help 且与 AGENTS.md 前端验证门一致；仓库仅 Markdown 未跑构建，未同步到 ~/.dsh 副本。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: agent-browser截图要截全屏，你补充到md文档
...
**assistant [peer=github.com-tyvt-skills]**: 在仓库内的 [agent-browser/SKILL.md](agent-browser/SKILL.md) 补充全屏截图（`--full`）说明。
...
**assistant [peer=github.com-tyvt-skills]**: 已在 [agent-browser/SKILL.md](agent-browser/SKILL.md) 增加 **「Screenshots (verification)」** 小节，要点：

- 默认 `screenshot` 只截**视口**，不含折叠以下区域。
- 前端验证证据一律用 **`--full` / `-f` 全页截图**，并示例输出到 `%TEMP%` 带时间戳路径。
- 指向 `agent-browser screenshot --help` 及其它选项；并提醒与 **AGENTS.md** 前端验证门（自检图、内嵌展示）一致。

未跑构建：该仓库仅 Markdown skill 文档，无 npm build。若要同步到 `~/.dsh/skills/agent-browser/SKILL.md` 的副本，说一声我帮你对照路径。

<!-- MEMORY_FIELDS
{
  "event_name": "补充agent-browser全屏截图说明",
  "goal": "补充全屏截图文档",
  "summary": "2026-11-25，用户要求 agent-browser 截图使用全屏并补充到 md 文档；助手在 agent-browser/SKILL.md 新增「Screenshots (verification)」小节，说明默认 screenshot 仅截视口、前端验证证据须用 --full / -f 全页截图并输出到 %TEMP% 带时间戳路径，指向 screenshot --help 且与 AGENTS.md 前端验证门一致；仓库仅 Markdown 未跑构建，未同步到 ~/.dsh 副本。",
  "ranges": "0,16,23-25",
  "source_extraction_id": "89c8a37d775849fdb4a943cdfa600d94",
  "version": 1,
  "memory_type": "events"
}
-->