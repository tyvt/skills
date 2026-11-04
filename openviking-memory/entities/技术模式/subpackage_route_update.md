# 分包页面迁移后菜单路由未更新致找不到
苏住房C 移动端 `houseMap` 迁至 `pages_main` 分包后 `menuRouteMap.js` 仍指向旧路径致页面找不到，已更新路由。

## 问题根因
- `houseMap` 迁至 `pages_main` 分包（`pages.json` 配置 `pages_main/houseMap/houseMap`）
- `menuRouteMap.js` 菜单路由仍指向旧路径 `/pages/houseMap/houseMap` 致页面找不到

## 修复要点
- `menuRouteMap.js` 菜单码 `1_4_5` 改为 `/pages_main/houseMap/houseMap?type=0`
- `stockHouse/index.vue` 入口改为 `/pages_main/houseMap/houseMap?type=1`
- `menuRouteMap.js` 残留旧 `/pages/` 前缀路径需同方式改为 `pages_main` 分包路径

## 涉及文件
- src/utils/menuRouteMap.js
- src/utils/route-map.js
- src/pages.json
- src/pages_transaction/stockHouse/index.vue
- scripts/migrate-pages-main.mjs

## 验证与归属
- 验证证据：src=苏住房C/074.md
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：395868ae-5e71-4d74-afd9-9f02b478b2f1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subpackage_route_update",
  "source_extraction_id": "792ac32c904246d5a8d095eccd5645e4",
  "version": 1,
  "memory_type": "entities"
}
-->