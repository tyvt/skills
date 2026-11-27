---
audit_status: valid
last_checked: 2026-11-27T23:44:01+08:00
verdict_note: 新禅道DB-bug6964 zt_action id=99510由tiany于2026-11-25 resolved，resolution=fixed，与记忆一致。
---
# ZenTao Bug 6964: blank signatures in rectification task PDF
ZenTao bug 6964 was closed on 2026-11-25 after confirming that the required backend signature-in-PDF fix had already been merged for duplicate bug 6911.

## Issue evidence
- Link: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6964; initial state was assignedTo=tiany, status=active, no comments, steps 573 characters; defect type designdefect, not browser-reproducible, so no agent-browser gate.
- The management-end APP downloads the rectification task PDF through /{checkRecordId}/rectifyTask/pdf; backend StdEvalCheckRecordServiceImpl.downloadRectifyTaskPdf in zhi2-evaluation (about lines 1032-1136) generated it with iText and hardcoded two blank signature cells.
- Signatures are stored in T_STD_EVAL_CHECK_RECORD.SIGN_COMPANY_LEADER and SIGN_INSPECTOR; DTO via BeanUtil.copyProperties carried signCompanyLeader and signInspector but did not embed them in the PDF; the requirement was to show both images in the two signature fields, matching G-end behavior.
- G-end RectifyTaskPreview.vue already embedded signCompanyLeader and signInspector as images; real signatures are relative paths (/zhi2-dev/...), so backend retrieval must use RemoteFileService.downloadByFilePath with Feign timeout/fallback, not raw HTTP.
- AssessmentRecordServiceImpl.generateHtml and generateAttachmentHtml also lacked signatures; final confirmed target was the iText PDF method.

## Plan and handoff
- Plan review PASS (86/100, no P0); user confirmed full scope: implementation, commit/push, and ZenTao writeback.
- Approved plan: D:/plan/苏住房后端/session-ecd3a89b-7ce6-4867-983c-4530cf911c8f.md (sha256 98edbbb0…).
- Baseline Maven compile EXIT=0; submodule zhi2-evaluation was clean on branch develop/v2.6.2-suzhufang-dev; root cause, G-end reference, plan approval, baseline compile, and three imports were already completed before handoff.
- Implementation triggered a P0 handoff waiting for the next hop; handoff document was D:/plan/苏住房后端/HANDOFF-CHAIN-bug6964整改任务单签字带出-hop1-20261125-1155.md; chain_id=bug6964整改任务单签字带出, hop=1, maxHops=10; section 4 had six non-empty tasks, so the chain continued rather than terminating, with a new_once auto-continuation scheduled for 2026-11-25 11:57:39.
- Pending handoff tasks were to add RemoteFileService bean, replace two createPdfBlankCell calls with createPdfSignImageCell, add private createPdfSignImageCell retrieval/scaling/fallback, compile, commit/push with parent gitlink, and write back to ZenTao 6964.

## Resolution and repository state
- On 2026-11-25, an initial local implementation and commit e840446327aa58ee7f62b8eb180055360b83e2dd were created, but rebase revealed two remote new commits, including 4d24ee7 which had already merged the same fix.
- Bug 6911 ("检查记录：整改任务单需要带出签字内容", web/G-end variant) was resolved/fixed at 2026-11-25 10:13; bug 6964 was opened at 2026-11-25 10:42, 29 minutes later; both target the same StdEvalCheckRecordServiceImpl.downloadRectifyTaskPdf code and root cause.
- The duplicate local commit was dropped with rebase --abort and reset --hard to remote HEAD 0b84b64; no duplicate code was pushed, avoiding overwrite of the colleague's tested fix.
- Remote HEAD 0b84b64 contains the fix in StdEvalCheckRecordServiceImpl.java:1141-1142, calling createPdfSignImageCell with downloadFileBytes/getSignImage; the worktree was clean and aligned to remote HEAD.
- Compile of the remote fix passed with mvn -q -pl zhi2-evaluation/zhi2-evaluation-server -am -DskipTests compile returning EXIT=0; parent gitlink was not updated because parent still points to 45bd4cdc while submodule HEAD is 0b84b64, parent had 11 dirty files in common-framework/service-expand, and separate confirmation is required for parent sync.

## ZenTao writeback and closure
- Writeback used a stateful DBX transaction after batch-mode statement blocking.
- UPDATE zt_bug set status=resolved, resolution=fixed, resolvedBy=tiany, resolvedBuild=trunk, assignedTo=lichandan.
- INSERT zt_action created id=99510 with 14 columns and a 717-character HTML comment covering root cause, fix, bug 6911 relation, and verification; transaction committed and verified.
- Final state: bug 6964 status=resolved, resolution=fixed, action record 99510 exists; process artifacts were cleaned and the chain terminated at hop=1.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6964",
  "source_extraction_id": "7679cd7eb07e407f8834a73fb72cf742",
  "version": 2,
  "memory_type": "entities"
}
-->