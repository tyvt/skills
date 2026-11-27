# zhi2-web-admin Git Submodule
zhi2-web-admin is an independent git submodule of the parent "portal" repo; changes land through the submodule worktree.

## Workflow
- Standard chain: develop in submodule worktree -> commit -> fast-forward merge into develop/v3.0.0 and push -> commit and push parent gitlink (`M zhi2-web-admin`) -> delete worktree and temporary branch. In the parent, add only the gitlink, not dirty flood-control files; avoid PowerShell `export &&` (silent failures), use pwsh env assignment plus semicolon chains, and verify the new SHA. If parent is behind by 1, `pull --rebase` with `GIT_EDITOR` before gitlink commit/push; 2026-11-24 bug6950 used this path (`6a95e30->7909356`).
- Exception "work on mainline" (all on develop/v2.6.2-suzhufang): task2295 monthly report export; 2026-11-24 bug6903 hazard button moved right (submodule `5b6400983`, parent `6eef297`), bug6915 (submodule remote `d9ed05cc7`, parent `36f559c`), bug6932 on-site image for each scored entry (submodule `fee36597d`, parent `3315a33`), bug6950 fund-allocation void GET->POST (submodule `79093564e` plus existing parkingSpace `e4430964e`, parent `2d3ca6cc`); after pushes, remote SHAs matched.
- Never commit others' dirty files `ScreenHeader.vue`, `particles.js`, `_review.json`, or parent `env/.env` local proxy switches. Keep submodule `public/version.json` (protected build artifact, forbidden for git add), `report.html` (3.5MB tracked build report; deleting creates `D`), and `_review.json` (historical file 8 days before task).
- Nested submodule worktree `.git` -> `.git/worktrees/.../modules/zhi2-web-admin` has an empty file; run `git submodule update --init` in a new parent worktree. Parent `-b` creates only the parent branch, so create submodule task branches separately: 2026-11-09 `fix/contract-version-dialog-public-component` from clean HEAD as worktree and same-name submodule branch; worktree `D:\repository\苏州市房地产监测V3-wt-bug-6363` had submodule branch `fix/bug-6363-attachment-lost` based on `6009ddf16`.
- 2026-11-11 bug6468: after user chose `提交并推送`, set `GIT_EDITOR=true`, removed temp build log, checked ahead/behind; submodule was behind 2 commits touching `DeveloperBasicInfoForm.vue` and `toB/companyRecord/detail.vue`, not `RecordCertificateDialog.vue`, so the fix was stashed, `pull --rebase` fast-forwarded, and restored cleanly. Build-modified `public/version.json` restored, parent `docs/前端/` left untracked, parent gitlink stashed while parent fast-forwarded to `7f74d31`, then only gitlink committed; gitlink diff syntax errored but status confirmed modification; submodule `94803e92f` on `develop/v3.0.0` pushed `15d739808..94803e92f`, parent `acb1350` pushed `7f74d31..acb1350`, remotes matched, post-commit `dist/` rebuild noted as separate work.

## Build / Lint
- Worktrees have no `node_modules`: workspaces hoist dependencies to the parent; out-of-root worktree makes Node miss root `node_modules`. Do not junction main `node_modules` (incomplete dependencies); use clean `npm install` (disable husky), borrow main-workspace `node_modules` for SFC compile checks, and run build verification in the main workspace because worktree Vite is stricter and may fail.
- Lint gate: `eslint-plugin-duplicate-attributes: "file:eslint-rules"` depends on main workspace `eslint-rules/` and `node_modules`; if missing, `npm run lint` fails to load. Clean worktree install restores plugin; full-repo baseline is red (2026-11-09: 12,509 issues), so the real gate is zero new hits in changed files. Alternative: ESLint 8 with `--resolve-plugins-relative-to` the main repo; also run production build per "changed code must compile".
- Do not use PowerShell `Get/Set-Content` on Chinese Vue files (breaks UTF-8+BOM); use read/write tools.
- Yulin worktree and main repo share Vite rootDir `D:/repository/榆林G` and overwrite the same `dist`; use `--outDir` isolation. Yulin changes land only on `develop/v2.6.2-yulin` (no parent branch).
- See `husky_windows_hooks_path` for Windows husky shim failures and one-command hooksPath overrides.

## Parallel / Remote
- If remote `develop/v3.0.0` advanced and cannot fast-forward, do not force push: merge the fix branch into submodule `develop/v3.0.0` and push, then merge remote develop in parent and resolve gitlink conflict to the new submodule head. Keep both sides in same-file conflicts; use merge, not rebase, to preserve parent gitlink commit hash; remote CI's unused-files `vite.config.js` fix can merge into the submodule.
- Same-file parallel conflict example: #6337 `beginDialogAsyncLoad` ordering guard vs #6235 `paginateRows` slicing in `chooseHouseDialog.vue`; keep both methods and use `applyOriginPage` (`paginateRows` slicing plus `syncOriginSelection`).
- If only behind origin: rebase the fix branch onto `origin/develop/v3.0.0` so push is fast-forward, replay one gitlink commit cleanly, and keep submodule SHA unchanged; if remote advances again, rebase submodule to new origin tip, repoint parent gitlink, then rebase parent.
- 2026-11-27 portal-banner-align on `develop/v2.6.2-portal`: goal was design-2 alignment of banner second-line text (area management / brokerage agency supervision) and the "一网通办·全程网办" corner badge in `UnifiedLogin.vue`. User confirmation `验证通过` authorized commit/push.
- 2026-11-27 portal-banner-align results: parent and submodule were on branches (not detached); submodule commit `f44a90433...` `style(home): 按设计稿调整横幅第二行与角标位置` contained only `src/views/home/UnifiedLogin.vue:1103-1108,1152-1160,1425-1428`; `public/version.json` stayed uncommitted. Parent gitlink commit `add6738ee2403...` `chore: 更新 zhi2-web-admin 子模块指针（横幅对齐）` added only `zhi2-web-admin`; git ls-remote matched local/remote SHAs; no ZenTao link, no write-back.

## Cleanup & Recovery
- Worktree cleanup: if there is a junction to main `node_modules`, first `cmd /c rmdir`, then delete worktree; if the worktree contains a submodule, git refuses deletion, so delete its own directory and then prune.
- 2026-11-09 worktree merge of `develop/v3.0.0` (submodule tip `c29dcdb87`, parent tip `2892034`, gitlink `c29dcdb87`): restoring main parent failed because the worktree still occupied `develop` (locked branch); detach to release `develop`, then restore. `wtSub` and `mainSub` are different repos, so main submodule was unaffected.
- If the submodule `.git` link is lost, `git -C $sub` silently falls back to the parent repo; restore the link before pushing. An accidentally deleted worktree can be recovered with the restored link plus checkout, with no loss.
- 2026-11-09 accidental deletion of main workspace `zhi2-web-admin` `.git` link, worktree, and `node_modules`: kept the gitdir, rebuilt the link, ran `reset --hard HEAD`, restored 870 dependencies with `npm install`; git status became clean and build passed with no loss.
- 2026-11-27 cleanup after portal-banner-align: leftover job `bash-0f71ed876e434e45` was already gone, five `$TEMP` `portal-banner-*.png` verification screenshots were deleted, and chain `portal-banner-align` hop1 terminated with no pending items.


<!-- MEMORY_FIELDS
{
  "category": "git_submodule",
  "name": "zhi2_admin_git",
  "source_extraction_id": "40dea65c38824568897df0ae2fd40fc5",
  "version": 30,
  "memory_type": "entities"
}
-->