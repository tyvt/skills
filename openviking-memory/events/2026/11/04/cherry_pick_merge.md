# Summary
The full merge of develop/v2.6.1 to develop/v2.6.2 had many conflicts; the team switched to cherry-picking fix commits 666278cd7 and 199b0430b into develop/v2.6.2 and develop/v2.6.2-yulin. Local env/.env proxy changes were identified as dev config and not committed; workspace was switched back to develop/v2.6.1.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】workflow
【标题】全量合并冲突多故仅 cherry-pick 提交
【内容】全量合并 `develop/v2.6.1` 至 `develop/v2.6.2` 冲突较多，改为仅 cherry-pick 修复提交（`666278cd7`、`199b0430b`）至 `develop/v2.6.2` 与 `develop/v2.6.2-yulin`。本地 `env/.env` 代理修改属开发配置未纳入提交，工作区切回 `develop/v2.6.1`。
【验证证据】src=产品2.0/037.md
【涉及文件】d:/repository/产品2.0/zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/index.vue ; d:/repository/产品2.0/zhi2-web-admin/src/views/benefit/resourcesLeaseContractFiling/index.vue ; d:/repository/产品2.0/zhi2-web-admin/src/components/zs-table/zs-table.vue ; d:/repository/产品2.0/zhi2-web-admin/src/styles/index.scss ; d:/repository/产品2.0/zhi2-web-admin/src/mixins/listMixins.js ; d:/repository/产品2.0/zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue ; d:/repository/产品2.0/zhi2-web-admin/src/mixins/leaseContractMixins.js ; d:/repository/产品2.0/zhi2-web-admin/src/mixins/table.js
【来源会话ID】23fa39f4-c905-4fc1-b62e-36ce2d716c82
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "cherry_pick_merge",
  "goal": "avoid merge conflicts",
  "summary": "The full merge of develop/v2.6.1 to develop/v2.6.2 had many conflicts; the team switched to cherry-picking fix commits 666278cd7 and 199b0430b into develop/v2.6.2 and develop/v2.6.2-yulin. Local env/.env proxy changes were identified as dev config and not committed; workspace was switched back to develop/v2.6.1.",
  "ranges": "7-12",
  "source_extraction_id": "3c9ed998705f417e8c48593f229edd2c",
  "version": 1,
  "memory_type": "events"
}
-->