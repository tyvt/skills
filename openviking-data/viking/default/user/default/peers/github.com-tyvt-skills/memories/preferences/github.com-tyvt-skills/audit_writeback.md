- Generate `result.json` by matching URIs and hashes directly from `select.json` instead of transcribing them manually.
- Confirm all selected URIs resolve with current content through a batched read before writing verdicts; record any `NOT_FOUND` URI separately.
- If apply runs long because embedding rebuilds disconnect, collect the background job before computing final coverage stats.
- Report `verify:ok` from frontmatter readback rather than assuming the write failed.
- Expect apply to take about three OpenViking operations per item, frontmatter read, write, and read-back verification with embedding; monitor the audit log by item index, at roughly 11–12 seconds per item.
- The local embedding service is Ollama; disconnection can cause individual readback verification failures and skipped items while the verdict remains valid and the write returns ok.
- During audit writeback, for environment-only Ollama disconnections, avoid automatic retries or user confirmation in the same round; treat it as an environment issue that does not affect other writebacks.
- After apply, verify the final state of skipped URIs before reporting.
- State explicitly in the audit summary whether any `body_changed` concurrency conflicts occurred during apply.
- Report `post_persist_embedding_err` entries as post-write embedding rebuild errors; if frontmatter readback passes, state that they do not change the audit verdict.
- When a skip occurs because the body landed but readback or frontmatter did not become effective, report the frontmatter as not applied for this round and expect it to be selected again after cooldown.
- Include evidence-based notes with each verdict in `result.json`.
- Treat a spaced memory filename as a possible URI normalization mismatch cause for a skipped apply; report the specific skipped item and verify its final state before closing the audit.
- State explicitly in the audit brief when the memory bodies were not changed, no memories were deleted, no git commit was made, and intermediate files were kept under `~/.dsh/cache/memory-audit/`.
- When a spaced memory URI is skipped, do not rely on `ov read` for exact-URI verification because it also normalizes spaces to underscores; use an exact-URI read path such as the MCP read tool.
- If an MCP write also normalizes a spaced URI to an underscore URI, check both the underscore and original spaced URI directly, because frontmatter may land on a normalized duplicate while the original memory remains unmarked.
- After a direct rewrite to normalized URIs, recheck final stats and explicitly report that stats may still count the original spaced memories as unselected; leave merge or deletion for later or human decision when the task forbids deleting memories.

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_writeback",
  "source_extraction_id": "a1f1b379b0274d988309ce6877132022",
  "peer_id": "github.com-tyvt-skills",
  "version": 4,
  "memory_type": "preferences"
}
-->