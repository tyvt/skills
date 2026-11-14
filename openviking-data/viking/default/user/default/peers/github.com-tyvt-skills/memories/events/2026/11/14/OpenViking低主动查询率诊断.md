# Summary
2026-11-14 用户请求解决 OpenViking agent 主动查询率低的问题并出方案。经查询 C:\Users\Administrator\.openviking\data\_system\usage_audit\usage_audit.sqlite3 发现，约24小时审计窗口（2026-11-13至2026-11-14）内 caller=user 的主动 search 调用为 0 次，而会话消息写入达 924 次，主动查询率实质为 0%。根因为 dsh-memory-plugin 每轮自动注入记忆上下文（auto-recall，14次），抑制了 agent 主动调用 search 的动力。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 如何解决本机openviking的agent主动查询率低的问题？出个方案
...
**assistant [peer=github.com-tyvt-skills]**: Found `C:\Users\Administrator\.openviking\data\_system\usage_audit\usage_audit.sqlite3`. Let me query it read-only to quantify actual search usage vs. sessions.
...
**assistant [peer=github.com-tyvt-skills]**: No sqlite3 CLI. Use Python (available per OpenViking install).
...
**assistant [peer=github.com-tyvt-skills]**: There is a `caller` field already in `request_audit`! Let me quantify search usage by caller, by day, and compare against session activity.
...
**assistant [peer=github.com-tyvt-skills]**: This is the decisive evidence. The `caller` field already exists and shows the smoking gun:

**In ~24h of audit (11-13 → 11-14):**
- `auto-recall` (plugin per-turn injection): **14 search calls** — all machine-driven
- `probe-test` (a manual probe): **1**
- **User/agent-initiated (`caller=user`): 0 zero calls**

Meanwhile session message writes = 924. So the agent actively queried OpenViking **0 times** while doing 900+ message round-trips. This precisely quantifies "主动查询率低" — the rate is essentially **0%**.

Let me confirm there's no `caller=user` and check the retrieval_hourly for context.
...
**assistant [peer=github.com-tyvt-skills]**: Now the picture is fully quantified and confirms the root cause with hard data:

- `caller=user`: **0** — the agent never proactively searched
- All 300+ searches in retrieval_hourly are **auto-recall** (plugin per-turn injection), including 38 searches at UTC hour 3 (deep-night, nobody present)
- `retrieval_hourly` shows the plugin fires 6–38 searches/hour regardless of whether a human is present

So the "low proactive-query-rate" is real and is **structurally caused**: the plugin's automatic per-turn injection removes the agent's incentive to call search, while burning VLM tokens. This is a subtle but critical insight — the fix isn't just "add an AGENTS.md rule" (C1 is weak/already there and clearly didn't work).

I now have enough to write the plan. Given AGENTS.md rules: this is a plan/analysis deliverable. Since it involves config/plugin changes if implemented, per rules I should produce a Markdown plan and — only if the user wants me to implement edits — send to plan_review + user confirmation. But the user asked "出个方案" (produce a plan/proposal), which is a design deliverable, not necessarily immediate code changes. Let me first write the plan document, then present it. I'll also delegate a parallel deep-dive on enforcement mechanism feasibility to a teammate to keep things moving, but this is small enough to do directly.

Let me write the plan skeleton then flesh it out incrementally per AGENTS.md (skeleton → edit per section).

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking低主动查询率诊断",
  "goal": "诊断主动查询率低问题",
  "summary": "2026-11-14 用户请求解决 OpenViking agent 主动查询率低的问题并出方案。经查询 C:\\Users\\Administrator\\.openviking\\data\\_system\\usage_audit\\usage_audit.sqlite3 发现，约24小时审计窗口（2026-11-13至2026-11-14）内 caller=user 的主动 search 调用为 0 次，而会话消息写入达 924 次，主动查询率实质为 0%。根因为 dsh-memory-plugin 每轮自动注入记忆上下文（auto-recall，14次），抑制了 agent 主动调用 search 的动力。",
  "ranges": "0,27,29,31,33,35",
  "source_extraction_id": "a0f74f2a66cc446290b434612da64dc0",
  "version": 1,
  "memory_type": "events"
}
-->