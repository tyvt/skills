# Summary
2026-11-12 将 blockBuildLint 改为 true，修正 selftest.mjs 两处陈旧断言("build off by default"→"build on by default"、config 关不掉硬编码 true)后 selftest 80 项通过，profile 副本 hash A3DA26C1 一致；需用户重启 Web(PID 17740) 生效，重启后预期 npm run build 等被 [orchestrator-gate] 拦截。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...整读拦截：对 dsh\dcwhc\lib\index.js（47KB > 40KB 阈值）不带 offset 读取
M1 实测：用 orchestrate 跑一个内部需要 grep 的复杂任务，观察子工具是否二次触发 gate / 豁免是否生效
...
**assistant [peer=github.com-tyvt-skills]**: This zero-dependency Node plugin has no `npm run build`; its test is `selftest.mjs`. Let me sync profile copy, run selftest (my test baseline), and verify the build/lint classifier logic directly before restart.
**assistant [peer=github.com-tyvt-skills]**: The selftest now **fails** with `blockBuildLint: true`. This is a real regression — likely a selftest assertion that assumed the default `blockBuildLint:false`, OR a genuine behavior case. Let me read the failure.
**assistant [peer=github.com-tyvt-skills]**: The failure is an **assertion that hardcodes the intended default**: `selftest.mjs:181` checks "build off by default: expected pass, got block". This is a stale expectation tied to `blockBuildLint:false`. Since we're deliberately flipping it on, the selftest must be updated to reflect the new contract. Let me read that section of selftest.
**assistant [peer=github.com-tyvt-skills]**: I see the test structure. Line 178-181 is a "放行（默认关）" section. The test at 181 asserts `npm run build` passes *by default* — that assumption is now false since we deliberately enabled `blockBuildLint`. This isn't just a stale test: it's exactly the case we now want blocked. I should update it to assert the **new contract**: `npm run build` is now BLOCKED, and add a positive build-lint case. But I must be careful — `npm run build` matching depends on `classifyBuild`. Let me check what strings classifyBuild blocks and see the `withRules` helper.
**assistant [peer=github.com-tyvt-skills]**: I understand. Test line 181 is under a "放行（默认关）" section and asserts build passes by default. Now that `blockBuildLint` is permanently `true`, the assertion "build off by default" is obsolete and wrong. The right fix: change it to reflect that `npm run build` is now blocked by default, and keep the subagent-exempt case. Let me check `classifyBuild` for `npm run build` behavior to be sure it blocks.
**assistant [peer=github.com-tyvt-skills]**: `npm run build` will hit the `npm ... run build` branch and be classified as full build → blocked when `blockBuildLint:true`. Rather than read more code, I'll just empirically confirm by fixing the two relevant selftest lines and running.

I'll update the obsolete default assumption. Line 181 `build off by default` → now build is on, so `npm run build` should BLOCK. I'll rewrite it as a positive build-lint block case. Line 180 (subagent npm run build → pass) stays valid (exemption). Let me also scan lines 226-229 to see if any other default-build assertions exist.
**assistant [peer=github.com-tyvt-skills]**: Now I see the two issues clearly:

- **Line 181**: `build off by default` asserts `npm run build` passes — obsolete, now it blocks. Must flip.
- **Line 216-222**: "config switch ignored" — asserts that a config `blockBuildLint:true` has **no effect** (because rules are hardcoded). But now `RULES.blockBuildLint` is `true` hardcoded, so `npm run build` WILL block → this test (which expects `false`) also breaks. This test's *intent* is "config can't override hardcoded rules" — the correct way to test that is to set config `blockBuildLint:false` and confirm it still blocks (config-honored=false). Let me fix both to preserve intent.

Line 181 fix:
- `check("build on by default (npm run build blocks)", decide("pwsh", { command: "npm run build" }), true);`

Line 216-222 fix:
- Change config to `blockBuildLint: false` and expect block (`true`) — proving config cannot turn the hardcoded `true` off.
**assistant [peer=github.com-tyvt-skills]**: Now run the selftest again. `selftest.mjs` is at repo `dsh/` (not the profile copy), so no re-sync needed for it — only `lib/index.js` matters for the running plugin.
**assistant [peer=github.com-tyvt-skills]**: Selftest back to **80 checks ok** with `blockBuildLint: true` and corrected assertions. Profile copy already synced (hash `A3DA26C1…`). Now verify the build-lint classifier directly with the new rules to know post-restart expectations:
**assistant [peer=github.com-tyvt-skills]**: Build-lint classifier confirmed correct with `blockBuildLint:true`:
- **Block**: `npm run build`, `pnpm build`, `tsc -b`, bare `tsc`, whole-tree `eslint .` ✅
- **Allow**: subagent `npm run build` (exemption) ✅, single-file eslint ✅

All logic verified. Now needs a restart to take effect. Per your established pattern, you restart Web yourself.

<!-- MEMORY_FIELDS
{
  "event_name": "blockBuildLint启用待重启",
  "goal": "启用构建拦截",
  "summary": "2026-11-12 将 blockBuildLint 改为 true，修正 selftest.mjs 两处陈旧断言(\"build off by default\"→\"build on by default\"、config 关不掉硬编码 true)后 selftest 80 项通过，profile 副本 hash A3DA26C1 一致；需用户重启 Web(PID 17740) 生效，重启后预期 npm run build 等被 [orchestrator-gate] 拦截。",
  "ranges": "1,42-61",
  "source_extraction_id": "eb213da6abef4bf5ad6baac532f0e529",
  "version": 1,
  "memory_type": "events"
}
-->