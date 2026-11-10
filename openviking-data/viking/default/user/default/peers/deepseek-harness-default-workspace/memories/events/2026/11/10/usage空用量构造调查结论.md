# Summary
2026-11-10，用户要求仅调查（不改）usage 三键全 0 的构造位置。助手结论：可改目录 D:\repository\skills\dsh 中同时构造 inputTokens/outputTokens/totalTokens 三键的仅刚改的 cost-meter；安装包中 pi-ai 的 parseChunkUsage 会写 cacheRead（非三键 0）、dsh-agent-loop 只转发 live.usage、dsh-llm 仅有 TokenUsage 类型声明无构造、BlockAssembler 引入 dsh-llm 但搜不到三键构造。三键 0 的构造点不在可改层，也无插件 hook 能在落盘前改 assistant/message.usage，判定不可覆盖。结论：不进入改 usage 记账（null + usageSource 方案不实施）。
# 2026-11-10 (Tuesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: ...已排除：`@earendil-works/pi-ai` 的 `parseChunkUsage`（会写 cacheRead 缺省 0），
`@deepseek-ai/dsh-agent-loop` 的 903/953 行只是把 usage 放进 assistant/message。

要做：
- 在**可改的源码层**（不是 node_modules）搜同时构造 `inputTokens`+`outputTokens`+`totalTokens` 三键的位置。
- 判定它是否在可覆盖层（插件 hook / profile 配置）内。
- 产出结论：可覆盖 / 不可覆盖 / 找不到源码。

**本批不改代码。** 结论为「可覆盖」才进入下一轮改 usage 记账（null + usageSource）。

---

## 执行顺序...
...
**assistant [peer=deepseek-harness-default-workspace]**: ...## B2 不可覆盖

可改目录 `D:\repository\skills\dsh` 里，同时出现 `inputTokens`、`outputTokens`、`totalTokens` 的只有刚改的 cost-meter。

安装包里：`pi-ai` 的 `parseChunkUsage` 会写 `cacheRead`；`dsh-agent-loop` 只转发 `live.usage`；`dsh-llm` 只有 `TokenUsage` 类型声明，没有构造这三键。`BlockAssembler` 从 `@deepseek-ai/dsh-llm` 引入，但该包的 `lib/index.js` 里搜不到 `inputTokens`。三键 0 的构造点不在可改层，也没有插件 hook 能在落盘前改 `assistant/message.usage`。

结论：不可覆盖。不进入改 usage 记账。

<!-- MEMORY_FIELDS
{
  "event_name": "usage空用量构造调查结论",
  "goal": "记录不可覆盖",
  "summary": "2026-11-10，用户要求仅调查（不改）usage 三键全 0 的构造位置。助手结论：可改目录 D:\\repository\\skills\\dsh 中同时构造 inputTokens/outputTokens/totalTokens 三键的仅刚改的 cost-meter；安装包中 pi-ai 的 parseChunkUsage 会写 cacheRead（非三键 0）、dsh-agent-loop 只转发 live.usage、dsh-llm 仅有 TokenUsage 类型声明无构造、BlockAssembler 引入 dsh-llm 但搜不到三键构造。三键 0 的构造点不在可改层，也无插件 hook 能在落盘前改 assistant/message.usage，判定不可覆盖。结论：不进入改 usage 记账（null + usageSource 方案不实施）。",
  "ranges": "19-21,104-106",
  "source_extraction_id": "06f0675731fa4c1ab8caf8db9c5023ff",
  "version": 1,
  "memory_type": "events"
}
-->