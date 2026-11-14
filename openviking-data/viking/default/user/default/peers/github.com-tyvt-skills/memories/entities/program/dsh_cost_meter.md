# dsh/cost-meter
DSH cost-metering plugin (sibling of orchestrator-gate and plan-gate in the dsh/ tree), maintained by github.com-tyvt-skills. Contains lib/index.js, selftest.mjs, and a legacy dirty cordis.patch.yml (not part of active code).

## Design
- lib/index.js: plugin entry; tracks per-session usage, `bigMissStreak` (consecutive steps with uncached > perStepUncachedBudget=10000).
- selftest.mjs: behavioral test harness with mock `ctx` (only `on`); LRU + B2 enforcement blocks.
- Timing: verified in dsh-agent-loop/lib/index.js line 949 appends `assistant/message` (usage updates `bigMissStreak`) BEFORE line 961 `tools.execute` (guard reads updated streak); no off-by-one.

## B1 and B2 Implementation (landed 2026-11-14)
- B1: removed `inspectSize` export from lib/index.js (was lines 105-108); selftest LRU assertions became behavioral (hot-A survives, s0 undefined, s2499 present).
- B2: first enforcement via `ctx.tools.guard((exec) => ...)` inside `apply()` reading `acc` by sessionId.
- B2 config: `enforceBigMiss` (default true), env `DSH_COST_METER_ENFORCE=0` disables, `enforceLedgerPath` writes greylist ledger.
- B2 behavior: `bigMissStreak >= 2` soft-blocks `read` without offset/limit, `grep` without path, `pwsh` whole-dump (`git log` without `-n`); whitelists edit/write/paged read/path grep/verify/glob/bash.
- B2 cleanup: disposer registered via `ctx.on('dispose', ...)`.

## Status (as of 2026-11-14)
- B1 + B2 implemented and verified: node --check exit 0, inspectSize 0 occurrences in js/mjs, selftest all green.
- NOT committed per user instruction (hand for review, no auto-commit); changes limited to lib/index.js + selftest.mjs (+149/-8).

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "program",
  "name": "dsh_cost_meter",
  "source_extraction_id": "5e3a45385d7a44d1b348980eb877b0fc",
  "version": 1,
  "memory_type": "entities"
}
-->