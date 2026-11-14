# Summary
2026-11-14，github.com-tyvt-skills 关闭了 cursor/composer-2.5、cursor/gpt-5.3-codex、cursor/gemini-4-hydrogen、cursor/gpt-5.4-nano 四个模型，cursor 系由 14 个减至 10 个，网关共剩 22 个模型；核对确认这 4 个都不被 config 引用，编排器运行不受影响。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 我都关了，你重新拉所有模型看看还有哪些改关
**assistant [peer=github.com-tyvt-skills]**: 重新拉全部模型，看现在还剩哪些、有无该关的。同时核对 config 引用的模型是否都还在（你关了一些，可能有 config 引用的也关了——需检查）。
**assistant [peer=github.com-tyvt-skills]**: 你关掉了 `cursor/composer-2.5`、`cursor/gpt-5.3-codex`、`cursor/gemini-4-hydrogen`、`cursor/gpt-5.4-nano`（cursor 从 14→10）。现在共 22 个。

先核对 config 引用的模型是否都还在（避免又出现"config 引用已关模型"），再判还有无该关的。
**assistant [peer=github.com-tyvt-skills]**: ✅ config 引用的模型全部在网关——你关的 4 个都没被 config 引用（composer 已在上一轮从 code_edit_with_signal 撤下，其余 3 个本就没进池）。

现在判定剩下 22 个还有无该关的。...

<!-- MEMORY_FIELDS
{
  "event_name": "关停四个cursor模型",
  "goal": "精简网关模型列表",
  "summary": "2026-11-14，github.com-tyvt-skills 关闭了 cursor/composer-2.5、cursor/gpt-5.3-codex、cursor/gemini-4-hydrogen、cursor/gpt-5.4-nano 四个模型，cursor 系由 14 个减至 10 个，网关共剩 22 个模型；核对确认这 4 个都不被 config 引用，编排器运行不受影响。",
  "ranges": "48-53",
  "source_extraction_id": "4fe595d1de624f70b3f6296b3ea7d623",
  "version": 1,
  "memory_type": "events"
}
-->