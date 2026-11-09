# Summary
The houseMap page was migrated to pages_main subpackage (pages.json configured pages_main/houseMap/houseMap), but menuRouteMap.js still pointed to old /pages/houseMap/houseMap causing not found. Menu code 1_4_5 updated to /pages_main/houseMap/houseMap?type=0, stockHouse/index.vue entry changed to ?type=1, and residual old /pages/ prefixes in menuRouteMap.js need same update.
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】fact
【标题】分包页面迁移后菜单路由未更新致找不到
【内容】`houseMap` 迁至 `pages_main` 分包（`pages.json` 配置 `pages_main/houseMap/houseMap`），但 `menuRouteMap.js` 菜单路由仍指向旧路径 `/pages/houseMap/houseMap` 致页面找不到。`menuRouteMap.js` 菜单码 `1_4_5` 改为 `/pages_main/houseMap/houseMap?type=0`，`stockHouse/index.vue` 入口改为 `/pages_main/houseMap/houseMap?type=1`；`menuRouteMap.js` 残留旧 `/pages/` 前缀路径需同方式改为 `pages_main` 分包路径。
【验证证据】src=苏住房C/074.md
【涉及文件】d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/menuRouteMap.js ; d:/repository/苏住房C/zhi2-mobile-shimin/src/utils/route-map.js ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages.json ; d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/stockHouse/index.vue ; d:/repository/苏住房C/zhi2-mobile-shimin/scripts/migrate-pages-main.mjs ; pages.json ; menuRouteMap.js ; stockHouse/index.vue
【来源会话ID】395868ae-5e71-4d74-afd9-9f02b478b2f1
【代码基线】none

<!-- MEMORY_FIELDS
{
  "event_name": "subpackage_route_update",
  "goal": "Update menu route paths",
  "summary": "The houseMap page was migrated to pages_main subpackage (pages.json configured pages_main/houseMap/houseMap), but menuRouteMap.js still pointed to old /pages/houseMap/houseMap causing not found. Menu code 1_4_5 updated to /pages_main/houseMap/houseMap?type=0, stockHouse/index.vue entry changed to ?type=1, and residual old /pages/ prefixes in menuRouteMap.js need same update.",
  "ranges": "17-22",
  "source_extraction_id": "1f9551ad6bc2466fbbeb54613828c3ca",
  "version": 1,
  "memory_type": "events"
}
-->