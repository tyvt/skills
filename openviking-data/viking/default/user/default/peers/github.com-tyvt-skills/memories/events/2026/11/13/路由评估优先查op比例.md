# Summary
2026-11-13，用户 github.com-tyvt-skills 指导：在收集 MISS 数据前必须先查 op:full 与 op:tool 的比例，因为它决定路由分流到底有没有在跑，这比 30 条 MISS 数据更根本。助理据此先执行了比例统计。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 三态设计和 MISS 去向做得对，但 n=1 的 100% MISS 已经足够强到“先修 prompt 再观察”，不需要等 30 条；批量重放脚本脱离会话上下文、需要新增 replay 态、且成本不为零，应该在“修 prompt + 真实流量”验证无效后再做。比批量数据更优先的，是先查 op:full vs op:tool 的比例——它决定分流到底跑没跑，而这个答案比 30 条 MISS 数据更根本。
**assistant [peer=github.com-tyvt-skills]**: 你说得对，n=1 的 100% MISS 已经够作为行动依据了，而且 op:full 与 op:tool 的比例是更根本的问题：如果分流根本没有运行，那么即使修好 prompt 也没有数据来验证，攒到 30 条 MISS 同样没有意义。

先查这个比例。

<!-- MEMORY_FIELDS
{
  "event_name": "路由评估优先查op比例",
  "goal": "确定分流是否运行",
  "summary": "2026-11-13，用户 github.com-tyvt-skills 指导：在收集 MISS 数据前必须先查 op:full 与 op:tool 的比例，因为它决定路由分流到底有没有在跑，这比 30 条 MISS 数据更根本。助理据此先执行了比例统计。",
  "ranges": "0-1",
  "source_extraction_id": "c1d7fca67ce54bb28f26babf48b5d049",
  "version": 1,
  "memory_type": "events"
}
-->