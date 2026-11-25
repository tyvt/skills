# Summary
On 2026-11-25 the deploy dashboard was moved off a session-bound background job to a standalone detached process (PID 19656) on port 18098 so the board would not lose its passwords when the session ended.
# 2026-11-25 (Wednesday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Git scope identified. I also see a stray `--full-page` artifact from my earlier failed screenshot command — must clean up. Let me restore dashboard to a standalone persistent process and remove process artifacts.
**assistant [peer=github.com-tyvt-skills]**: The dashboard currently runs inside a session-bound background job. Let me convert it to a standalone detached process so it survives session end.
**assistant [peer=github.com-tyvt-skills]**: Standalone dashboard live (PID 19656, independent of session). Now the Git commit-method question — one question with defaults, per the "ask once" rule.

<!-- MEMORY_FIELDS
{
  "event_name": "dashboard_standalone_restart",
  "goal": "Keep dashboard running after session",
  "summary": "On 2026-11-25 the deploy dashboard was moved off a session-bound background job to a standalone detached process (PID 19656) on port 18098 so the board would not lose its passwords when the session ended.",
  "ranges": "151-159",
  "source_extraction_id": "1cd7bf829d0948d992256f29a6174125",
  "version": 1,
  "memory_type": "events"
}
-->