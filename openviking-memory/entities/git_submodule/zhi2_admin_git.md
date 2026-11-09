# zhi2-web-admin Git Submodule Workflow
zhi2-web-admin is a submodule of parent repo «门户»; independent git repo; changes go through submodule worktrees.

## Standard Workflow
- Develop in independent submodule worktree → commit → fast-forward merge to develop/v3.0.0 and push → commit gitlink (M zhi2-web-admin) in parent and push parent → delete worktree + temp branch.
- Exception: user says "work on mainline branch" → develop directly on mainline (e.g. develop/v2.6.2-suzhufang) without worktree (task2295 monthly report export).
- Parent `git worktree add` auto-provisions nested submodule worktree (.git → .git/worktrees/.../modules/zhi2-web-admin) but submodule files empty until `git submodule update --init` in new parent worktree.
- Parent `-b` branches only the parent; create the submodule task branch separately after.
- Example 2026-11-09: worktree for fix/contract-version-dialog-public-component from clean HEAD; populated submodule; branched submodule to same name.
- Example 2026-11-09: worktree `D:\repository\苏州市房地产监测V3-wt-bug-6363` (submodule branch `fix/bug-6363-attachment-lost` on record commit `6009ddf16`); clean `npm install` restored `eslint-plugin-duplicate-attributes` symlink, `npm run lint` ran (12,509 pre-existing baseline, changed file zero-referenced), `npm run build` passed.

## Build / Lint Verification
- Worktree lacks node_modules; borrow main workspace node_modules for SFC compile check; pure Vue2 Options API pages compile-safe if consistent.
- Forbid PowerShell Get/Set-Content on Chinese Vue files (breaks UTF-8+BOM); use read/edit tools.
- Worktree cut from HEAD excludes main uncommitted changes; build verify in main workspace (vite under worktree stricter may fail).
- Yulin submodule worktree shares vite rootDir D:/repository/榆林G; build writes same dist and overwrites → isolate with --outDir; Yulin changes land on develop/v2.6.2-yulin (submodule only, no parent branch).
- Lint verification: submodule declares `eslint-plugin-duplicate-attributes: "file:eslint-rules"`; main working tree's `eslint-rules/` deletions break that `file:` symlink so main node_modules lacks the plugin and `npm run lint` fails to load it. A clean `npm install` in the worktree (intact `eslint-rules/`) restores the plugin, then `npm run lint` runs but the full-codebase baseline is red (pre-existing, e.g. 12,509 problems on 2026-11-09); the real gate is the changed file being zero-referenced. Also run production build per project rule 改完必编译.
- In submodule worktree, node_modules hoisted to parent via npm workspaces; worktree outside main dir so Node upward walk misses hoisted root node_modules. Do NOT junction main node_modules into the worktree when main's `eslint-rules/` is deleted (the junction carries broken/incomplete node_modules missing the plugin); run a clean `npm install` (husky disabled) in the worktree instead. Alternative: ESLint 8 `--resolve-plugins-relative-to` main checkout.

## Parallel / Remote Advance
- Remote develop/v3.0.0 advanced in parallel and not fast-forwardable → forbid force push: merge fix branch into submodule develop/v3.0.0 and push, then merge remote develop in parent to resolve gitlink conflict to new submodule head; keep same-file conflicts on both sides.
- Submodule same-file parallel conflict example: #6337 beginDialogAsyncLoad out-of-order guard vs #6235 paginateRows slice in chooseHouseDialog.vue → keep both methods, use applyOriginPage (paginateRows slice + syncOriginSelection).
- On parallel remote advance, merge (not rebase) to preserve parent gitlink commit hash; remote CI unused-files vite.config.js fix can merge into submodule.
- Alternative when the fix branch is merely behind origin (no conflict yet, e.g. local develop stale vs origin ahead with unpulled merge): rebase the fix branch onto origin/develop/v3.0.0 so the push becomes a fast-forward; the single gitlink commit replays cleanly and the submodule SHA is unchanged. If the remote advances again mid-work, rebase the submodule onto the new origin tip, repoint the parent gitlink, then rebase the parent (see submodule_rebase_ff pattern).

## Cleanup & Recovery
- Worktree cleanup: if junction to main node_modules exists, `cmd /c rmdir` junction first then delete worktree; if worktree contains submodule, git refuses direct deletion → delete its own dir then prune.
- 2026-11-09 worktree develop/v3.0.0 merge: after merging submodule (tip c29dcdb87) and superproject (tip 2892034, gitlink resolved to c29dcdb87) in a clean worktree, restoring main superproject failed because worktree wt still had develop/v3.0.0 checked out (branch blocked); detach wt first to free develop then restore; main submodule restored fine since wtSub and mainSub are separate repos.
- Submodule .git link missing → git -C $sub silently falls back to parent; restore .git link before push; accidentally deleted worktree recoverable via restoring .git link + checkout, no loss.
- 2026-11-09 accidentally deleted main workspace zhi2-web-admin .git link, worktree and node_modules: rebuilt .git link with retained gitdir + reset --hard HEAD to recover tracked files, npm install restored 870 deps, git status clean, build passed, no loss.

## Parent Repo Local Config
- Parent repo env/.env records local proxy address switch; local debug config not for commit/push.

<!-- MEMORY_FIELDS
{
  "category": "git_submodule",
  "name": "zhi2_admin_git",
  "source_extraction_id": "9ad6fd8abaee4e71b87ed6d99fa660d4",
  "version": 19,
  "memory_type": "entities"
}
-->