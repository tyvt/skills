- When a P0 handoff directive is injected into a task, load the session-handoff skill before continuing execution.
- Record a compact completion handoff using the skill's 9-section document structure when the task finishes.
- If section 4 for unfinished items is empty, terminate the handoff chain with no next hop scheduled.
- Persist handoff documents under D:/plan/skills/ as HANDOFF-CHAIN-<Task>-hop<N>-<timestamp>.md.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "session_handoff",
  "source_extraction_id": "7ddb547351964d9aaf70b9c2c65dbcda",
  "version": 1,
  "memory_type": "preferences"
}
-->