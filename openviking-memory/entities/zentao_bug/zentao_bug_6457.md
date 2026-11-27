# Zentao Bug 6457
Suzhou flood C-end mobile H5 homepage/mine todo-count mismatch and "pending" wording bug; fixed in two rounds on 2026-11-11 and 2026-11-12, pushed as `72bc8cf` and `3dee5ab` to `origin/dev`, now resolved/fixed with assignedTo=lichandan and test regression recommended.

## Issue Status
- First report: homepage badge showed 12 while the task list showed 3; handheld should match the G-end count, which was 0 for that account; screenshots were attached.
- Product note required removing the literal "pending" wording from the mine-page task menu badge.
- lichandan's second report: badge was 0 but the task center still showed 3 pending items; both places had to be consistent and correct.

## Root Cause and Fix
- First root cause: homepage/mine used `getTaskCount` (`/v2.0/flowable/task/taskCount`) `todoNum` from a demo seed of 12, while the list used `getTodoTaskList` (`/v2.0/flowable/task/todoTaskList`) `total` of 3.
- First fix: homepage/mine badges read `getTodoTaskList().total`; `mine/index.vue:34` changed the "pending" badge to a numeric count; the unused `getTaskCount` API wrapper was deleted.
- Second root cause: remote empty lists still fell back to three demo fake todos (`mock/portalSeed.ts` `seed-task-1/2/3`, status "pending").
- Second fix: remote removed all mock/seed fallbacks; `portalData.ts` `fetchList/fetchHome/fetchStudyTab/fetchMine/fetchDetail` seed fallback was limited to demo, and empty data or API errors showed real empty state or 0.
- `home/index.vue` and `mine/index.vue` no longer initialized refs with `SEED_HOME`/`SEED_MINE`, and `portal.test.ts` added a remote-empty-data-no-seed-fallback case.

## Validation
- First round: worktree located count source and wording; vue-tsc passed (exit 0).
- Second round commit `3dee5ab` touched `src/utils/portalData.ts`, `src/pages/home/index.vue`, `src/pages/mine/index.vue`, and `tests/portal.test.ts`; `npm test` passed 38/38 including the remote-empty case.
- `uni build -m test` passed; vue-tsc errors were pre-existing in `store/user.ts`, `utils/index.ts`, and `watermark.ts`, not in changed files.
- ESLint was not configured or run; no remote manual deployment verification was done because there were no test-account credentials, so test regression was requested.

## Delivery and Writeback
- First round on 2026-11-11 committed `72bc8cf` with `src/utils/portalData.ts`, `src/pages/mine/index.vue`, and `src/api/portal.ts`.
- DBX writeback set resolved/fixed, resolvedBy=tiany, assignedTo=lichandan; `zt_action` was `90929`.
- Zentao metadata: openedBy=lichandan, product=79, project=141, execution=142.
- Second round on 2026-11-12 committed `3dee5ab` and was written back resolved/fixed, returned to lichandan.
- Plan archive was `.plan/bug-6457-round2.md`.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6457",
  "source_extraction_id": "8d1927630ae345d1939e4bb5146adec6",
  "version": 14,
  "memory_type": "entities"
}
-->