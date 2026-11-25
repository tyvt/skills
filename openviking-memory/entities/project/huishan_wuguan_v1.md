# Huishan Property Management V1 Frontend (zhi1-web-admin H5)
The Wuxi Huishan property management admin H5 frontend project is validated locally on nginx at localhost:8100.

## Project Information
- GitLab project `gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited`.
- Local deployment uses a self-built nginx site pointing to the local `dist` build, accessible at `http://localhost:8100/`.
- Login uses an admin account plus a graphic arithmetic captcha (2026-11-24 example: `8-5=?`, answer 3).

## Budget Filing Vote Task
- The 2026-11-24 handoff defined the goal and remaining items (sections 1 and 4/9): fix the 404 related to `hasOnlineDecisionPush` after clicking "Start Vote" on the Budget Filing Application detail page.
- Code was changed and the build passed twice as required by section 3 (baseline and post-change, both exit 0; this is a do-not-rerun item).
- Real-browser validation entered the detail page from the todo item "Budget Filing Application - Tianqi City Building A"; after clicking "Start Vote", the network panel showed no `hasOnlineDecisionPush` request and no 404, so the core assertion passed.
- Remaining steps: select maintenance object rows in the dialog, confirm, assert the radio is available and no 404 dialog appears, capture a full-page screenshot, then put evidence in the session, commit/push, write back to Zentao, and clean artifacts.

## Maintenance Fund Vote Route Name Defect
- Root cause: the Huishan site uses route name=`OwnerDecision/owner` for "Maintenance Fund Vote"; `$route.name.split('/')[1]=='owner'` is not 'maintain', so 13 checks each in `estate/ownerDecision/index.vue` and `detail.vue` took the OWNERS branch.
- The same component is reused by routes vote (owners committee election) and supervisory (supervisory committee); commit ae02888b2 had changed owner occurrences in comments to maintain, but the Huishan menu still emitted `OwnerDecision/owner`.
- Fix: checks accept both `owner` and `maintain` through computed `isMaintainDecision` references (index.vue:304 and detail.vue).
- Validation on 2026-11-24: local nginx 8100 site showed 542 records, headers "Associated Business Name" and "Business Type", and request decisionType=MAINTAIN; vote/supervisory regression passed.
- Delivery: remote SHA `9c7dea66e` was pushed and the parent gitlink updated; the uncommitted deletion of `src/api/estate/ownerDecision.js` was left out because it was pre-existing work by someone else.


<!-- MEMORY_FIELDS
{
  "category": "project",
  "name": "huishan_wuguan_v1",
  "source_extraction_id": "e3712e5dae714c35b6d3f4d5e0113e49",
  "version": 3,
  "memory_type": "entities"
}
-->