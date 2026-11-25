# Summary
On 2026-11-25 api.py was patched with exact source-line replacements, avoiding the tool-masked lines 137/139/328, so the dashboard state endpoint returns plaintext passwords read from the DB.
# 2026-11-25 (Wednesday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Migration succeeded (backup, 10 refs fixed, 5 accounts added/1 updated). Now patching api.py with exact source-line replacements (avoiding redacted lines).
**assistant [peer=github.com-tyvt-skills]**: Now update selftest to the approved new design (plaintext in state intended per `index.html:57`; stale portal/local + port assertions).

<!-- MEMORY_FIELDS
{
  "event_name": "api_plaintext_patch",
  "goal": "Serve plaintext from DB",
  "summary": "On 2026-11-25 api.py was patched with exact source-line replacements, avoiding the tool-masked lines 137/139/328, so the dashboard state endpoint returns plaintext passwords read from the DB.",
  "ranges": "62-66",
  "source_extraction_id": "1cd7bf829d0948d992256f29a6174125",
  "version": 1,
  "memory_type": "events"
}
-->