# ZenTao 2730 Sticky Header Rework
ZenTao 2730 is the zhi2-web-admin (Su Housing G) monthly report detail sticky-header rework, tracked under chain_id `禅道2730表头吸顶` and still incomplete at hop2 on 2026-11-25.

## Requirements And Acceptance
- User reported three problems: a second page-level vertical scrollbar, horizontal bars visible only on hover, and header background leaking through during scroll.
- Acceptance criteria: single vertical scroll in `.stat-table-wrap` only + scrollbar thumbs always visible + no header leak + user verification passed.
- Plan `session-sticky2730-fix2.md` remains a draft pending review and confirmation.

## Root Cause And Fix
- The source fix landed in hop1: `.list-container { max-height:100%; overflow:hidden; flex:1 1 auto }` caps container height, plus a thumb-color override so both scrollbars stay visible.
- 2026-11-25 hop2 root cause: stale dist built at 15:23:44, earlier than the 15:29:34 `detail.vue` edit, so the fix was never synced to nginx 8101; the double scroll was an outdated artifact, not a failed fix.
- Page-level second scroller source: global `AppMain.vue:50` `#app-main { overflow-y:auto; height:100% }`; `.list-container` computed to 600px (`calc(100vh-120px)`, vh=720) overflowing `#app-main`'s 562px client height.
- hop2 made 0 code changes; it only rebuilt and robocopy-synced dist to nginx 8101 (`npm test` exit 0 with only pre-existing Sass warnings), and new CSS hashes were deployed.

## Verification And Handoff
- Live eval passed all three checks: `#app-main` vScroll:false and only `.stat-table-wrap` scrolls vertically (sh4498/ch419); thumbs `rgba(0,0,0,0.2)` always visible; sticky header had solid background `rgb(245,247,250)` with no leak and the horizontal bar present.
- Verification image `C:/Users/Administrator/AppData/Local/Temp/verify2730-20261125-154625-single-scroll.png` (1280x720, 273 KB, timestamp 20261125-154625) was self-checked, embedded in the session, and kept until user confirmation.
- The verification gate `ask_user_question` was aborted with no user answer; per the P0 hard gate no commit, push, or ZenTao write-back was allowed and the task stayed incomplete.
- Handoff to hop3 (new session started 2026-11-25 15:53:53, top of the schedule list) to re-ask the gate, then commit/push, attach the image to ZenTao 2730, and clear the TEMP image; `.task-state/build2730.*` was cleaned.

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "zentao_bug",
  "name": "zentao_bug_2730",
  "source_extraction_id": "11f8dd34b77c43bb8da708c1d0ee297e",
  "version": 1,
  "memory_type": "entities"
}
-->