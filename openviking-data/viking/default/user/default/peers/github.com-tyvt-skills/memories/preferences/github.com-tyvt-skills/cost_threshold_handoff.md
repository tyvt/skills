- When a P0 handoff is injected at the cost threshold, stop the current task immediately and follow the handoff skill's exact process.
- Before scheduling the next hop, write a 9-section HANDOFF-CHAIN handoff document into the plan/skills directory; list residual items in section 4 and include chain metadata in section 5.
- Per the AGENTS.md P0 rule, never put maxHops or any hop cap in the next-hop schedule prompt; keep that prompt limited to a few concrete items.
- Record the next-hop schedule id, delivery time, hop number, and goal, and note that the chain will finish and report termination in a later session.
- During a P0 hard handoff, do not change memory bodies, delete memories, commit git, or ask the user; report current status and pass remaining work to the next hop.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "cost_threshold_handoff",
  "source_extraction_id": "851f9dc9574a4c14a0fc8aa8664831a2",
  "version": 1,
  "memory_type": "preferences"
}
-->