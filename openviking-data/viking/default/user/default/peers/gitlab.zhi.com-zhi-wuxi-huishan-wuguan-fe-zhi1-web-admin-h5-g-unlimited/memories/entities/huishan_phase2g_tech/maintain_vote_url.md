# ZenTao task 2768 — maintenance fund voting URL bug
Frontend bug in the Huishan phase-2G zhi2-web-admin project where the 维修资金表决 page requested the voting list with the wrong decisionType.

## Problem
- ZenTao task 2768「【惠山维修资金】维修资金表决url问题」, type affair, created about 20 minutes before 2026-11-24 02:22, no remarks; attachments 24052 (API response) and 24057 (dictionary config).
- `/estate/ownerDecision/list` was called with `decisionType=OWNERS` and returned no data.
- Dictionary config: 「维修资金表决」= `MAINTAIN`, 「业委会选举」= `OWNERS`.

## Root Cause
- `index.vue:304` derives `decisionType` from the second segment of the route name (`maintain` → `MAINTAIN`, otherwise `OWNERS`).
- The 维修资金表决 menu's route name second segment is not `maintain`, so the page fell into the OWNERS branch; the table header showing 「关联业务编号」 (non-maintain wording) confirmed it.
- Suspected regression: commit `ae02888b2` (2026-08-03) changed the route check from `'owner'` to `'maintain'`; route names are generated dynamically from backend menu data, so the real route name still needed on-site verification.

## Environment
- Test site https://180.101.184.99:8280/index (admin account); ZenTao at http://zentao-biz.zhi.com/index.php.
- Browser reproduction used agent-browser with `--ignore-https-errors` because the site certificate is untrusted.
- grep is blocked at the repository root; narrow the search to the submodule directory.


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-huishan-wuguan-fe-zhi1-web-admin-h5-g-unlimited",
  "category": "huishan_phase2g_tech",
  "name": "maintain_vote_url",
  "source_extraction_id": "34843479341349bdb6b1873a2fb5df7e",
  "version": 1,
  "memory_type": "entities"
}
-->