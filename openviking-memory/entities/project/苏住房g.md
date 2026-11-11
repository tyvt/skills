# 苏住房G (Suzhou Housing G-end)
Front-end project for Suzhou Housing G-end/management H5, uses zhi2-web-admin submodule, local workspace D:/repository/苏住房G.

## Project Description
- Covers real estate contracts, enterprise registration, monthly reports, evaluation, asset/fund panoramic supervision modules; accumulated debugging/refactoring/bugfix workflows.

## Repo Structure & Workflow
- Main workspace branch develop/v2.6.2-suzhufang, submodule same branch.
- Worktrees in 苏住房G/worktrees/: bug5897 (branch develop/v2.6.2-suzhufang-li, HEAD 7675b3197 as of 2026-11-10), task2192 (branch evaluation, HEAD 4e2cf39b3), unmerged but pushed to origin as of 2026-11-04.
- Parent feature branch creates same-name parent branch to fix gitlink; .gitmodules set branch then commit/push; as of 2026-11-04 parent branch li (44274f8) pushed, evaluation (3940898) push rejected.
- 2026-11-04 ZenTao 2295 changed detail.vue directly on develop/v2.6.2-suzhufang, submodule commit 8992db265, parent commit 8fb06ce updated gitlink.
- Local nginx site port 8101, root D:/repository/苏住房G/dist, reloaded.
- 2026-11-05 merged develop/v2.6.2 into develop/v2.6.2-suzhufang: submodule commit cc496589e no conflict, parent updated pointer 0fb43ab, workspace clean local ahead remote 1 commit.
- 2026-11-05 cherry-pick return-detail button fix to develop/v2.6.2 (submodule 1b3c7f6c5), original branch commit 1df2da437, both branches ahead remote 1 commit unpushed (session 765750a0).
- 2026-11-09 contractDialog.vue refactored to wrap public zs-select-dialog (SelectDialog), preserving parent detail.vue @set/:visible.sync via $attrs/$listeners; dropped hand-rolled table/pagination/search; submodule branch fix/contract-version-dialog-public-component.

## Code Logic & Fixes
- B-end users split: enterprise admin login no region select popup nor region name; practitioner with multi-region shows popup and can switch (terminalUser.js isBTerminalPractitioner/isGTerminalLike) (session cbfb89e8).
- Password expiry force change can set passwordReset.js FORCE_RESET_PASSWORD_ENABLED=false temporarily, store/modules/user.js sync ignore set true request, revert to true after (session 526fcf75).
- saveLoading variable defined in OperationBtnGroup/index.vue and managed in regionBankAuth/detail.vue etc (session f2c4d1f7).
- Added building maintenance community select popup originally used /property/complex/page without district filter, fixed to filter by current district (census/detail.vue handleOpenProjectDialog) (session 5380defe).
- Homepage stats map drill-down clears markers first, on API fail fallback to previous level to avoid stale district name (statisticsMap/index.vue, map.vue) (session 7c8a2586).
- RepairPanel total 0 pie not rendered, changed to equal placeholder sectors with "total 0" (session 924b8810).
- companyProjectStats search button handleQuery empty no API call, changed to call getDetails() (session 5fd50fdd).
- Homepage key data and check data nav split independent regionCode, default whole city (session c67476bc).

## Verification & Attribution
- Project: 苏住房G; evidence: extracted source=cursor project=苏住房G
- Source session: 765750a0-13d8-4789-8d78-9bb82bdf1e1f

<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "苏住房G",
  "source_extraction_id": "fda41f4158bd415c8f3b293c4de2ae17",
  "version": 26,
  "memory_type": "entities"
}
-->