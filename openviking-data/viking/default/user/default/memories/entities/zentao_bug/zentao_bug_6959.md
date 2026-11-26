# ZenTao Bug 6959
ZenTao bug 6959 was closed on 2026-11-25 after fixing four home todo-card issues on the zhi2-mobile-query-h5-c management app, verifying them, and completing push/write-back.

## Problem and Goal
- Page/UI/layout bug submitted 2026-11-25 10:09; involved the todo, done, and initiated-by-me tabs; old image showed badge 12 vs expected 14 and texts "共12项待办" and "共6项待办需处理".
- fileID 24285 is the H5 result image; fileID 24284 is the different-product G-end admin web reference; both were in D:\禅道附件\bug\6959.
- Goals were to use real todoNum for counts, put icon/title on one row aligned with the news section, remove duplicate counts, and remove the hint under the title.
- The handoff's maxHops=10 conflicted with the 2026-11-23 P0 rule "no maxHops/forbid maxHops"; both allowed continuation, so the handoff was followed.
- localhost:8161 dev home returned HTTP 200 without login; without a token todos were 0 (API fallback); /api returned 200 JSON and a base64 JPEG captcha; no login6959*.json token cache existed.

## Root Cause and Environment
- The count in src/pages/home/index.vue:277-290 used getTodoTaskList.taskPage.total=12, while authoritative 14 came from G-end taskCount; the real contract was todoNum (measured 4940 then 4912).
- Commit fac366a at 10:07, before submission, already made hardcoded "12" and "共6项待办需处理" dynamic and removed "需处理"; the historical online image came from an old build.
- The user confirmed adding a taskCount API, gave a test account and URL, and requested panel registration; the panel stored account, external frontend URL, and secret_ref (credential deploy_env-huishan-g-dev; target_key without Chinese).
- zt_bug.steps required SUBSTRING chunking because cells truncate at about 200 characters; DBX used the "new ZenTao" connection with parameter sql, not query.
- Chrome/CDP port 9229 worked despite doctor reporting no binary; the process ran from D:\ungoogled-chromium\App\chrome.exe, but killed daemon pid 14348 left stale state and a shared-profile lock; batch single-process agent-browser was required because non-batch relaunched, refs did not persist, uni-input made CSS positioning unstable, login button @e4 was needed (--name 登录 hit a tab), captcha refresh required cropped recognition, and CLI output needed background redirection.

## Verification and Fix
- Work completed plan review and sha backfill, pre-change build (nohup npm failed under MSYS, then Windows npm background), four changes, post-change build and tests green, and deployment-panel registration.
- UI captcha login repeatedly failed because each CLI call took about 120s and expired the captcha; answers 3+1=4 and 6+5=11 were still rejected, so API login with AES-encrypted password plus vision captcha succeeded, produced a 270-character JWT, and returned todoNum=4912.
- The token was in localStorage['flood-token-v1'] and ?token=xxx injection was supported; screenshot C:/Users/Administrator/AppData/Local/Temp/zentao-6959/verify-home-20261125-131148.png showed 4912 and fixes ①③④ and was presented to the user.
- DOM checks showed .todo-head with icon/title/badge in one row and removal of .todo-main, .todo-sub, .todo-more, and .todo-title-row.
- The user said todo content disappeared: fix ② meant left-aligned content and ④ meant removing the hint, so deleting the whole todoText row was over-fixing; content "物业服务合同备案：东清财富广场" remained in portalData.ts:180 and the user chose a restored single-line summary.

## Write-back and Handoff
- ZenTao 6959 was written back with image fileID 24348 and zt_action 99536 as resolved/fixed; commit d2effe5 was pushed to origin/dev, artifacts were cleaned, and the chain ended.
- The P0 gate required agent-browser to open the changed home page, screenshot to $env:TEMP\zentao-6959\, self-check with read_image, present the same body with embedded forward-slash absolute path, and ask_user_question; commit/write-back was forbidden before confirmation and later passed.
- chain_id=bug6959-home-todo moved hop3→hop4; plan review scored 82/100 and triggered P0 hard handoff; hop2 hit P0 at 1.01M and wrote a 9-section new_once handoff; hop2/hop3 both reached about 1.00M.
- Section 4 stayed unfinished, so the chain continued; hop3 handoff was D:\plan\苏住房防汛C端\HANDOFF-CHAIN-bug6959-home-todo-hop4-20261125-132328.md with 9 sections and five section-4 todos.
- The next hop was schedule-29bd0841…, new_once, DTSTART 13:24:35+08:00; hop4 restored the .todo-sub single-line content line from portalData.ts:180, reran build/test, passed the image/user verification gate, wrote back with image, committed, and cleaned artifacts.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6959",
  "source_extraction_id": "016ade41304a4d5e92868fb2a5bc1ea2",
  "version": 7,
  "memory_type": "entities"
}
-->