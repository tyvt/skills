# provider_error_audit
Technical-pattern entity: audit of magpie/workbuddy/hy4free provider errors terminating DSH multi-turn conversations on 2026-11-09, with fixes to audit and guardrails.

## Phenomenon
- 37 turn/end events: 12 (32.4%) terminated by provider errors, all between 10-12, all on magpie/workbuddy/hy4free channels (23/24 sessions)
- Failures recurred in-session: 082ae4a7 4/5, 154d41f8 2/2, 9429e069 2/2 turns failed consecutively
- 7 PI_AI_ERROR + 5 MALFORMED_RESPONSE (mcp_gateway tool param JSON truncated)
- Failed turns avg inputTokens 67K < success 93K; multiple failed turns had 0 tool calls, pointing to magpie channel instability not Hy4 model

## Guardrail Gap
- 12 failed turns all lacked llm/retry events; built-in retry and dsh-agent-guard planRecovery not triggered
- Old audit.mjs only counted llm/retry causing underreport (showed 5, actual 12+)

## Fixes
- audit.mjs / morning-report.mjs now include turn/end reason.kind=error; new caliber provider failures 18 = PI_AI_ERROR 7 + MALFORMED_RESPONSE 6 + TRANSPORT 5
- AGENTS.md rule 11 expanded to finish_reason:error (2 consecutive → new session/change provider); new rule 13 splits mcp_gateway large params
- In worktree skills-wt-finish-reason-20261109 (D:/repository/skills) changed 3 files, committed dcafe1fa, fast-forward merged main, worktree deleted; per user not pushed (main ahead origin/main by c7f682f5, dcafe1fa)
- User chose to keep model, observe first
- Report at C:/Users/Administrator/.dsh/reports/provider-finish-reason-2026-11-09.md; scripts finish-reason-scan.mjs, finish-reason-detail.mjs, finish-reason-context.mjs kept at ~/.dsh/reports/


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "provider_error_audit",
  "source_extraction_id": "ee9bac6a81c444b4b0f9e699cdd3d61e",
  "version": 3,
  "memory_type": "entities"
}
-->