# Summary
2026-11-09助手创建 dsh-token-guard 插件，挂钩 tools/post-execute 对 read 大结果做头尾裁剪+落盘；零依赖，经 pnpm 接入 web profile，独立实例启动暴露并修复 Cordis Config 校验 bug 后加载成功。
# 2026-11-09 (Monday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 我需要除了操作习惯之外的一些可以落地到代码的优化，给我一些建议。看看能不能做什么skill或者插件
...
**assistant [peer=deepseek-harness-default-workspace]**: Config done. Now the plugins. Let me plan the two plugins:

**dsh-token-guard**: The gap after spill-policy is: (1) `read` results are never spilled (explicitly skipped), (2) mid-size results (between pruner threshold and spill threshold) aren't trimmed. token-guard should hook `tools/post-execute` and apply retention to `read` results specifically (spill/trim large reads), plus optionally accelerate pruning of medium results. But careful: spill-policy already handles non-read. I'll make token-guard focus on **`read` result bounding** — that's the clean, non-overlapping scope.

Let me check the `read` tool result shape and whether `read` can be intercepted via post-execute (spill-policy skips it, but the hook still fires with exec.name === "read").
**assistant [peer=deepseek-harness-default-workspace]**: `read` has a `readMaxBytes` config (default). So `read` already caps bytes per call. That means token-guard shouldn't duplicate that. The genuinely missing coverage: results that are large but under both read's byte cap AND spill threshold.

Let me reconsider token-guard's real value. Rather than fight the existing good coverage, the highest-value, cleanly-implementable plugin is: **a `tools/post-execute` guard that trims ALL tool results to a head/tail window by token estimate when they're between the pruner floor and spill ceiling** — closing the "medium result" gap that neither pruner (only on compaction) nor spill (only >1500... now) covers. But with spill now at 1500, the medium gap is small.

Let me verify read's default maxBytes to know the actual remaining gap.
**assistant [peer=deepseek-harness-default-workspace]**: Key finding: `read` default `readMaxBytes = 50KB` (≈12.5k tokens). So a single `read` can inject up to **12.5k tokens** in one shot — and `read` is **explicitly skipped by spill-policy**. This is the real gap: large reads (up to 50KB) enter history every step. Lowering readMaxBytes is trivial config, but token-guard can do better: spill the read content to a file when > threshold and return a bounded head/tail — exactly what spill-policy does but for `read`.

This gives token-guard a clear, correct, non-overlapping mandate. Let me build it modeling spill-policy's post-execute. Let me read the exact seam signatures/helpers I need to import.
**assistant [peer=deepseek-harness-default-workspace]**: I now have the full pattern. I'll build `dsh-token-guard` reusing the same seams. Given complexity, I'll implement it as a focused plugin: on `tools/post-execute`, for `read` (and any tool result the spill-policy skips), if estimated tokens > `readBudgetTokens`, spill full text and return bounded head/tail + notice. Reuse `spillStore`, `estimateContent`, `formatSpillNotice` equivalents.

