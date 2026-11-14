- Require code changes to proceed in stages: implement → verify → next segment → verify; only continue after each segment's verification passes.
- After completion, hand to user for review; do NOT auto-commit. Execute commit only after user review confirms.
- If a boundary/timing uncertainty arises during implementation (e.g. metric vs interception ordering conflict), STOP and report; do not silently change the metric or workaround.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "code_delivery",
  "source_extraction_id": "5e3a45385d7a44d1b348980eb877b0fc",
  "version": 1,
  "memory_type": "preferences"
}
-->