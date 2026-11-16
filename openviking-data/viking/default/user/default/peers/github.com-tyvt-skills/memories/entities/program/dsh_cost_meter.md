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

## Activation fix: inject (2026-11-16)
- Startup log reported `1 entry did not activate` for cost-meter with `Error: cannot get property "tools" without inject` at lib/index.js:325:17, so the whole plugin never loaded.
- Root cause: lib/index.js:20 declared `export const inject = []` while apply() reads `ctx?.tools?.guard` (:325) and calls `ctx.tools.guard(...)` (:351); cordis throws on any access to an un-injected service, even behind optional chaining.
- Fix: `inject = ['tools']` at lib/index.js:20, plus a selftest.mjs assertion that inject contains 'tools' (the old selftest used a bare mock ctx with a plain tools object and never exercised cordis inject rules).
- Sibling precedent: orchestrator, agent-guard, orchestrator-gate, token-guard, plan-gate and mcp-gateway all declare inject=['tools']; cost-meter was the only outlier. Same bug class as orchestrator-gate (2026-11-12) and token-guard's provide fix (2026-11-13).
- lib/index.js is the real source: no src/ directory, no build script, package main/exports point straight at it, so no build step overwrites the edit.
- Verification: node --check lib/index.js = CHECK_OK; node selftest.mjs = ALL PASS, exit 0; plan_review verdict PASS (82/100); eslint N/A (dsh tree has no package.json and no eslint install, so node --check + selftest are the verification).
- Commit 99a0e514 contains only lib/index.js and selftest.mjs and was pushed to origin/main (ls-remote refs/heads/main matches that SHA); the pre-existing unrelated A2 edits in cost-meter/cordis.patch.yml (stepReminderThreshold/askUserLongWaitMs) were deliberately left out.
- dsh is not a classic git submodule of the skills repo (no .gitmodules entry), so no parent gitlink update was needed.
- Pending: after a DSH Web restart the startup log should no longer show `1 entry did not activate: cost-meter`.

## Status (as of 2026-11-14)
- B1 + B2 implemented and verified: node --check exit 0, inspectSize 0 occurrences in js/mjs, selftest all green.
- B1 + B2 changes were limited to lib/index.js + selftest.mjs (+149/-8) and handed over for review without auto-commit at the time.

<!-- MEMORY_FIELDS
{
  "category": "program",
  "name": "dsh_cost_meter",
  "source_extraction_id": "bc770cd55b1d44cbbbac2f7efddbb30b",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->