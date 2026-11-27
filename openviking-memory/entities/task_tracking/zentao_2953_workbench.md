---
audit_status: valid
last_checked: 2026-11-28T01:17:41+08:00
verdict_note: D-/plan 含禅道2953/HANDOFF-CHAIN/1548/ownerDecisionVote 交接文档，任务追踪记录属实。
---
# ZenTao 2953 Workbench Entry Task
ZenTao 2953 / story 1548 defined four requirements for workbench shortcuts and H5 handoff behavior in the Property Handheld B Terminal and H5 repos.

## Requirements
- Chain id was `禅道2953工作台新增入口及跳转`, with handoff hop 1/10 and the original target of landing all four ZenTao 2953 / story 1548 requirements.
- B terminal workbench needed H5 routes and jumps for common-function shortcuts and group entries, appending `from=handheld`.
- H5 property self-inspection needed the property management area defaulted to the current top selected area.
- H5 needed to hide the first `administrative division` filter in more filters when `from=handheld`.
- H5 needed to hide `Start Inspection` for check types 2, 3, and 4 when `from=handheld`.

## Completion Criteria
- Completion required four landed requirements, user-confirmed verification images, commits and pushes in both repos, and ZenTao 2953 writeback with images.

## Implementation Decisions
- The authoritative spec, checked against E4, required common-function shortcut entries and their group entries to share the same H5 link.
- Only project inspection and typhoon flood control had dedicated sibling routes; patrol reporting and hazard reporting had none, so the closest sibling routes were reused.
- The B terminal top selected area was identified as `userStore.projectId/projectName` and carried through `from=handheld` into the H5 start page.
- `openH5` appended the H5 base and `from=handheld`; it used `window.open` in H5 and webview navigation in the mini program.

## Status On 2026-11-26
- Earlier completed work included ZenTao evidence, two-repo location, approved plan with `approved_sha256` backfilled, common functions expanded from 3 to 8 with 3 groups, and webview route registration.
- Code changes in the B terminal and H5 repos were completed, and both `npm run build` commands exited 0.
- Verification was initially blocked by unavailable B terminal login credentials at `localhost:8180`; login was resolved in later hops, and req2/3/4 real-device verification passed on 2026-11-26 using the loopback-hosted built dist with user-confirmed images. Commits/push and ZenTao writeback were deferred to hop17 at the 1.00M cost threshold.
- A hop 2 handoff document was written at `D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop2-20261126-161130.md`, and session `session-8a4bf12c...` was scheduled for 16:12:12.

<!-- MEMORY_FIELDS
{
  "category": "task_tracking",
  "name": "zentao_2953_workbench",
  "source_extraction_id": "c298ca9776df4e37adb94b7323827d25",
  "version": 2,
  "memory_type": "entities"
}
-->