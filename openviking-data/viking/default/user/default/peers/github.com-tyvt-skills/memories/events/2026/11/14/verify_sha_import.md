# Summary
github.com-tyvt-skills verified on 2026-11-14 that `from src.verify import compute_content_sha` imports successfully with cwd set to `dsh/langgraph-orchestrator` (it pulls langgraph warnings but succeeds). This is the correct invocation for byte-level selftest cross-check of the gate.
# 2026-11-14 (Saturday) ChatLog:
**assistant [peer=github.com-tyvt-skills]**: Confirmed the working import: `cd dsh/langgraph-orchestrator` then `from src.verify import compute_content_sha` works (importing it pulls langgraph warnings but succeeds). The correct invocation for the byte-level selftest cross-check is: run python with `cwd = dsh/langgraph-orchestrator`, `from src.verify import compute_content_sha`.

Now let me fix the plan's step 5 (P0) and verification (P1-3). I'll make the pwsh branch strictly `tool==="pwsh"`-owned with clear early-return semantics that don't touch non-pwsh tools, drop the ambiguous "write-priority over unknown" (unknown always rejects), and pin the exact Python import.

<!-- MEMORY_FIELDS
{
  "event_name": "verify_sha_import",
  "goal": "Verify Python import path",
  "summary": "github.com-tyvt-skills verified on 2026-11-14 that `from src.verify import compute_content_sha` imports successfully with cwd set to `dsh/langgraph-orchestrator` (it pulls langgraph warnings but succeeds). This is the correct invocation for byte-level selftest cross-check of the gate.",
  "ranges": "3",
  "source_extraction_id": "02aeabaeb34741a4afdef7ba6f873d05",
  "version": 1,
  "memory_type": "events"
}
-->