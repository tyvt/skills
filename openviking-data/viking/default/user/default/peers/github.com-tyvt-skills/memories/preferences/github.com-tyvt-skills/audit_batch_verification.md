- Start a memory spot-check audit by creating a staged todo list and selecting candidates with the script.
- Confirm orchestrator capabilities first and use them for parallel verification batches when available; keep result generation and writeback controlled directly by the main session.
- If the orchestrator fast path is rejected or fails, run the selection script directly instead of repeatedly retrying the same form.
- If orchestrator subagents lack native repository tools or OpenViking MCP access, keep code verification in the main session with batched parallel tool calls.
- For many candidates, first generate a compact readable dump and compact index, fill truncated entries, and then verify key evidence by project, file, and distinctive symbol.
- For large multi-repository verification, prefer deterministic one-pass scripted verification over orchestrator or model-pool fan-out; `op:tool` pwsh cannot run, so use `op:full`.
- Write a batch verification script that maps each candidate to a decisive symbol, scans once, and outputs a compact hit table with file hits and symbol hits; read it in segments and only chase missing or conflicting symbols.
- When greps are too broad or costly, switch to one Python verification script that scans source files across repositories, excludes dist and node_modules, and reports compact evidence for all candidates.
- Reuse completed scan results offline and filter noise instead of rescanning disk; if the evidence table is truncated, generate a readable UTF-8 table from the middle JSON.
- Focus second-pass checks on FAILs, weak matches, and genuinely ambiguous cases; use a final bounded restricted-repository batch or direct file reads before finalizing verdicts.
- When verification cost rises, stop expanding checks: cover remaining key items with the last bounded batch, parse all verdicts, then write back and finish.
- Before writing the final result file, stop any background verification tasks still running.
- Build the result file programmatically, with verdicts keyed by candidate index, to avoid URI or hash transcription errors.
- Mark a memory valid when an exact code file or distinctive symbol is hit in the owning business repository; mark plaintext credentials, core claims only in archived copies, nonexistent referenced files, hallucinations, test junk, privacy violations, or mismatch with current state invalid.
- For preference or experience memories without a code-file hit, still verify that the claim is specific, attributable, free of privacy violations and test junk, and supported by relevant paths or symbols.
- If select.json content is already the full text fetched from OpenViking by the script, do not reread OpenViking per candidate; use the full text plus code evidence.
- Skip the project build gate when only writing audit cache files and not modifying project code.
- Final briefs should summarize total memories, unchecked count, coverage, checked count, current batch size, judgment distribution, and writeback status; include a per-item basis table and explicitly state when bodies were unchanged, no memories were deleted, and no git commit was made.


<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "audit_batch_verification",
  "source_extraction_id": "d58b06c832474125b8f97dfc82fa1e9a",
  "peer_id": "github.com-tyvt-skills",
  "version": 5,
  "memory_type": "preferences"
}
-->