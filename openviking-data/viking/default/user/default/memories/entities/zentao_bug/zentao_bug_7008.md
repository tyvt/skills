# ZenTao Bug 7008
ZenTao bug 7008 "PC post-flood inspection rectification and review five required-field validations": both the first-round submit-validation fix and the second-round save-validation fix are landed, verified, committed, pushed, and written back to ZenTao; chain bug7008-pc-save-required is terminated with no pending items and no next hop.

## Metadata and First-Round Closure
- Metadata: openedBy=lichandan, product=79, project=141, execution=142; first-round chain_id=bug7008-pc-postcheck-required (hop2/max10, terminated), commits e7b9eb0 and 0f429f4.
- First-round submit-validation fix (referenced as "汛后检查整改复盘五项提交必填校验修复"): completed 2026-11-26 with comment + two-image writeback, artifact cleanup, status=resolved/fixed, chain terminated. Per "文档为准", resolved the conflict that at 11:30 tiany had resolved (the H5 round) but zt_action had no comment, backfilling the PC-end fix. User confirmed via verify_gate2; per "禅道任务免二次问" no second ask.
- Uploaded verification image fileIDs: toast 24640 (134KB), edit-state 24641 (230KB); transaction session=mcp-session-c2f7b563-83a0-4386-8e84-26b71b7d840d: UPDATE assignedTo=lichandan, INSERT zt_action (two embedded images, files=24640,24641) affected 1 row, attach affected 2 rows; verified resolvedDate=17:13:55, latest action 100538; COMMIT and session closed.
- Dry-run confirmed 17 files all matched `$TEMP/bug7008-*` with no nested dirs, 0 residual after deletion; P1 non-blocking boundaries (status value 0 / upload failure / duplicate submit) not done.

## Second-Round Save-Validation Fix
- 2026-11-26 17:39 lichandan reactivated the bug (tiany had resolved twice before): PC "Save" still succeeded with rectification fields left blank.
- Root cause: `validatePostExtraForm` was only hooked to `beforeSubmit`; "Save" goes through `handleSave → saveFloodRecord(..., {allowBlankItems:true})`, which only runs `validateFloodForms` + `validateFloodPayload` and never calls `validatePostExtraForm`, so blank fields could be saved.
- Repro (test 8167): record XHJC20261126000006 (pending submit, blank-saved at 17:37), formMode=edit/inspectionStage=4, four rectification fields blank then "Save" → jumped to list `?type=back` successfully with no block; screenshot taken.
- Fix: `validatePostExtraForm()` extended from `beforeSubmit`-only to also hook `handleSave`, covering all five fields; plan_review two rounds 88→94, 0 P0, user confirmed implementation; sessionId=session-849090a5-da83-4408-a97d-2bcd1dba5089; `detail.vue` added the hook before saveFloodRecord in handleSave and updated comments (removed old "草稿保存不受影响" wording), ledger E37 updated.
- Validation: single-file ESLint exit 0; baseline build exit 0 (gitHash 5c5afbafe = pre-change HEAD, watchdog reported STALL); post-change build exit 0, dist buildTime 2026/11/26 17:58:31; site 8167 root points to this project's dist, nginx reads new files directly.

## Verification and Evidence
- Validation order (detail.vue:1100-1104): rectification measure → rectification deadline → rectification status → rectification owner → on-site photo; all five blank hits "请输入整改措施" and stays on the form, after filling the measure hits "请选择整改期限", all five filled saves successfully and jumps to `?type=back`.
- Pre-flood/mid-flood not triggered (`if (!this.isPost) return ''`, :1098; not spot-checked, relied on code guard + post-flood three scenarios).
- Three evidence images at `$env:TEMP/zentao-7008/`: v1-empty-after-20261126-181853.png, v2b-deadline-20261126-182113.png, v3-full-save-20261126-182424.png; self-checked non-empty/correct content/present/inline; hop2 rechecked v1/v3 with analyze_image and v2b with read_image; hop4 re-verified all three still present and non-empty.
- Verification-gate confirmation requests were interrupted repeatedly (wait ~9335s then aborted, ~35 min aborted, hop4 ~3.8h aborted) until hop5, when the user finally confirmed.

