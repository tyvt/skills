# Summary
2026-11-24，nginx sites-enabled 迁移脚本把 7 个 test 项目的本环境站点改为 dev 端口但保留 test 网关，对端站点也使用 test 网关，导致两端网关都显示 test；nginx conf 处于半迁移状态，下一跳需先修复并 reload。
# 2026-11-24 (Tuesday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 部署面板网关字段显示不下不要省略，换行显示。然后如果有dev.zhi.com，需要自动补全test.zhi.com反之亦然
...
**assistant [peer=github.com-tyvt-skills]**: The generator script has a parse error (pre-existing, out of scope). The live H5 sites are hand-written confs in `sites-enabled/` — I'll edit those surgically with a script driven by the registry (single source of truth), backing them up first.
**assistant [peer=github.com-tyvt-skills]**: There's a bug in my conf mapping: for the 7 test projects, the "own" site got the **dev** port (8131) but kept the **test** gateway, and the counterpart got the test port with a test gateway — both gateways are test. I matched "own" by wrong logic. Let me inspect and fix: the original conf keeps its original gateway and should move to its original env's port; the counterpart conf gets the swapped gateway on the other port.
**assistant [peer=github.com-tyvt-skills]**: Hard handoff threshold reached — I must stop this session and hand off. There's a half-finished, **broken nginx conf state** that the next hop must fix first. Writing the 9-section handoff document now.

<!-- MEMORY_FIELDS
{
  "event_name": "nginx配置网关错配",
  "goal": "记录迁移阻塞",
  "summary": "2026-11-24，nginx sites-enabled 迁移脚本把 7 个 test 项目的本环境站点改为 dev 端口但保留 test 网关，对端站点也使用 test 网关，导致两端网关都显示 test；nginx conf 处于半迁移状态，下一跳需先修复并 reload。",
  "ranges": "0,147-151",
  "source_extraction_id": "221a47048a6d4a67b869b4aa55189906",
  "version": 1,
  "memory_type": "events"
}
-->