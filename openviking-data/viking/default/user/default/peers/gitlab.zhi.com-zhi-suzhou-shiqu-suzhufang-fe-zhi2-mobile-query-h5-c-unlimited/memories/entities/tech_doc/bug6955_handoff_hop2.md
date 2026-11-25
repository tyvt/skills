# HANDOFF-CHAIN-bug6955-home-realdata-hop2
Nine-section chain handoff document recording the hop2 state of the Zentao 6955 "home real data" task in the 苏住房防汛C端 project, written 2026-11-25.

## Location and role
- Path: `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug6955-home-realdata-hop2-20261125-0959.md`.
- 9 sections complete; section 4 lists the unfinished items, section 5 holds chain metadata (hop=2, maxHops=10), section 9 states the next-hop action.
- Follows the hop1 document (see bug6955_handoff_hop1); the hop2 session read all 9 sections of hop1 and continued the work.

## State verified in hop2
- `home/index.vue` script + template fully converted: static keyNav/revenue/repair/eval/public replaced by reactive real data, 7 interfaces fetched concurrently with race protection, "—" shown on failure.
- G/B role split: `wyqy|wyqygly` treated as B端, `onShow` reload (imported from `@dcloudio/uni-app` after a TS2305 fix), B端 hides 关键数据导航/双晒公示/区域 chips; evaluation fixed at 0.
- `typecheck` shows 0 errors in home/index.vue; `build` exit=0; unlogged G端 real-device snapshot showed no MOCK residue.

## Next hop (hop3)
- Scheduled as `schedule-2176a2fd-127f-40c7-89cf-475f7f432f7d`, `new_once`, delivered locally at 2026-11-25 10:00:10.
- Pending work: G/B logged-in real-data verification with screenshots ($env:TEMP), user confirmation, commit plus Zentao writeback with images, artifact cleanup.
- Key fixes recorded: `onShow` must be imported from `@dcloudio/uni-app`; the browser needs a hash-query cache-buster to bypass stale lazy chunks.

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "tech_doc",
  "name": "bug6955_handoff_hop2",
  "source_extraction_id": "f17148c777c5430ab125496202904b96",
  "version": 1,
  "memory_type": "entities"
}
-->