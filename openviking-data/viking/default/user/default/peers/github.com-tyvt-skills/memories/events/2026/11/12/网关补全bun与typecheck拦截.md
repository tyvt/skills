# Summary
用户审计文档指出 bun run typecheck 未被 orchestrator-gate 拦截（bun 不在 BINS）。助手在 dsh/orchestrator-gate/lib/index.js 将 bun/bunx 纳入 BINS，peelBin 支持 bunx/bun x，classifyBuild 把 bun 与 npm/pnpm/yarn 同等处理，FULL_SCRIPTS 新增 typecheck/type-check/tsc/vue-tsc（此前 npm run typecheck 也不拦）；selftest.mjs 新增 23 条用例，总数由 76 增至 99，随 commit 82f4e405 于 2026-11-12 提交（仅 4 文件，未推送）。
# 2026-11-12 (Thursday) ChatLog:
**user [peer=github.com-tyvt-skills]**: ...}
```

`open_contracts` 是关键：凡是计划里出现、但仓库零引用的外部契约，都进这里，旗舰据此执行 R2 打回。

---

# 四、顺手给 gate 的两条建议（基于本次日志）

1. **补规则**：把 `bun run typecheck` / `pnpm typecheck` / `vue-tsc` 纳入「全量构建类」拦截模式。本次它整项目跑 typecheck 未被拦，是规则按 `npx eslint|npm run build` 文本匹配留下的缝。
2. **复核阈值**：`mine/index.vue`（356 行）整读未被 token-guard 拦，说明 >300 行的判定在部分路径失效，建议对 read 工具的入口统一校验行数。

---
...
**assistant [peer=github.com-tyvt-skills]**: The gate plugin exists at `dsh\orchestrator-gate\lib\index.js`. The document's "两条建议" (add `bun run typecheck` to build-lint interception; fix the >300-line whole-read threshold on some paths) are concrete, actionable fixes against real code here.

So the realistic interpretation: the user handed me an audit + recommendations, and likely wants the two gate fixes applied (the parts that are "我的活儿" in this repo) — the prompt files are suggestions they may want saved too. But this is genuinely ambiguous and touches a security-sensitive plugin, so I must ask before modifying guard behavior.

Let me look at the relevant sections of the gate so my question is precise and I can act immediately after the answer.
**assistant [peer=github.com-tyvt-skills]**: Interesting — the gate already has `blockBuildLint: true` and `tscTreatProjectFlagAsFull` / `allowSingleFileTsc` / `blockBareTsc` rules. So the first "建议" (catch `bun run typecheck`) may already be partially addressed, or `bun` is simply missing from `BINS` (line 39: `npm, pnpm, yarn, npx, eslint, tsc, vue-tsc, vite` — no `bun`). That's a real, concrete gap.

The second gap (>300-line whole-read not blocked for `mine/index.vue` 356 lines) needs a look at the read guard around line 450.

Before I ask the user anything, let me gather the exact facts so my question/plan is grounded. Let me read the read-guard section and the build-lint classifier.
**assistant [peer=github.com-tyvt-skills]**: Now let me read `classifyRead` (the whole-read byte threshold logic) to understand the second gap precisely — where "356 lines not blocked" could happen.
**assistant [peer=github.com-tyvt-skills]**: Now I fully understand the actual code. Key facts:

1. **`bun` is not in `BINS`** (line 39) and `classifyBuild` only handles `npm/pnpm/yarn` for `run typecheck`, plus `vite/eslint/tsc/vue-tsc`. So `bun run typecheck` → `headOf` = `bun`, not in `BUILD_LINT_NON_EXEC`, then falls through all branches → `null` = **not blocked**. Confirmed real gap #1.

2. **Whole-read guard is byte-based, not line-based** (`wholeReadBytesVue: 61440`, `wholeReadBytesOther: 40960`). The audit said "356 行 > 300 阈值未拦" — but the code doesn't use a 300-line threshold at all; it uses 40KB/60KB bytes. A 356-line `mine/index.vue` under 60KB would correctly pass. So "gap #2" is a **misreading of the audit**: the actual threshold isn't lines. Not necessarily a bug — it's a design choice. This is a plan-class judgment, exactly what the audit itself says should go to the "flagship".

Critically: this touches a **security/guard plugin**, and the audit doc is *analysis*, not an instruction. I now have enough facts to ask one precise question instead of guessing scope. Per AGENTS.md, I ask only for genuinely ambiguous/high-risk choices via `ask_user_question`.
**assistant [peer=github.com-tyvt-skills]**: Scope confirmed:
1. Fix gate: add `bun` to build/lint interception.
2. Write the dual-model prompt + plan.json contract as files.
3. Commit only (no push).

Let me set up todos and gather the remaining facts I need (there may be subagents to use — but no teammates exist, so I'll do it directly). First let me read the rest of the gate file (tests, argv helpers) and check for existing tests before editing.
**assistant [peer=github.com-tyvt-skills]**: Now I understand the structure fully. `bun` needs to be:
- added to `BINS` (line 39) so `isQueryOnly`/peel works,
- handled in `classifyBuild`: `bun run <script>` should be treated like `npm/pnpm/yarn run`, and `bunx`/`bun x` peel like npx.

Let me check for existing tests so I extend rather than break them.
**assistant [peer=github.com-tyvt-skills]**: There's a `selftest.mjs`. Let me read it to understand the test harness and extend it correctly.
**assistant [peer=github.com-tyvt-skills]**: I have everything. Now the design for the `bun` fix:

`classifyBuild` currently:
- `npm/pnpm/yarn` block handles `run <script>`, `exec`, and bare `<script>`.
- I'll extend that head-check to include `bun` and `bunx`. Semantics:
  - `bun run typecheck|build|lint` → block (same as npm run).
  - `bun typecheck` (bun allows omitting `run`) → should also block, like npm bare.
  - `bunx <bin>` peels like `npx`.

`peelBin` handles `npx` and `(pnpm|npm) exec`. For `bunx` I'll treat like npx. `bun x <bin>` also — bun uses `bunx` or `bun x`.

But careful: `bun dev` / `bun install` / `bun --version` must pass. The bare-script path in npm block already only blocks `build/lint/build:*`/`lint:*` names, so `bun install`/`bun dev` pass. Good. And `bun run dev` passes. `bun --version` → `isQueryOnly` needs `bun` in BINS and `--version` in QUERY_FLAGS → returns null early. Good.

For `typecheck` — note npm block only blocks `build`/`lint`/`build:*`/`lint:*`. It does **not** block `typecheck` even for npm! The audit specifically wants `bun run typecheck` caught. So I must add `typecheck`/`type-check`/`tsc`/`vue-tsc` script names to the blocked script set. Let me verify: would `npm run typecheck` currently be blocked? Looking at line 225: only `build`, `lint`, `build:*`, `lint:*`. So `npm run typecheck` is **not** blocked today either. The audit's complaint is broader: typecheck as a full-project op isn't recognized.

So the fix should: (a) add `bun`/`bunx` to BINS + peelBin + classifyBuild; (b) expand the blocked script names to include `typecheck`, `type-check`, `tsc`, `vue-tsc` for all package managers. Let me define a shared set.

Let me check `headOf`/`peelBin` and the npm-head check to write a clean edit. I'll make targeted edits.
**assistant [peer=github.com-tyvt-skills]**: Now the `classifyBuild` npm/pnpm/yarn block: extend to `bun`, and add typecheck-family script names. Let me introduce a shared set and update the block.
**assistant [peer=github.com-tyvt-skills]**: Now also extend `scriptRuns` (billing detection) to recognize `bun` so a wrapped `bun` inside a script counts — for consistency. And add tests. First let me add `bun`/`bunx` to that regex:
**assistant [peer=github.com-tyvt-skills]**: Now add test cases to `selftest.mjs` in the S1 block. Let me insert bun cases into the `block` and `pass` arrays.
**assistant [peer=github.com-tyvt-skills]**: Now the pass cases — critical to verify `bun` dev/install/version and single-file `bunx eslint <file>` still pass.
**assistant [peer=github.com-tyvt-skills]**: Now run the selftest.
**assistant [peer=github.com-tyvt-skills]**: `bun x eslint src/**/*.ts` — glob case passes when it should block. Issue: the `bun` head-check runs before `peelBin`. `bun x eslint ...` → `argv[1]` is `x`, which I added as a "bun subcommand → return null" early. But `bun x` must route to `peelBin`/eslint classification. Fix: handle `bun x` by recursing to classify the inner argv (like `exec`), not returning null.
**assistant [peer=github.com-tyvt-skills]**: Wait — `isQueryOnly` calls `peelBin` which for `bun x` now yields bin=`eslint`. But the `else -h/--version` entry: for `bun --version`, `argv[1]` is `--version`; but `isQueryOnly` already returns true at the top (bun in BINS, rest=`--version` in QUERY_FLAGS → null). Good, that path never reaches here. Rerun:
**assistant [peer=github.com-tyvt-skills]**: All 99 checks pass (was 76; +23 new bun/typecheck cases). Let me update todos and verify the diff of the gate file is clean, then move to writing the prompt/contract files.
**assistant [peer=github.com-tyvt-skills]**: Important: the working tree already has **many pre-existing uncommitted changes** from other work (agent-guard, cost-meter, mcp-gateway, token-guard, zentao-analyzer) plus untracked files. Those are **not mine**. I must commit **only** my two files (`dsh/orchestrator-gate/lib/index.js`, `dsh/orchestrator-gate/selftest.mjs`) — plus the prompt/contract files I'm about to create. Per AGENTS.md: stage specific paths, never `git add -A`.

Let me verify my two files' diffs are exactly what I intended, then create the prompt/contract files. First the diff:
...
**assistant [peer=github.com-tyvt-skills]**: Now stage exactly my files and commit. My scope:
- `dsh/orchestrator-gate/lib/index.js`
- `dsh/orchestrator-gate/selftest.mjs`
- `dsh-token-policy/references/dual-model-prompts.md` (new)
- `dsh-token-policy/references/plan-contract.md` (new)

I will **not** stage any of the pre-existing dirty files. Let me verify status of only my targets, stage them explicitly, then commit with `GIT_EDITOR=true`.
**assistant [peer=github.com-tyvt-skills]**: Exactly the four intended files staged, nothing else. Now commit.
**assistant [peer=github.com-tyvt-skills]**: Committed. Let me do final verification: confirm the selftest still passes on the committed state, confirm the pre-existing dirty files remain untouched, and finalize todos.
**assistant [peer=github.com-tyvt-skills]**: 99 checks pass, and the commit contains only my 4 files. All pre-existing dirt (other plugins' edits, SKILL.md, untracked `precheck.js`/reports) is untouched and unstaged — exactly as required.
...
**assistant [peer=github.com-tyvt-skills]**: 全部完成，仅提交、未推送。

## 改了什么

**1. Gate 补漏（真实缺口，已修）** — [`dsh/orchestrator-gate/lib/index.js`](dsh/orchestrator-gate/lib/index.js)
- `bun` 原来根本不在 `BINS` 里，`bun run typecheck` 走到 `classifyBuild` 全是 `null`，**完全不拦**——这是你文档第 1 条建议的根因。
- 改动：`bun`/`bunx` 纳入 `BINS`；`peelBin` 支持 `bunx <bin>` 与 `bun x <bin>`；`classifyBuild` 把 `bun run <script>` / `bun <script>` 与 npm/pnpm/yarn 同等对待，并把 `bun install/add/x/...` 等子命令明确放行。
- 顺带发现：原代码的脚本名白名单只有 `build`/`lint`/`build:*`/`lint:*`，**`npm run typecheck` 以前也不拦**。已把 `typecheck`/`type-check`/`tsc`/`vue-tsc` 及其 `:` 变体统一纳入 `FULL_SCRIPTS`，对所有包管理器生效。

**2. 单测** — [`dsh/orchestrator-gate/selftest.mjs`](dsh/orchestrator-gate/selftest.mjs)：新增 23 条用例。**`selftest ok: 99 checks`**（原 76）。关键验证：`bun run typecheck`/`bun run build`/`bunx eslint` 被拦；`bun run dev`/`bun install`/`bun --version`/单文件 `bunx eslint <file>` 仍放行。

**3. 双模型 Prompt + 契约（成文件）**
- [`dsh-token-policy/references/dual-model-prompts.md`](dsh-token-policy/references/dual-model-prompts.md) — 旗舰「计划审阅官」Prompt（R1–R6 打回条件 + 只读事实核对）与便宜模型「执行」约束 Prompt。
- [`dsh-token-policy/references/plan-contract.md`](dsh-token-policy/references/plan-contract.md) — `plan.json` schema 与字段约束，突出 `open_contracts` 作为「猜外部契约」的暴露抓手。

## 怎么验证的
- `node selftest.mjs` → `selftest ok: 99 checks`（真实执行，非推断）。
- `git show --stat`：commit `82f4e405`，**4 files changed，197 insertions，9 deletions**，只含上面 4 个文件。

## 你文档里我需要更正的一点
你第 2 条建议「`mine/index.vue` 356 行整读没被拦，说明 >300 行阈值失效」——**这是误读**。gate 的整读阈值是**按字节**（普通 40KB / `.vue` 60KB，见 `classifyRead`），不是按行。356 行的 `.vue` 只要 <60KB 本来就该放行，不是 bug。所以这条没改（按字节还是按行是设计取舍，属旗舰决策，不该由我顺带改）。

## 未纳入本次提交的脏文件
工作区存在大量**与本次无关的既有改动**（别人/在途）：`agent-guard`、`cost-meter`、`mcp-gateway`、`token-guard`、`zentao-analyzer` 的多处修改，以及 `dsh-token-policy/SKILL.md`（别人对守卫说明的重写——我特意没动、没 stage），还有未跟踪的 `mcp-gateway/lib/precheck.js`、`dsh/reports/optimization-landing-2026-11-11-v2.md`。全部原样保留、未提交。

> 提醒：gate 是硬编码开关，**需重启 Web 才生效**于我后面的任何一次实际拦截。

<!-- MEMORY_FIELDS
{
  "event_name": "网关补全bun与typecheck拦截",
  "goal": "补全构建类拦截规则",
  "summary": "用户审计文档指出 bun run typecheck 未被 orchestrator-gate 拦截（bun 不在 BINS）。助手在 dsh/orchestrator-gate/lib/index.js 将 bun/bunx 纳入 BINS，peelBin 支持 bunx/bun x，classifyBuild 把 bun 与 npm/pnpm/yarn 同等处理，FULL_SCRIPTS 新增 typecheck/type-check/tsc/vue-tsc（此前 npm run typecheck 也不拦）；selftest.mjs 新增 23 条用例，总数由 76 增至 99，随 commit 82f4e405 于 2026-11-12 提交（仅 4 文件，未推送）。",
  "ranges": "55-57,66-107,116-122,126-139",
  "source_extraction_id": "25ad0de73bae476d9e5933c26df1a4ac",
  "version": 1,
  "memory_type": "events"
}
-->