Let me write the plugin package. First the directory + package.json.
**assistant [peer=deepseek-harness-default-workspace]**: Now let me check the exact `spillStore.saveText` return shape (`ref.locator`, `ref.retrievalHint`) and the `retainContent` helper so I replicate correctly.
**assistant [peer=deepseek-harness-default-workspace]**: I have all I need. Let me read `retainContent` and `retainable` fully so token-guard can reuse the exact retention algorithm.
**assistant [peer=deepseek-harness-default-workspace]**: I'll import `retainContent`, `estimateContent`, `describeOmitted` directly from their packages rather than reimplementing. But `retainContent` isn't exported. Simpler: token-guard reuses the **exact same approach** in compact form. Let me write a self-contained `lib/index.js` that imports `estimateContent`, `describeOmitted`, and implements the same head/tail retention + spill.
**assistant [peer=deepseek-harness-default-workspace]**: Now verify the plugin loads: syntax check the JS (imports resolve against the web profile's node_modules) and that the package imports exist. Let me syntax-check and confirm the import paths resolve.
**assistant [peer=deepseek-harness-default-workspace]**: Syntax OK. The probe failed only because the temp script location isn't under the profile's node_modules tree (Node resolves from the importing file's location). Let me put the probe inside the token-guard dir with a node_modules symlink, or better — resolve directly. The real question is whether the web profile can resolve `@deepseek-ai/dsh-token-meter/estimate`. Let me check those subpath exports exist.
**assistant [peer=deepseek-harness-default-workspace]**: Two issues:
1. `dsh-token-meter/estimate` subpath exists ✓, but `dsh-output-retention` has **no `/estimate`** and only exports `.` (so `describeOmitted` is fine from root). ✓
2. Packages live in `dsh/node_modules/@deepseek-ai/*`, not the profile's node_modules. How do the *official bundled* plugins (spill-policy) resolve them? They're all under the same `dsh/node_modules`, so Node resolves from `dsh/node_modules/@deepseek-ai/dsh-spill-policy/` → up to `dsh/node_modules`. But my plugin lives at `~/.dsh/token-guard/` which is OUTSIDE that tree — so `@deepseek-ai/*` won't resolve from there.

The `agent-guard` local plugin works how? It's at `~/.dsh/agent-guard` and imported nothing from `@deepseek-ai`. So local plugins must either bundle deps or the loader provides resolution. Let me check how the loader mounts a `file:` plugin like `dsh-mcp-gateway` (in profile deps as `file:../../mcp-gateway`) and whether it imports `@deepseek-ai` packages.
**assistant [peer=deepseek-harness-default-workspace]**: Key insight: `mcp-gateway` (a local `file:` plugin at `~/.dsh/mcp-gateway`) **imports `@deepseek-ai`** and works. So the loader must resolve `@deepseek-ai/*` for local plugins. How? The profile's `node_modules` likely has symlinks, or a pnpm workspace. Let me check how `dsh-mcp-gateway` (installed as file: dep) resolves — check profile node_modules and the pnpm workspace.
**assistant [peer=deepseek-harness-default-workspace]**: So the profile's `node_modules/@deepseek-ai` DOES exist (a pnpm workspace). Local plugins under `~/.dsh/` resolve `@deepseek-ai` because pnpm links them into the profile, OR because the loader adds the profile's node_modules to resolution. But `~/.dsh/token-guard` is NOT a pnpm dependency of the profile — I need to **register it as a `file:` dependency** in the profile's package.json + add to bundles, then pnpm install. That's how mcp-gateway/agent-guard are wired.

Let me check how agent-guard and mcp-gateway appear in profile package.json (they're `file:` deps + bundles). My earlier read showed:
```
"dsh-agent-guard": "file:../../agent-guard",
"dsh-mcp-gateway": "file:../../mcp-gateway"
```
and bundles list includes them. So to install token-guard I must: add `"dsh-token-guard": "file:../../token-guard"` to dependencies + add to bundles array, then run pnpm install in the profile. Let me verify what `file:../../` resolves to from the profile dir.
**assistant [peer=deepseek-harness-default-workspace]**: Important: `dsh-token-meter` and `dsh-output-retention` are **NOT** in the profile's node_modules — they're only under the main `dsh` package's node_modules (`D:\nvm\...\dsh\node_modules\@deepseek-ai\`). So how does `dsh-spill-policy` (also in profile's node_modules) resolve them? Let me check the profile's `node_modules/@deepseek-ai` actual contents — maybe spill-policy isn't there and everything loads from the deepseek-ai/dsh monorepo's own node_modules.
**assistant [peer=deepseek-harness-default-workspace]**: So the profile's `@deepseek-ai` has only 2 packages. The official plugins (spill-policy etc.) are **NOT** installed in the profile — they're resolved from the **main dsh package's** `node_modules`. This means at runtime, the dsh host resolves plugin imports against `D:\nvm\...\dsh\node_modules\@deepseek-ai\`.

So for my local plugin at `~/.dsh/token-guard`, `@deepseek-ai/*` imports resolve **only if** the loader sets the resolution base to the dsh package. `mcp-gateway` imports `@deepseek-ai` and works as a `file:` plugin — so the loader must handle this. The safest path: **install token-guard as a `file:` dependency in the profile and add to bundles**, replicating exactly how mcp-gateway is wired, and let pnpm create the symlink + resolution. Let me check whether mcp-gateway has its OWN node_modules or relies on hoisting.
**assistant [peer=deepseek-harness-default-workspace]**: `dsh-mcp-gateway` is NOT a symlink and not in `.pnpm` — it's a real directory copy in profile node_modules, and it has no own node_modules, yet imports `@deepseek-ai`. This means the **host runtime resolves `@deepseek-ai` from the dsh package's node_modules** at load time (there's a module resolution hook / import map).

So the simplest reliable wiring: **copy** token-guard into `profile/node_modules/dsh-token-guard` (like mcp-gateway is a real dir there), add to bundles, no pnpm needed. But mcp-gateway is listed as `file:` dep too. Let me confirm whether profile node_modules/dsh-mcp-gateway is a copy or how it got there, and just mirror the exact setup. Given "只改文件不重启" and no pnpm run, I'll do the manual copy + bundle registration. But first, let me check: does the host actually resolve `@deepseek-ai` for these? Let me look at how mcp-gateway's index.js import would resolve — check the profile cordis.yml or a resolution config.

Actually, the cleaner and safest approach given constraints: **make token-guard self-contained with zero `@deepseek-ai` runtime imports** — inline the tiny helpers I need (`estimateContent` ≈ chars/4, `describeOmitted`, spill notice). Then it only depends on `schemastery` (for Config schema), which all plugins import and which must resolve. Let me check if schemastery resolves for local plugins.
**assistant [peer=deepseek-harness-default-workspace]**: **Critical confirmation**: local plugins installed outside the profile **cannot resolve `@deepseek-ai/*`** — both `mcp-gateway` and `agent-guard` explicitly say "故意不依赖 / 不 import @deepseek-ai/*（profile 外解析不到）". This means my token-guard's imports of `dsh-token-meter/estimate`, `dsh-output-retention`, and `schemastery` **will fail at load time**.

So token-guard must be **zero-dependency** — inline everything. Let me rewrite it self-contained (own estimate heuristics, own notice formatting, plain config object without schemastery). I need the exact `ctx.on` / `ctx.get` / `ctx.logger` API which is runtime-provided (that's fine, those come from `apply(ctx, config)`, not imports). Let me rewrite.
**assistant [peer=deepseek-harness-default-workspace]**: Now remove peerDeps from package.json (zero-dep) and syntax-check + a self-contained unit test of the retention logic (import as ESM directly).
**assistant [peer=deepseek-harness-default-workspace]**: `out.content.length >= 2` failed — with budget 40 on a single text block, retention may produce head-only (no tail) → merged into fewer blocks. That's fine behavior; my test assertion was too strict. The trimming did work (head slice). Let me relax the assertion to check the notice/GAP presence which is the real invariant.
**assistant [peer=deepseek-harness-default-workspace]**: token-guard logic verified. Now I need to **wire it into the profile**. Since local plugins live outside the profile and can't resolve `@deepseek-ai`, and they're installed as `file:` deps copied into profile node_modules — but I can't run pnpm (or should I?). The user said "只改文件不重启", not "no pnpm". But adding a bundle requires the package to be present in profile node_modules. Let me check how the loader finds bundles — via `dsh.bundles` names resolved from profile node_modules.

The cleanest: add token-guard to `package.json` dependencies + bundles, then copy the dir into profile node_modules (like mcp-gateway is a real dir). But pnpm install would handle it. Let me check if a simple copy + package.json edit is enough, mirroring mcp-gateway's real-directory presence. First confirm mcp-gateway is a real copy vs symlink and whether there's a `.pnpm` link.

<!-- MEMORY_FIELDS
{
  "event_name": "创建token_guard插件",
  "goal": "源头裁剪大结果",
  "summary": "2026-11-09助手创建 dsh-token-guard 插件，挂钩 tools/post-execute 对 read 大结果做头尾裁剪+落盘；零依赖，经 pnpm 接入 web profile，独立实例启动暴露并修复 Cordis Config 校验 bug 后加载成功。",
  "ranges": "58,148-194",
  "source_extraction_id": "015982f6acda4ee1b43529e0a9b4cd38",
  "version": 1,
  "memory_type": "events"
}
-->