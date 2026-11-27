# ZenTao Bug 7017
Zhi2 flood-control C-end (zhi2-mobile-query-h5-c) check form changed the "评价等级（可修改）" row into a directly editable category-title badge with a pencil icon, reusing level-change logic; closed on 2026-11-26 after hop3.

## Goal and chain
- Link: http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7017; front-end UI change in src/pages/project-check/form/index.vue.
- Goal: remove the independent "评价等级（可修改）" row; make the title-bar level badge directly editable and add a pencil icon; reuse existing change-level logic.
- chain_id=bug7017-评价等级标题栏直接编辑; hop1 code/build/static check/plan review done; hop2→hop3 continued without redoing completed work.
- Completion gate: screenshot user confirmation, dev commit/push, ZenTao resolved/fixed with image, cleanup.
- Conflict judgment in hop2: §5 said hop=1/maxHops=10, actual schedule hop=2/no maxHops, termination by unfinished items; §9 "hop=2" was a hop1 typo; next hop should be hop3.

## Environment
- Direct login used AES password via POST /api/v2.0/security/auth/userLogin, captcha from /api/v2.0/code enabled, projectId=suzhufang; token from uni.setStorageSync in sessionStorage, returning valid accessToken JWT + token.
- Ports 8150, 8162, and a third port returned 200 and the same dist with new pc-cat-level-icon/old class removed; fix deployed.
- local=1 form read draft key pc-check-draft:active; App.vue onLaunch jumps home when token exists, so begin without token, inject token/draft, then SPA hash-jump to the form route.
- agent-browser batch ran as a daemon (kill resets state); use new session names, avoid wait --load because H5 long connections hang, use wait --text; session bug7017v2 was alive.

## Verification
- Editable badge rendered; tree showed a clickable picker with 5 levels and "市标三级" selected (e7), proving levelEditable=true.
- DOM self-check: "市标三级" inside picker (pickerInsideBadge=true); pencil icon uni-icons uniui-compose pc-cat-level-icon rgb(7,94,209)=#075ed1, 12px; old class gone; title "01 综合能力"; programmatic .click() could not open the uni-app picker because a real pointer event was needed.
- Screenshot C:/Users/Administrator/AppData/Local/Temp/bug7017-verify-editable-20261126-144114.png (135 KB) passed hop3 five checks and user confirmation; confirmation authorized commit/push and ZenTao writeback (ZenTao task no second ask).
- Real pointer test in bug7017v2: picker expanded with 5 options e34-e38, current "市标三级"; click "市标一级" (e34) and "确定" (e40); badge changed "市标三级"→"市标一级"; onLevelChange effective; pickerInsideBadge=true, oldClassGone=true, pencil icon remained.
- levelEditable=false: line 427 v-if picker+icon, line 430 v-else plain text/no icon/not clickable; draft change/reload, SPA hash jump, runtime Vue value changes failed because form was a closure variable and setupState traversal of 14 layers did not expose it; used labeled source static verification (v-else build-time fixed, no runtime uncertainty); npm run build exit 0 before/after with no stale old references.

## Delivery and cleanup
- hop3 handoff HANDOFF-CHAIN-bug7017-评价等级标题栏直接编辑-hop3-20261126-1441.md (9 sections), §5 chain_id/hop=3/maxHops=10, §4 had 4 unfinished; hop2 schedule schedule-bcfb7b99… new_once 2026-11-26 14:42:11 (+15s), four prompts, new session-0d52e6c6….
- Only change src/pages/project-check/form/index.vue:425-431,580-581; commit 9c3456e pushed dev; worktree clean.
- ZenTao: screenshot fileID=24592; pre-writeback product=9/project=141/execution=142/openedBy=lichandan/status=active, assignedTo lichandan; first real change triggered gate so todo was created; resolve script generated transaction; new session 4027e274 ran UPDATE zt_bug + INSERT zt_action (14 columns, inline image, files='24592', product/project/execution=9/141/142) and attached file to bug/7017.
- Verified status=resolved/resolution=fixed/resolvedBy=tiany/assignedTo=lichandan, action files=24592, attachment objectType=bug/objectID=7017; transaction committed and session closed.
- Cleanup: temp script dir and verification image after fileID 24592; hop1/hop2 leftover agent-browser PIDs 1820 runner and 24092 niu.exe (cwd locked bug7017 dir causing "Device or resource busy"; do not blindly retry); global chrome daemon untouched; worktree clean, todos closed, chain ended.

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7017",
  "source_extraction_id": "e8d8784aa3c948b1924f4af1cfee6f85",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->