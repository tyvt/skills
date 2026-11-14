# Summary
2026-11-14 结论：session_query 占用 994 token（使用率 8.8%，且无可切换预设兜底），本轮先认掉这笔开销，待以后有可切预设机制再议。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 发了，验证
...
**assistant [peer=github.com-tyvt-skills]**: ...**遗留（按你意另起）**：
- embedding 抖动（Ollama↔OpenViking，改动前已有 214 次 disconnect，与本次无关）。
- session_query 994 token（8.8% 使用率 + 无切换兜底，本轮认掉，待有可切预设机制再议）。...

<!-- MEMORY_FIELDS
{
  "event_name": "session_query开销延期处理",
  "goal": "记录性能遗留决定",
  "summary": "2026-11-14 结论：session_query 占用 994 token（使用率 8.8%，且无可切换预设兜底），本轮先认掉这笔开销，待以后有可切预设机制再议。",
  "ranges": "0,41",
  "source_extraction_id": "186dfdf1b42044a981f9a67468f2832a",
  "version": 1,
  "memory_type": "events"
}
-->