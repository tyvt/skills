# dsh
DeepSeek Harness (DSH): user's AI session workbench; historical sessions planned for import into OpenViking as long-term memory.

## Basic Stats
- Total sessions 1602 (as of 2026-11-04); 2026-11-09 audit observed 1,753 session logs (1,755 incl 10-26 bulk import 1,232; only 463 have token metering)
- Session data: source.kind === "user" is real human input to keep; other injected context filtered
- 2026-11-02 distill: memories-final.json (project "Taixing mini-program" 162 items) + distilled-projects/ (831 project memories); structured total 4431 (bug 1712, pattern 941, preference 923, fact 571, workflow 284)

## Integration
- Official @openviking/dsh-memory-plugin mirrors sessions to OpenViking in real time; import order DSH first, then cursor, workbuddy, opencode
- 2026-11-05 session dsh-session-fe39d020 called OpenViking MCP (search ~45, read ~35, remember ~9) and wrote 29 memories (write 11/edit 17); at 09:58 extracted=40, commits=48 still updating

## Skills & Token Opt
- Skill repo D:/repository/skills: dsh/agent-guard (rules.js + tests) aliases schedule_update→schedule_edit etc; tool-call-hygiene has morning-report.mjs (24h window stats)
- 2026-11-09: dsh-context plugin v0.83.0 installed (Context Insights panel, /context); token-frugal has audit-tokens.mjs; new token-optimizer skill committed
- Local plugins dsh-token-guard (trim large reads) and dsh-cost-meter (cost thresholds) symlinked to ~/.dsh/, zero deps
- web profile: spill-policy.maxInlineTokens 3000→1500, retainTokens 20000→12000, repeat-tool-reminder 3/5/8→2/4/6; verified after restart


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh",
  "source_extraction_id": "ee9bac6a81c444b4b0f9e699cdd3d61e",
  "version": 9,
  "memory_type": "entities"
}
-->