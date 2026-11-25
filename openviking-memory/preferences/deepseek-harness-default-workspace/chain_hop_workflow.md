- Ends a handoff chain only when the handoff document's unfinished/todo section is empty: all todos done means report chain termination and do not schedule the next hop, regardless of hop count or maxHops.
- On each hop reads the handoff goal, completed items, todos and constraints first, performs only the unfinished items, and never re-runs items already marked done.
- After finishing a hop updates the handoff document's verification status, cleans up temporary scripts and background processes, and states explicitly whether another hop is scheduled.
- Verifies database work from an independent connection after commit (per-day totals, precision, untouched ranges) rather than trusting the in-transaction result alone.

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "chain_hop_workflow",
  "source_extraction_id": "c3c4847bc5dd44d3b75da70633727d1f",
  "version": 1,
  "memory_type": "preferences"
}
-->