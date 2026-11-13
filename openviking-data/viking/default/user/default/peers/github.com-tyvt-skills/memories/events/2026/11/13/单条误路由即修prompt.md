# Summary
2026-11-13，用户 github.com-tyvt-skills 明确：n=1 且 100% MISS 已足够强到"先修 prompt 再观察"，不需要等 30 条数据；三态设计和 MISS 去向做法被确认正确。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 三态设计和 MISS 去向做得对，但 n=1 的 100% MISS 已经足够强到“先修 prompt 再观察”，不需要等 30 条；批量重放脚本脱离会话上下文、需要新增 replay 态、且成本不为零，应该在“修 prompt + 真实流量”验证无效后再做。比批量数据更优先的，是先查 op:full vs op:tool 的比例——它决定分流到底跑没跑，而这个答案比 30 条 MISS 数据更根本。

<!-- MEMORY_FIELDS
{
  "event_name": "单条误路由即修prompt",
  "goal": "明确行动阈值",
  "summary": "2026-11-13，用户 github.com-tyvt-skills 明确：n=1 且 100% MISS 已足够强到\"先修 prompt 再观察\"，不需要等 30 条数据；三态设计和 MISS 去向做法被确认正确。",
  "ranges": "0",
  "source_extraction_id": "c1d7fca67ce54bb28f26babf48b5d049",
  "version": 1,
  "memory_type": "events"
}
-->