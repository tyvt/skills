# Summary
On 2026-11-25 the approved migration ran against the dashboard credential DB after a backup: 10 slash-style mismatched secret_refs were rewritten (fdc-v3 ×5, portal ×5) and 5 historical accounts were added with 1 existing account updated, so passwords now persist as plaintext in the database.
# 2026-11-25 (Wednesday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Running the migration now (approved plan, DB backed up first).
**assistant [peer=github.com-tyvt-skills]**: Migration succeeded (backup, 10 refs fixed, 5 accounts added/1 updated). Now patching api.py with exact source-line replacements (avoiding redacted lines).

<!-- MEMORY_FIELDS
{
  "event_name": "credential_migration_applied",
  "goal": "Migrate credential DB schema",
  "summary": "On 2026-11-25 the approved migration ran against the dashboard credential DB after a backup: 10 slash-style mismatched secret_refs were rewritten (fdc-v3 ×5, portal ×5) and 5 historical accounts were added with 1 existing account updated, so passwords now persist as plaintext in the database.",
  "ranges": "60-63",
  "source_extraction_id": "1cd7bf829d0948d992256f29a6174125",
  "version": 1,
  "memory_type": "events"
}
-->