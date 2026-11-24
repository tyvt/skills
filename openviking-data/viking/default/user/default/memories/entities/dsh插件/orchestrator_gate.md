# orchestrator-gate
DSH Web gateway plugin (orchestrator gate) that intercepts tool calls before execution and forces heavy work through the orchestrator; code lives at D:\repository\skills\dsh\orchestrator-gate.

## Rules and config
- ctx.tools.guard() runs before each tool call; a rejection starts with `[orchestrator-gate]` and tells the model to switch to orchestrate — calls are never auto-forwarded.
- Grep at path depth >=2, or inside any moduleRoots entry, passes; grep at a repo root (e.g. `.` or `D:\repository\skills`) is hard-blocked.
- blockBuildLint:false and blockWholeRead:false switch off build/whole-read blocking; first start enables only blockRootGrep=true.
- Rule switches are hardcoded in RULES inside lib/index.js, so same-named config fields have no effect; built per DESIGN.md v9 and passes 80 self-tests in node selftest.mjs.
- Defaults: repoRoots only D:\repository\skills; moduleRoots src/views/ and dsh/; grepMinDepth 2.

## Deployment and loading
- Mounted via symlink ~/.dsh/orchestrator-gate, a web-profile package.json dependency (file:../../orchestrator-gate) and dsh.profile.bundles; takes effect after a Web restart.
- pnpm install materialises the package as a real node_modules copy (not a symlink); after source edits run pnpm install --force to refresh that copy and restart, otherwise Web keeps loading the old snapshot.

## Root causes and fixes
- Early cause: `export const inject = []` in lib/index.js left the plugin inactive with a cordis error; fixed to inject = ["tools"] (line 17).
- Real cause (2026-11-12): cordis.patch.yml carried a non-inherited Write DENY ACL for DESKTOP-0AKGC7K\Administrator, so pnpm's hardlink copy failed (os error 5), the whole install aborted, and node_modules kept the old gate copy (10:30 version, 18937 bytes) while the new source (11:13, 21561 bytes, with rulesFingerprint start-up log) never loaded; the other 6 file: plugins reinstalled successfully at 11:44, only gate missed the refresh.
- Fix: Set-Acl removed the Write DENY; pnpm install --force --no-lockfile succeeded and node_modules matched the source hash (21561 bytes).
- After the user restarted Web (new process 11:52:37) a root-level grep was blocked by `[orchestrator-gate]`, confirming the new gate loaded.
- Second refresh: the assistant found the node_modules copy still the 12:33 snapshot and re-ran pnpm install --force --no-lockfile in profiles\web; lib/index.js hash 183C0EF1… and selftest.mjs hash 266EEE9B… now match the source, and the user was asked to restart again and verify loading via log fingerprint 7d4a5962 plus a real interception probe.

## Verification and commits
- A real grep against D:\repository\skills (repo root, insufficient depth) was blocked by `[orchestrator-gate]`.
- orchestrate op=full run: plan to cursor/grok-4.7@256k, execute(file_reader) to workbuddy/glm-5.3-flash, summarize to workbuddy/glm-5.3-flash, with per-model costs logged.
- Early commit: dsh/orchestrator-gate/ (5 files), commit 9acaf317, not pushed.

<!-- MEMORY_FIELDS
{
  "category": "DSH插件",
  "name": "orchestrator_gate",
  "source_extraction_id": "11a9ac8607854987a4541fd8aef492b9",
  "version": 9,
  "memory_type": "entities"
}
-->