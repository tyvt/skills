# Summary
按用户要求对 T3 做 3× composer 与 3× grok-4.7@256k 复现：composer 结果为正确/正确/跑题（第3次输出"前端面试题 React+Node 全栈"模板），grok 3/3 全对。确认 composer 存在 ~1/3 间歇性模板坍缩（非确定性失败），T3 归 Grok 结论成立但应写为"抗间歇幻觉"而非"Composer 不会 T3"。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 这份报告的方法论骨架是对的（同一 prompt 分喂、四列指标并列、成本硬上限、局限诚实标注），但“单轮裸测 → agentic 规则”的跨度需要收窄：T3 改判要复现 3 次，grok-4.6/4.5 不能和 4.7 并列，composer 的 cost=0 要注明池额度前提，T5 的质量分要拆覆盖度和取舍质量，T7 要加一道复杂题。脚本的价格表缺失和 max_tokens 未收紧是工程小问题，修起来很快。
...
**assistant [peer=github.com-tyvt-skills]**: Important! **composer-2.5 T3 rep1 is ON-TASK and correct** this time (no hallucination). So the original T3 "跑题" was **not reproducible** — the user's instinct to require 3× repro was right. Let me wait for all 6 runs.
...
**assistant [peer=github.com-tyvt-skills]**: Now rep3 composer is **off-task again** (hallucinated "前端面试题 / React + Node.js 全栈" template). So across 3 reps composer was: on-task (correct), on-task (correct), off-task (hallucination). That's **~1/3 failure rate** — the跑题 is real but **intermittent**, not deterministic. This is a crucial refinement: it's a stochastic failure mode, not "composer is bad at T3". Let me wait for rep3 grok and the final.
...
**assistant [peer=github.com-tyvt-skills]**: T3 reproduction complete. The `off_task` regex missed rep3 composer because its hallucination template ("前端面试题") has no "SkillUpgradeTracker" keyword — but it's clearly off-task (it's answering a Chinese interview-question meta-template, not the config error). So真实判定:

- **composer-2.5 T3**: rep1 on-task(correct), rep2 on-task(correct), rep3 **OFF-TASK** (interview template) → **~1/3 跑题率**
- **grok-4.7@256k T3**: rep1/2/3 全部 on-task 正确 → **0/3，稳定**

This actually **strengthens** the T3 conclusion but with correct nuance: it's an **intermittent hallucination failure (~33%)** on composer, not a hard "composer can't do T3". That's more actionable — a 1/3 flake rate is exactly why you'd route T3 to grok OR always verify composer's T3 output.

Now let me make the remaining fixes: (1) grok-4.6/4.5 not并列 with 4.7, (2) composer cost=0 池额度前提, (3) T5 质量拆覆盖度/取舍, (4) T7 加复杂题. Let me update tasks.json with a harder T7b and rerun just the new T7 complex task on composer+grok. First, add T7c (complex doc) to tasks.json.

<!-- MEMORY_FIELDS
{
  "event_name": "T3复现发现composer间歇坍缩",
  "goal": "复现验证composer稳定性",
  "summary": "按用户要求对 T3 做 3× composer 与 3× grok-4.7@256k 复现：composer 结果为正确/正确/跑题（第3次输出\"前端面试题 React+Node 全栈\"模板），grok 3/3 全对。确认 composer 存在 ~1/3 间歇性模板坍缩（非确定性失败），T3 归 Grok 结论成立但应写为\"抗间歇幻觉\"而非\"Composer 不会 T3\"。",
  "ranges": "0,20,24,26",
  "source_extraction_id": "36de05456e3e4f3f89cfa5a16d06607b",
  "version": 1,
  "memory_type": "events"
}
-->