# zhi3-web-admin-h5
zhi3-web-admin-h5 is Suzhou Housing's frontend admin project (H5 plus portal admin web), covering enterprise access confirmation, agency personnel changes, and county todo routing.

## Project and Checks
- Pages are `.vue` components; quality checks use eslint static validation plus build verification; full lint has an existing red baseline recorded in AGENTS.md, so judge changes by whether single-file eslint adds new hits.
- On 2026-11-24, the personnel-change UI single-file eslint exited 0; `npm run build` exited 0 in 17s with gitHash `9a324be7f`, matching the submodule HEAD.
- `D:\plan` is blocked by the grep gate; use `pwsh Select-String` to locate sections. The `op:full` model path fails orchestration for file-read requests, so use a narrower request.
- Prefer `ops_inspect_local_file` for local reads; grep `glob` must be an array; if tool parameters look wrong, load tool-call-hygiene first.

## Menu and Routing
- In the 9002 menu table, `institution/agencyPersonnel/detail` has `meta.busCode=jgcyryba` (registration); the change menu `jgcyrybg` has id `2112869088935174145` and still points to the old thin shell; `cyrybg`, `jgcyrybg`, and `zlcyrybg` share that thin shell component.
- Todo resolution gives priority to busCode menu matching and backend `menuRoutes(menuId)` over the registry; changing one registry line still sends county todos to the old thin shell.
- `getId()` takes the last path segment and can parse the change ID from `personalRecordChange/:tableid`.

## Change Orders and Implementation
- Business DB has two real change orders: changeId `2113249234228731906`, recordId `2113209988734361601`, `biz_state=2`.
- Plan: dispatch rendering inside the thin shell by `meta.busCode` (`jgcyrybg` -> `AgencyPersonnelDetail`) and revert the registry change, avoiding fallback to the `busCode=jgcyryba` registration menu that would prevent change-state activation; plan document v2 includes 9002 SYS_MENU evidence.
- Route risk: `/personalRecordChange/:tableid` lacks `agencyPersonnel`, so `resolvePersonnelOrganTypeByRoutePath` misclassifies it as developer (01); rely on `auditBusCode`'s `|| ORGAN_TYPE_AGENCY` fallback and `changeActive`'s second argument forcing `ORGAN_TYPE_AGENCY`; under the thin shell `isPersonnelChangeRoute` is always true and `changeRecordId` comes from the last path segment.
- The detail API at `api/company/personnelRecord.js:195` uses `POST /company/personnelRecordChange/detail` with a bare changeId (19-digit ID sent as a quoted string); `request.js` `normalizeV3ApiUrl` does not rewrite `/detail`.
- `detail.vue` already dispatches to `AgencyPersonnelDetail` when `meta.busCode===jgcyrybg`; `todoRouteRegistry.js:141` was reverted, removing regression risk.

## Verification, Handoff, and Bug 6962
- hop3 verification used local 8098 (static service with new build artifacts, API proxy 9002; see `zhi3_local_verify_chain` entity), so no 9002 upload was needed; real-browser verification stalled because clicking login on 8098 redirected to 8101 and 8098 had no token (stale login, requires re-login with a county account). On 2026-11-24 hop7 concluded that HTTP 400 was a backend defect (NPE; see `fangdichan_backend` entity); the frontend thin-shell fix was correct, but the page rendered 0 fields because of 400 and could not pass the verification gate, so the hard constraint forbade an empty ZenTao write-back; hop5 tested two valid dev-DB ids, one 9002 id, and five account/data combinations, all 400, so changing data did not help. Outstanding chain actions: real-device screenshots into the session and user confirmation, commit/push, ZenTao write-back with embedded image, and artifact cleanup.
- Handoff docs: `HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop2-20261124-1009.md` (9 sections, chain_id/hop=2/maxHops=10) and `HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop7-20261124-1312.md` (9 sections; section 4 unfinished items, section 6 startup template); hop7 cost 1.01M triggered P0 hard handoff; hop8 schedule `schedule-fb1dd7dd…` (triggered 2026-11-24 13:13, new session) had pending dev-DB credentials, residual java PID `27748`, and `estate-manange-v3` worktree cleanup.
- Pre-closure Bug 6962 findings: 9002 ran the old remote build (dialog 500px, truncated text), local dist had 640px, 8103 was local new dist plus backend 9002 but its account failed, and local login also used 8098 (user/institution login tabs, captcha `.login-code`); during that check, 8098 backend returned 502 and the 8103 Kunshan account failed, blocking the new-build login gate. hop1 CSS using `.approval-dialog.el-dialog` compiled under scoped CSS as one element with both classes; real DOM had outer `.approval-dialog` and inner `.el-dialog`, `sameCount=0`, 0 hits, still 500px; wrapper data-v was `4e03e3df` while dist CSS hardcoded `719e6092`, also mismatched. Correct CSS fix was `.approval-dialog :deep(.el-dialog)`, compiled as a descendant selector hitting the inner `.el-dialog`; real device hit 1 and the second item was complete at 640px; the source selector was changed and eslint PASSED.
- Captcha experience: 8103 captcha is a 160x60 JPEG mis-saved as gif; clicking the captcha changed the image and mismatched refs/code; a named archive `.gif` was actually JFIF; the `captcha-recognizer` default model failed and needed a cursor model; final submission set the value once in eval.
- Bug 6962 closure status supersedes the earlier unfinished state: it was fully closed on 2026-11-25 with resolved/fixed write-back, attached image, git pushes, and cleanup (see `zentao_bug_6962` entity); earlier background build task `bash-382c388eedfe4843`, watchdog path uncertainty, and hop3 schedule `schedule-33962725…` (DTSTART 12:12:21) are historical handoff notes.

<!-- MEMORY_FIELDS
{
  "category": "frontend_project",
  "name": "zhi3_admin_h5",
  "source_extraction_id": "ce61e01aa0944a3391e938adc440bc7d",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 7,
  "memory_type": "entities"
}
-->