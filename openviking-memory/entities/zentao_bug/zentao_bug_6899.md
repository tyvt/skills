# ZenTao Bug 6899
Zentao bug 6899: the 2026-11-25 revived fix made the flood-control big-screen "现场险情实时速报" hover detail card show all inspection items; ledger, npm test, real-device evidence, Zentao resolved/fixed with image, dual-repo push, and cleanup all finished and the chain terminated.

## Problem And Todos
- chain_id=bug6899-hover全量检查项, hop=2 (doc section 5 said hop=1 while scheduling said hop=2; scheduling was used), upper limit 10; section 5 was actually "key decisions and constraints".
- Goal: hover detail card shows all items including values "无" with no scroll/hide regression; real-device screenshots after user confirmation, then Zentao image writeback plus commit/push.
- Section 4 todos all completed: add docs/flood/common-errors.md ledger, npm test, agent-browser real-device screenshot with user confirmation, writeback and no-second-ask commit/push, clean `$env:TEMP\zentao-6899-state\`.
- Do-not-rerun: Zentao evidence/root cause, two plan reviews with manual confirmation, index.vue 8 edits (388/390/570 hits, other people's changes untouched), ESLint exit 0, attachment judgment, backend controller whole-repo search.

## Fix And Verification
- Ledger already had an 11-24 6899 entry, and this run appended a revival record; a missing log directory first failed the background command, then npm test exit 0 after creating the directory (only Sass @import warnings).
- Login troubleshooting: killing sessions closed the daemon so no-kill/no-pipe always-on was used; the recognition script silently changed visual MCP code reading; a footer span blocked the button in headless viewport so DOM trigger was used; expired captcha used "take code → recognize → immediate submit"; gateway script 404 still used visual MCP and entered /index.
- Routes came dynamically from backend menus; clicking top "数据大屏" entered the flood-control screen; the warning list had no "新增检查类型", so event-ID risk API was queried and "预警名称测试20261102001" was selected (2 rows with inspectionId).

## Evidence And Differences
- Hover "苏州高尔夫花园": backend patrol/realtime row had items:[] (riskItemNum=0), while the card rendered 4444:2 and 5555:1发 两项+填报人, proving getInspection by inspectionId fetched all items (empty before change).
- Screenshot `C:/Users/Administrator/AppData/Local/Temp/zentao-6899-hover-20261125-192940.png` (1256×581, two card items clear) passed self-check and user confirmation.
- Original bug ticket (双桥小区/event 2123337863714168833) no longer existed in the current test environment: warning dropdown and API had no such event; available inspections had at most 3 items and no "无" sample, so "含『无』值项" could not be reproduced and only the refill chain plus empty-API fallback were verified.
- Audit: status valid, last_checked 2026-11-27T03:19:17+08:00; getInspection/inspectionId hit source and the Zentao 6899 hover full-item workflow record was consistent.

## Writeback And Cleanup
- No-second-ask execution: uploaded screenshot for fileID, generated transaction sequence (attachment 24482.png inline in comment), and completed Zentao resolved/fixed (action 99931, fileID 24482).
- Submodule changed only the two task files, did not touch other people's changes; dual-end commit/push completed with remote SHA checked; process artifacts and background sessions were cleaned.


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6899",
  "source_extraction_id": "fe944f3655ca4283b168a04eb337ebe8",
  "version": 2,
  "memory_type": "entities"
}
-->