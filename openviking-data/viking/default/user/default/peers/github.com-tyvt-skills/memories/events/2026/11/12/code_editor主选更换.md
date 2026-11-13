# Summary
2026-11-12 将 code_editor 主选从 workbuddy/deepseek-v4.1-flash（整池全为 Flash/light 级，无强模型）改为 cursor/composer-2.5（网关唯一非 Flash 强代码模型，200k 上下文），保留 glm-5.3-flash 与 deepseek-v4.1-flash 作廉价兜底。峰时策略 peak_use_glm_as_fallback 会切 glm 增加不一致性，换强模型可缓解。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...*   **能力错配：`code_editor`（写代码）用 Flash 模型打头阵**
    *   `workbuddy/deepseek-v4.1-flash` 响应极快、成本极低，但 Flash（轻量级）模型在生成复杂代码时，容易出现**“顺手牵羊”改无关代码**或**忽略边缘情况**。写代码是极容易产生连锁幻觉的环节。如果项目对代码质量要求高，建议主选非 Flash 的 DeepSeek-V4 甚至更强模型，让廉价 Flash 模型留在 `file_reader` 和 `pwsh`。...
...
**assistant [peer=github.com-tyvt-skills]**: 你选了三项全做。`code_editor` 需要先有强模型——先确认网关/settings 里到底有哪些非 flash 强模型可选，再决定加哪个。
...
**assistant [peer=github.com-tyvt-skills]**: 网关里**唯一真正的非 Flash 强模型是 `cursor/composer-2.5`**（Composer 2.5，Cursor 的编码专用强模型，200k 上下文），`cursor/grok-4.7@256k` 也是强模型但偏通用推理。composer-2.5 是**专为代码设计**的，最适合 code_editor。

现在开始改配置。我按你的三项选择落地：

**1. planner**：`openrouter/tencent/hy3-preview:free` → `workbuddy/hy3`（网关真实存在），grok 保留兜底。
**2. image_analyst**：加 `auto/deepseek-v4.1-flash` 兜底。
**3. code_editor**：主选换成 `cursor/composer-2.5`（强代码模型），保留 flash 作廉价兜底。

先备份 config.yaml 再改。

<!-- MEMORY_FIELDS
{
  "event_name": "code_editor主选更换",
  "goal": "提升代码生成质量",
  "summary": "2026-11-12 将 code_editor 主选从 workbuddy/deepseek-v4.1-flash（整池全为 Flash/light 级，无强模型）改为 cursor/composer-2.5（网关唯一非 Flash 强代码模型，200k 上下文），保留 glm-5.3-flash 与 deepseek-v4.1-flash 作廉价兜底。峰时策略 peak_use_glm_as_fallback 会切 glm 增加不一致性，换强模型可缓解。",
  "ranges": "3-4,21,23",
  "source_extraction_id": "039129965bd2450d84b764f7f5f3efd1",
  "version": 1,
  "memory_type": "events"
}
-->