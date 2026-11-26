# ZenTao Bug 6967
ZenTao defect 6967 "rescue work-order display issue" was closed on 2026-11-25 after status-text/detail-image fixes, build, real-device confirmation, push, ZenTao write-back, and cleanup.

## Goal and Criteria
- chain_id=禅道6967求援工单显示修复; original goal was to fix three display issues (two status-text issues and one detail-page image issue), verify on a real device, then write back to ZenTao.
- Completion required the three fixes, build exit 0, real-device screenshots in chat with user confirmation, ZenTao write-back with images, and process artifact cleanup.

## Root Cause and Fix
- Code had drifted from handoff anchors (detail.vue template around :240-242, not :130-137), so section 5 diagnosis used real content review.
- detail.vue:38-43 already mapped 4→done but kept label "已完成" that should be "已完结"; index.vue:39-44 still mapped 4→pending; both files used "救援处置中" that should be "处理中".
- The image root cause was nodes dropping attachUrl; PROXY_TARGET host served images normally (200 image/png) and upload.ts needed no change.
- The fix followed G-end splitAttach(log.attachUrl)+resolve+preview for detail.vue; plan review scored 88/100 with P0=0.
- Three P1 items were inline splitAttach in detail.vue, status codes limited to 0..4, and e2e coverage for 3=已驳回/legacy values/button flow/empty and multi-image preview; after user confirmation, index.vue/detail.vue status mapping, action logic, and collaboration-record image rendering were implemented.

## Verification and Push
- Baseline and post-change npm run build both exited 0; ESLint was not installed (build was the gate), and branch and origin/dev were synchronized.
- Real-device checks showed list 000006→已完结 and 000001→处理中; 000001 detail showed one of one site photo and the "进度正常" node image rendered.
- Three timestamped screenshots verify-list-status-20261125-120956.png, verify-20261125-120907.png, and verify-nodes-20261125-120934.png passed self-check and user confirmation.
- Commit 43f282f was pushed to origin/dev; an earlier ceiling-triggered P0 hard handoff wrote a 9-section document and scheduled hop3, with this work as hop2.

## Write-back and Cleanup
- The generator using zentao-resolve.mjs 6967 --comment-file ... --attach ... with metadata openedBy=lichandan, product=79, project=141, execution=142 produced an 8-step sequence that was executed against only new ZenTao; no SQL was hand-built.
- Three verification images were uploaded to ZenTao as fileID 24338/24339/24340, embedded in the resolved comment, and attached to the bug; the comment covered root cause, fix, build, and real-device evidence.
- Transaction verification passed and COMMIT set status=resolved, resolution=fixed, resolvedBy=tiany, assignedTo=lichandan, with three images in the action.
- Cleanup deleted and rechecked `.tmp-bug6967/` and `$env:TEMP\zentao-6967/`, closed agent-browser session `bug6967-verify-4382d7d38d88`, and left no background jobs.
- No rerun: code fixes, baseline/post-change builds, real-device verification, and commit/push reused prior hop results; hop2 was below 10 but the goal was achieved, so no next hop was scheduled.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6967",
  "source_extraction_id": "016ade41304a4d5e92868fb2a5bc1ea2",
  "version": 6,
  "memory_type": "entities"
}
-->