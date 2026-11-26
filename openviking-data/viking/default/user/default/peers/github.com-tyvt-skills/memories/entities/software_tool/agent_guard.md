# Agent Guard
agent-guard is a guard component in the peer's environment.

## Drift Checking
- exploration-drift is warn-only and only records accounting.

## Verification Loop
- verify-loop uses agentBrowserMax 12 and Start-Sleep 5, accumulating per session without reset.
- On 2026-11-24 it was downgraded from block to warn.
- The change requires a web restart to take effect in new sessions.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "software_tool",
  "name": "agent_guard",
  "source_extraction_id": "e2f409bd407d469e808bee653001c5b7",
  "version": 1,
  "memory_type": "entities"
}
-->