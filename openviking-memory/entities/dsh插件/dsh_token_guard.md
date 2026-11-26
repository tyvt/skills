# dsh-token-guard
DSH local plugin that enforces token-cost guardrails and hard-truncates oversized tool results; source at D:/repository/skills/dsh/token-guard/lib/index.js, symlinked from ~/.dsh/token-guard, zero-dependency (imports no @deepseek-ai/*), wired into the web profile as a pnpm file: dependency.

## Files and role
- Ships lib/index.js, selftest.mjs, selftest-cordis.mjs and cordis.patch.yml.
- Original duties: grep folding, read gating, pwsh build/lint/test output capping (capPwsh triggers only for BUILD_CMD).
- Complements agent-guard (pwsh POSIX pre-check), dsh-cost-meter (interactive merge) and dsh-spill-policy (read/grep/skill big-result governance); targets the biggest waste item from the 2026-11-12 token-cost analysis (pwsh Get-Content on source files flooding the context).

## Truncation rules (as of 2026-11-10)
- grep: 2026-11-11 起折叠改为组合条件（文件数≥5 且命中数≥30），返回行号；带 -C/-A/-B 参数时不折叠（旧规则：超过 10 文件或 20 行折叠）。
- read: over 500 lines truncated with an offset/limit or grep hint; skill bodies over 2,500 chars keep only the head plus a truncation note；2026-11-11 vue 门禁放宽到 500 行。
- pwsh: npm run lint/build/test errors over 20 lines keep the first 10 and last 5 lines.
- orchestrate: returns over 1000 chars containing "无法读取"/"示意" are cut to 1000 chars.

## Rework (2026-11-12)
- capPwsh now returns {text, spillRequested, omittedLines}; read-type commands (Get-Content/Select-String/Get-ChildItem/gc/cat/type/more) are trimmed as well.
- Read-type output up to 200 lines passes through; larger output keeps head 120 + tail 40, folds the middle as "省略N行" and spills the full text to disk for read-back.
- New config pwshReadMaxLines/pwshHeadLines/pwshTailLines (defaults 200/120/40); build-branch trimming stays byte-identical (npm test baseline must pass); text:null means unchanged; a failed spill returns bounded text.

## Activation failure and fix (2026-11-13)
- Commit 11c9ae67 added `ctx.p0LogReader = logStore.read;` at lib/index.js:393; the cordis 4.1.0 Context proxy set trap throws `cannot set property "p0LogReader" without provide` for undeclared properties, so the plugin failed to activate (1 entry did not activate) — same family as orchestrator-gate's 2026-11-12 "cannot get property without inject".
- Fix: call ctx.provide?.('p0LogReader') before the assignment when available (auto-reclaimed with the fiber), else fall back to a direct assignment for bare ctx.
- Added selftest-cordis.mjs, which loads the plugin with the real cordis 4.1.0 Context shipped with DSH, plus two branch assertions at the end of selftest.mjs.

## Verification and status
- Backup at ~/.dsh/token-guard/_bak_20261112-160336.
- node selftest.mjs all green (default 250 lines→90 omitted, non-default config→51 omitted, 20 lines unchanged, build regression, new assertions); node selftest-cordis.mjs OK (no activation error, root.p0LogReader readable back).
- Local commit d23f1191 bundles the 2026-11-12 uncommitted pwsh read trimming (188 lines), 3 cordis.patch.yml config lines and the 2026-11-13 provide fix (4 files, +338/−55); push did not complete (GitHub unreachable).
- Needs a DSH Web restart/plugin reload; afterwards the log should no longer show `1 entry did not activate: token-guard`.
- Its provide fix is cited on 2026-11-16 as the precedent for the cost-meter inject fix.

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "dsh_token_guard",
  "source_extraction_id": "99c80217e9b04daa9be298ae8ceac4bb",
  "version": 4,
  "memory_type": "entities"
}
-->