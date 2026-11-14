
# verification_gate
DSH orchestrator verification-gate mechanism requiring plans to include verification schemes and grok-level model sign-off before code commit/push. Orchestrator side landed 2026-11-14 (commit 03b35a14); plan-gate side (commit/push interception) entered planning same day (step 6 of handoff).

## Background
- User 2026-11-14 required: plans must include verification scheme (frontend to e2e, UI to screenshot, pure-logic to unit test); task ends only after grok-level model checks result and passes before commit/push.
- Two distinct _review.json files exist: workdir/_review.json (repo root, verification gate schema {verified, session_id, run_ts, paths[], content_sha, reason, gaps[]}, written by verify.py and read by plan-gate git-write guard) vs .plan/_review.json (E2 plan-review guard schema entries[], read by plan-gate existing checkReviewState, unrelated to verification gate).
- New git-write guard MUST read root workdir/_review.json, never confuse with .plan/_review.json.

## Orchestrator-side Implementation (landed)
- verify.py compute_content_sha hashes fixed paths[] file bytes via git status --short -z parse (rename keeps new only, delete uses sentinel, excludes _review.json itself) to avoid hash mismatch after commit empties status.
- config.yaml added verifier pool: grok-4.7@256k primary + workbuddy/deepseek-v4.1-flash fallback (failover verified: monkeypatch grok 502 auto-falls to workbuddy/deepseek-v4.1-flash returning valid JSON).
- graph.py: PLANNER_SYSTEM hard rule 4 change steps must carry verify; added node_verify; wired summarize to node_verify to END; evidence aggregated per-run in evidence_pool.
- api.py: _PLAN_REVIEW_SYSTEM enforces verification scheme (P0 only for missing/contradictory); run_full succeeded = base_ok and verified; always writes workdir/_review.json; verifier infra failure to status=error, ok=business_ok.
- orchestrator/lib/index.js renders Verification: PASS/FAIL + gaps section.

## plan-gate git-write Guard (planning 2026-11-14)
- plan-gate is zero-dependency Node package (dsh/ tree, sibling orchestrator-gate) with selftest.mjs, cordis.patch.yml; baseline selftest 21 passed, orchestrator pytest 159 passed. Git-write guard reimplements compute_content_sha in JS (sorted paths, per-path path\x1f content_normalized \x1e, sha256, exclude _review.json, unreadable to DELETED sentinel) byte-identical to Python verify.py; reuses splitSegments/tokenize from orchestrator-gate/lib/index.js.
- isGitWriteCommand returns three states: write to credential check plus hash match to pass; not-git to return null; unknown/missing command/exception to reject (fail-closed).
- git write subcommands (reset/clean/restore/switch/checkout etc.) uniformly intercepted; unknown subcommand defaults unknown; non-git pwsh explicitly return null.
- Reads root _review.json, recomputes content_sha by fixed paths; passes git write only if verified AND hash matches.
- selftest must cover git.exe/git -C/git -c, write-vs-unknown precedence, _review.json self-exclusion, args.cwd vs repoRoot consistency; hash-equality verified by invoking real Python (python -c from src.verify import compute_content_sha), not hand-copied. Plan passed plan_review 2026-11-14 (76/100, 0 P0), awaiting user confirmation; commit disposition: commit only (no push/rebuild).

## Verification and Status
- Orchestrator side: added test_verify_gate_p0.py (14 cases), fixed 8 affected old test stubs; full 159 tests pass.
- Design doc orchestrator-verification-gate-20261114.md, grok-4.7 reviewed 5 rounds all P0 merged, approved plus human_confirmed.
- Handoff doc dsh/langgraph-orchestrator/docs/verify-gate-next-round-handoff.md (step 6 plan-gate commit/push interception manual).
- Orchestrator-side code committed at 03b35a14 (orchestrator: add verification gate).
- Known risk: .plan/_review.json shared across sessions; concurrent plan_review contends causing 120s stalls (observed 2026-11-14 alongside cost-bloat-optimization-20261114 session).


<!-- MEMORY_FIELDS
{
  "category": "mechanism",
  "name": "verification_gate",
  "source_extraction_id": "4b8a2714097a455e8a72af1bcb3cd2f2",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "entities"
}
-->