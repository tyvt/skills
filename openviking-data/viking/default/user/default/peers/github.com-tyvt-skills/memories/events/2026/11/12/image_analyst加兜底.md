# Summary
2026-11-12 为 image_analyst 增加 auto/deepseek-v4.1-flash 兜底，主选仍为 cursor/deepseek-v41-flash-1017。此举推翻用户 2026-11-10「不留备用」的旧设定，消除看图工具单点故障风险（原仅一个模型，限流/宕机即瘫痪）。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...但在实际落地时，这套配置有 **3 个明确的隐患**和 **1 个单点故障**，建议针对性调整：

### 1. 核心隐患与风险

*   **单点故障：`image_analyst`（看图）没有降级池**
    *   配置里只有 `cursor/deepseek-v41-flash-1017` 一个独苗。如果该节点限流、宕机或网络抖动，整个图片分析工具将直接瘫痪。建议至少配置一个 `auto/` 或 `workbuddy/` 的多模态模型作为兜底。...
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
  "event_name": "image_analyst加兜底",
  "goal": "消除单点故障",
  "summary": "2026-11-12 为 image_analyst 增加 auto/deepseek-v4.1-flash 兜底，主选仍为 cursor/deepseek-v41-flash-1017。此举推翻用户 2026-11-10「不留备用」的旧设定，消除看图工具单点故障风险（原仅一个模型，限流/宕机即瘫痪）。",
  "ranges": "1-2,21,23",
  "source_extraction_id": "039129965bd2450d84b764f7f5f3efd1",
  "version": 1,
  "memory_type": "events"
}
-->