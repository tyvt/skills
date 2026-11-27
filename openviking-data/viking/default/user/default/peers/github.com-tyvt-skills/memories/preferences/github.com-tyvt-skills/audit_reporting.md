- After completing a memory audit, produce a structured briefing starting with an overview that reports total memory count, checked count, remaining unchecked count, and coverage percentage.
- Include the current round's sample size and selection conditions, such as cooldown duration in days and whether sampled items were never checked.
- Use a table that also includes eligible pool size, applied/skipped/verify-ok counts, cumulative checked count, and remaining unchecked count calculated as eligible pool minus applied writebacks.
- Report the verdict distribution by both writeback results and full `result.json` when any item is skipped, and state that skipped items remain in the candidate pool.
- Report writeback status including applied, skipped, errors, and readback verification results.
- Give evidence bases for invalid verdicts and a per-item evidence summary for valid verdicts.
- For invalid entries, state whether the target file exists but key symbols have zero real-code hits or appear only in memory mirrors.
- When reindexing after writeback changes the total memory count, report both the select-time count and the post-write count and explain the difference.
- Star valid but skipped entries caused by URI slug normalization (spaces to underscores), note that original frontmatter was not updated, and explain any count increase as a normalized duplicate file.
- Treat a URI-normalization readback miss as skipped as instructed rather than a failure when the audit rule requires skipping that writeback.
- State the audit scope explicitly: no memory body semantics changed, no memories deleted, no git commit, and intermediate files only under `~/.dsh/cache/memory-audit/`.

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_reporting",
  "source_extraction_id": "ca2c4a9c5b5c42c584837df666765e46",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "preferences"
}
-->