# Summary
On 2026-11-25 the stale selftest assertions were updated — selftest_dashboard.py's no-plaintext-in-state, missing portal/local account and obsolete port 8098 mapping checks, plus selftest.py's hardcoded slash-format secret_ref paths — after which both suites passed (selftest.py 2/2 and selftest_dashboard.py 13/13).
# 2026-11-25 (Wednesday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Now update selftest to the approved new design (plaintext in state intended per `index.html:57`; stale portal/local + port assertions).
**assistant [peer=github.com-tyvt-skills]**: selftest_dashboard.py now PASS. selftest.py fails on `secret_ref_path` — it expects the old slash format I just fixed. Let me check its assertion.
**assistant [peer=github.com-tyvt-skills]**: selftest.py hardcodes the old slash-format refs I fixed. Let me check query_env.py to see how `secret_ref_path` and `password` are derived before updating the test.
**assistant [peer=github.com-tyvt-skills]**: selftest.py fails only on `secret_ref_path` because I converted the slash refs to canonical viking format. Let me verify the exact new refs in DB, then update the test expectations.
**assistant [peer=github.com-tyvt-skills]**: The refs are now canonical format. Update selftest.py's hardcoded expected paths to match.
**assistant [peer=github.com-tyvt-skills]**: Both selftests PASS. Let me update todos and restart the dashboard with the new code.

<!-- MEMORY_FIELDS
{
  "event_name": "selftests_passed",
  "goal": "Green selftests after update",
  "summary": "On 2026-11-25 the stale selftest assertions were updated — selftest_dashboard.py's no-plaintext-in-state, missing portal/local account and obsolete port 8098 mapping checks, plus selftest.py's hardcoded slash-format secret_ref paths — after which both suites passed (selftest.py 2/2 and selftest_dashboard.py 13/13).",
  "ranges": "66-80",
  "source_extraction_id": "1cd7bf829d0948d992256f29a6174125",
  "version": 1,
  "memory_type": "events"
}
-->