## Closure, Commit, Push, Writeback, and Handoff
- At hop5 the user confirmed the verification gate; per "禅道任务免二次问" this authorized commit+push+writeback with no second ask.
- Submodule: behind=2, incoming commit touched detail.vue ~877 (openEventDialog), no overlap with the change at 1065-1093; stash → pull --rebase → restore, fast-forward to origin 1eb8aa61f (ahead=0); guard intact (detail.vue:1070-1071), ESLint exit 0; version.json not committed (forbidden), no rebuild (builds passed in hop1); commit `e63530047` contains only detail.vue + common-errors.md, pushed and remote verified at e63530047; unrelated dirty files (ScreenHeader.vue, particles.js, env/.env, _review.json) untouched.
- Parent repo: behind=1, incoming commit updated the gitlink to 1eb8aa61f while the worktree was at descendant e63530047; stash → rebase → restore → stage gitlink at e63530047; parent commit `e1026c6` created and pushed; both ends verified via `git ls-remote`.
- ZenTao writeback: bug status=active, product=79, project=141, execution=142, openedBy=lichandan; uploaded images → fileIDs 24699/24700/24701; build-baseline gate satisfied from hop1 `.task-state` (build-baseline and build-after both exitCode=0, version.json buildTime 2026/11/26 17:58:31, no source changed since), no rebuild; transaction session=mcp-session-f0e30e30...: UPDATE zt_bug → resolved/fixed, assignedTo tiany→lichandan (1 row), INSERT zt_action id=100885 (comment with root cause + fix + verification, three embedded images, files=24699,24700,24701), attach three zt_file records to bug 7008; in-transaction verification passed, COMMIT, session closed.
- Cleanup: no background jobs, dry-run verified paths, screenshot dir + `.task-state/` deleted only after images were in session and landed in ZenTao; chain bug7008-pc-save-required terminated, no pending items, no next hop.
- Design Q&A: asked "can the form's built-in validation be used?" — assistant answered yes but costly: built-in rules only cover eventId/checkDate/complexId (detail.vue:464-468); the five rectification fields are in a custom grid .result-table__row with no prop (:154-179) so rules cannot reach them; handleSave (:1067-1076) goes through saveFloodRecord without `form.validate()` (the bug cause); built-in validation needs three changes (add props to five el-form-items, add 5 rules, call validate() in handleSave), larger than the 14-line guard and inconsistent with H5; current validatePostExtraForm (:1097-1109) is the minimal change; frozen in handoff section 8, no re-research needed.
- Handoff chain: docs hop1 HANDOFF-CHAIN-...hop1-20261126-1812.md, hop2 ...hop2-20261126-1901.md (schedule-e66b1715-caa1-439b-baf1-9e5cc0c1504d, delivered 19:01:52), hop3 ...hop3-20261126-2233.md (scheduled hop4 at 22:34:23 new_once; hop3 equivalent cost over 1.00M, ~186k triggered hard handoff), hop4 (hop=4/10) read all 9 sections, re-verified three images, redid nothing (no re-run of ZenTao read/root cause/plan review/code changes/ESLint/two builds/repro/post-fix verification), section 4 todos non-empty, hop=4<10, cost cap hit, handed off to hop5 with no background jobs; hop5 doc `D:\plan\苏住房G\HANDOFF-CHAIN-bug7008-pc-save-required-hop5-20261127-0437.md` (9 sections, hop=5/10), schedule-1bee46f5-7b1d-4785-a5d8-a8ca6cc3b90e DTSTART 2026-11-27 04:38:12 (+15s), target=new_once, session-c2471b74-45f5-4037-a296-d0897d5ae1ef.
- Tooling/browser notes: no session sort/pin capability in this toolset, so P0 "new session pinned" could not be programmatically verified/reordered (only confirmed new_once scheduled and a new session created on first delivery); browser quirk: session name `bug7008-e91695ee90b8`, repeated job_kill kills the daemon causing page loss, needs daemon keep-alive, snapshot prone to hang.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7008",
  "source_extraction_id": "a12113e1ea47465fa53733219e39aa5f",
  "version": 6,
  "memory_type": "entities"
}
-->