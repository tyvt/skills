# HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop9
Nine-section chain handoff document recording the hop9 diagnosis-only state of the Zentao 6891 personnel-change UI task in the 苏州市房地产监测V3 project, written 2026-11-24.

## Location and role
- Path: D:/plan/苏州市房地产监测V3/HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop9-20261124-133607.md
- Follows the hop8 handoff document (see personnel_change_handoff); the next hop reads section 9 of this doc to pick up its action.
- Structure: 9 sections; section 4 lists the 4 unfinished items, section 5 holds the chain meta information, section 9 states the next-hop goal.
- No code was changed in hop9 — pure diagnosis, no build baseline problem.

## Findings recorded in hop9
- Service on port 9212 is running as PID 1904 with log `_dp-run8.log`.
- The 8098 admin login state was rebuilt and a valid token obtained.
- hop8's NPE root-cause hypothesis was falsified: `/page` returns HTTP 200 with full data and row `2113249234228731906` exists in the dev DB with a complete `changeObject`, so `getById(id)` cannot return null.
- Real cause of the observed HTTP 400 is the authorization guard `@RequiresPermissions("company:personnelRecordChange:query")` on the detail endpoint at `PersonnelRecordChangeController.java:60`; the body is `code:403` (permission interceptor), not the `code:500` NPE.
- The admin token carries the `/page` permission but not the `query` permission; all detail endpoints are permission-guarded, the guard fires before ServiceImpl, and `NoPermissionException` lives in a dependency jar (likely `common-utils`).

## Next hop (hop10)
- Scheduled as `schedule-0941aea1-8c66-4214-8969-8888226ea803`, delivered locally at 13:37:09 on 2026-11-24, same chain_id, hop=10, maxHops=10, prompt containing only four items.
- Pending work: log in with the county account `6001039/ZS0001Aa!` to obtain a token carrying the query permission (captcha must be read with `read_image` from the upscaled image) → replay the detail request to reach ServiceImpl for hard evidence → branch handling → frontend verification gate / Zentao writeback → cleanup.

<!-- MEMORY_FIELDS
{
  "category": "tech_doc",
  "name": "personnel_change_handoff_hop9",
  "source_extraction_id": "8f9371b1d9924b29bff1c0a9c01cbc3b",
  "version": 1,
  "memory_type": "entities"
}
-->