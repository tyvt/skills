# ZenTao Task 2953
ZenTao task 2953 / story 1548 "workbench new entries and redirects" entered implementation on 2026-11-26; two-repo code changes were done and equivalent-cost cap triggered handoff.

## Requirements
- Workbench "常用功能" adds 5 entries (巡检记录/巡查填报/隐患上报/物业自查/汛中巡检) and 3 groups (电动车巡检/项目检查/防台防汛); common shortcuts and group entries must point to the same H5 link.
- Property self-check start must default the management area to the area selected at the page top.
- Four checks (property self-check/street/district/city) remove the first "更多筛选" item "行政区划".
- Street/district/city checks remove the "发起检查" button.

## Repo decisions
- `物业手持B端` is a uni-app project with only src/pages/workbench/index.vue and no "项目检查" page; git had only untracked bun.lock.
- Requirements 2–4 project-check pages are in sibling repos `苏住房防汛C端` / `苏住房G`.
- Requirement doc gave no new H5 URLs and repo had no link config; user confirmed both repos must be changed and sibling routes reused.

## Progress and browser validation
- Plan review 84/100, 3 gray areas confirmed/locked, approved_sha256=02e249cc8b…; B-end completed two changes: workbench sections expanded to 6 groups (common functions +5 entries and 3 new groups), pages.json registered webview route. Cost 1.01M crossed 1.00M → P0 handoff; wrote 9-section D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop1-20261126-160042.md; hop1 schedule-2c7e02eb… 16:01:28 target=new_once. 2026-11-26 hop2 read §5 chain_id=禅道2953工作台新增入口及跳转/hop=2, §4 nonempty → continue; §8 completed items forbidden: two-repo code + npm run build EXIT=0, authoritative spec review, hop1 evidence.
- Frontend gate blocked by B-end localhost:8180 credentials (account+password+captcha; panel login_user=null, privacy DB no account); clarify-first obtained credentials. Doc §8 H5_BASE=...h5-zhishu.shimin...zhi.com from sibling vite.config.ts:6 differed from user gateway ...h5.query....zhishusz.com; doc won, H5_BASE unchanged, gateway only local verification proxy target. Credentials registered/verified in deployment panel: password in privacy DB (no plaintext), property/admin roles and H5 gateway included; fixed `secret_ref` mismatch where login_user=601117997 property role was overwritten by admin ref. Cost 158k>150k → handoff doc + hop4 schedule 16:19:09 target=new clean session with four prompts.
- hop7 (08:37–08:44): chain doc §5 hop=6, schedule hop=7, cap → hop8; continue §4; do not redo two-repo code/build(EXIT=0), credentials, login-page tagging, captcha command fix. Browser notes: MSYS timeout returns 126 so unused; hanging command moved to background with output returned; never kill hanging job because previous kill broke browser CLI bridge; after reopen three inputs lacked DOM ids (hop6 tagging lost), stable order account/password/captcha, retagged; CLI supported `network requests`/`network console`; captcha was valid JPEG (2892B), expression `8-2=?`; login root cause: POST /api/v2.0/security/auth/userLogin returned 400 and toast "用户名或密码错误" twice, captcha passed, likely uni-app DOM value changed but Vue data unsynced, next hop use HAR to confirm body.
- hop7 cost 157k handoff: wrote D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop7-20261126-1643.md; hop8 schedule-19d21b39-f730-40a4-9409-4da34101c82c (session-a5106a55…, 16:44:08, new_once); did not kill browser job, preserving bridge. hop13 (chain_id unchanged, no maxHops, no "last hop" labels, finish only when §4 clear): gateway conf fixed/reloaded and failure root excluded; refreshed page then patched XHR `__netlog` (invalid after refresh); vision solved `3+5=?`→8; account 601117997/password from privacy DB, single-quote fill readback correct; Windows temp path used because MSYS /tmp and Windows python do not interoperate.
- hop13 login succeeded via eval click on single `uni-button` (not click @e5), URL→`/#/pages/home/index`, user/permission/msg 200, token in localStorage (42259 chars). Current area=嘉樾时代花园 (projectId=667585159348728), workbench `/#/pages/workbench/index` loaded 6 groups, checked h5RouteMap/openH5/handleMenu anchors src/pages/workbench/index.vue:197-256. Cost 152k handoff: wrote 9-section D:/plan/物业手持B端/HANDOFF-CHAIN-禅道2953工作台新增入口及跳转-hop13-20261126-1706.md; hop14 schedule at 17:06:46, active, schedule_list first, P0 top confirmed; did not rerun build/credentials/conf/captcha recognition.

## Pending work
- agent-browser real verification: 6 group redirects + new entry redirects + req2/start carries selected area, req3/more filter hides 行政区划, req4/checkType 2/3/4 hides 发起检查.
- Screenshot self-check + present + inline (`screenshot --full` → `$env:TEMP/zentao-2953/`), ask_user_question confirmation; after confirmation commit/push both repos + ZenTao 2953 writeback with image.
- Clean temporary artifacts and jobs; if cap is hit again follow handoff chain, chain_id unchanged and no maxHops.

<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2953",
  "source_extraction_id": "e8d8784aa3c948b1924f4af1cfee6f85",
  "version": 6,
  "memory_type": "entities"
}
-->