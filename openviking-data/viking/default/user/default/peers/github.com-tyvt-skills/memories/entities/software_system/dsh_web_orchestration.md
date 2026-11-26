# DSH Web Orchestration
DSH Web is a multi-model orchestration system used by the peer.

## Architecture
- Uses LangGraph and Magpie for multi-model orchestration.
- Planner pool uses gpt-6-luna and gpt-5.4-mini in a three-level chain.

## Model Configuration
- From 2026-11-24, config.yaml changed 15 deepseek ids to hy4flash-free (10 workbuddy, 5 auto).
- The changes load per request without a restart.
- router.py peak-time skip strategy automatically becomes a no-op.

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "software_system",
  "name": "dsh_web_orchestration",
  "source_extraction_id": "e2f409bd407d469e808bee653001c5b7",
  "version": 1,
  "memory_type": "entities"
}
-->