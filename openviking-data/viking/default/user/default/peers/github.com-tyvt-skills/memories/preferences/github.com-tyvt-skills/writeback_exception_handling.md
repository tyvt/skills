- Treat skipped=0 as the normal success condition; when skipped items have a documented URI normalization or backend limitation, report the counts and reason instead.
- When apply readback reports skipped because a filename with spaces causes URI normalization mismatch, treat it as a normalization difference rather than a concurrent change; the memory body is unaffected and completion can still be reported.
- If a URI containing spaces is rejected by both the CLI and MCP write paths with INVALID_ARGUMENT, treat it as a genuine backend skip rather than a body-change conflict; skip it without changing or deleting the memory and still report completion.
- After apply reports skipped items, verify their current audit_status and body hash directly because an interrupted earlier run may have already written them; do not assume every skipped item failed.
- When a space-containing URI fails readback but the underscore-normalized URI shows audit_status=valid with matching body hash, note, and timestamp, report the write as successful and do not add a duplicate write.
- If embedding errors occur because Ollama is disconnected, inspect the apply and write logic; `--wait` may block on embedding while readback verification still succeeds, so check recent audit events, recent apply output timestamps, and persisted writeback progress instead of assuming failure.
- After embedding-error writebacks, verify persisted frontmatter, including a spot check of invalid items, before reporting completion.
- If MCP health checks report healthy while OpenViking CLI writes fail during embedding, inspect service health and the autostart skill; keep collecting the running job because read, write, and reread processing may still be underway.
- Before rerunning apply after an embedding failure, do not trust green health endpoints alone: confirm the embedding model is installed, for example bge-m3-ov:latest, and that a real embed call succeeds with the expected dimension, for example /api/embed returning dim:1024.
- If Ollama embedding disconnects during apply, load the openviking-autostart skill, confirm OpenViking and Ollama are healthy, and retry; if the retried job remains stuck retrying, stop it and rerun cleanly.

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "writeback_exception_handling",
  "source_extraction_id": "8686cc58841f4a43b41db0ae35c629de",
  "peer_id": "github.com-tyvt-skills",
  "version": 5,
  "memory_type": "preferences"
}
-->