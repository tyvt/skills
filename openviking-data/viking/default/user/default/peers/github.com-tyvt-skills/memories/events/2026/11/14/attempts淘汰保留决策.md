# Summary
2026-11-14 用户复核指出不可盲目对 agent-guard 的 attempts Map 做 FIFO 淘汰；助理取证确认其 key 为 provider|turn|step（单步重试升级计数），FIFO 归零会削弱限流安全语义，遂决定本轮仅加注释保留不改，待查清用途再定。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 废弃脚本该删就删，引用的地方对应修改，确保没有使用的地方。token-guard/agent-guard 等未触碰插件的 Map 淘汰、dcwhc 小瑕疵也治理
...
**assistant [peer=github.com-tyvt-skills]**: Excellent review points from you — all correct. The key correction: **don't blindly FIFO `attempts`** until I know its semantics, and **cost-meter active-session cost is sensitive** → use session-end cleanup + large FIFO fallback (2000), orchestrator-gate 1000. And several facts must be verified first. Let me gather the facts, then finalize.
...
**assistant [peer=github.com-tyvt-skills]**: Critical finding: `attempts` key = **`provider|turn|step`** — it's a **per-turn/step retry-escalation counter within llm-retry budget**, NOT a session budget. It grows one entry per errored step and is never deleted. FIFO归零 would reset the escalation count for that key → could **re-attempt recovery beyond intended budget** for the same step (safety-relevant). Your instinct was right.

**Better fix for `attempts`**: keys are `provider|turn|step` — naturally bounded by conversation length, but across long sessions accumulate. Safer: clear **per-session** on session end, OR evict only **stale** keys (not recently touched). Simplest safe: since keys include `turn|step` which are monotonic per session, delete entries when their turn is far behind the current turn. But cross-session we don't have session in key.

Cleanest safe approach that never weakens safety: **cap by FIFO but only drop keys whose turn is older than current - K** — complex. Given the risk, I'll **leave `attempts` unchanged this round** (per your "先查清用途再定") and note it: its key is `provider|turn|step` (per-step escalation), growth is bounded by errored steps per process; I'll document and defer. Let me verify cost-meter session-end hook & mcp-gateway connections structure & dcwhc receivedAt type.
...
**assistant [peer=github.com-tyvt-skills]**: ...- token-models **21/21**

### 关键严谨点（回应你的复核）
- **attempts 未套 FIFO**：查清 key 语义后确认会变安全语义，仅加注释说明其增长受「出错步数」天然约束。...

<!-- MEMORY_FIELDS
{
  "event_name": "attempts淘汰保留决策",
  "goal": "确认限流计数安全性",
  "summary": "2026-11-14 用户复核指出不可盲目对 agent-guard 的 attempts Map 做 FIFO 淘汰；助理取证确认其 key 为 provider|turn|step（单步重试升级计数），FIFO 归零会削弱限流安全语义，遂决定本轮仅加注释保留不改，待查清用途再定。",
  "ranges": "0,29,31,247",
  "source_extraction_id": "54d36b8afaa7411a8927f19ab739216e",
  "version": 1,
  "memory_type": "events"
}
-->