# 地图找房菜单路由指向旧路径修复
苏住房C小程序「地图找房」因菜单路由仍指向旧分包路径导致页面找不到，已修复。

## 问题根因
- `houseMap` 已迁到 `pages_main` 分包（`pages.json` 中为 `pages_main/houseMap/houseMap`）
- 菜单路由仍指向旧路径 `/pages/houseMap/houseMap`，小程序找不到该页面

## 修复内容
- `menuRouteMap.js`：菜单码 `1_4_5`（地图找房，`type=0`）改为 `/pages_main/houseMap/houseMap?type=0`
- `stockHouse/index.vue`：二手房页「地图找房」入口改为 `/pages_main/houseMap/houseMap?type=1`
- `Home_Suzhufang.vue`、`Project_Suzhufang.vue` 已使用正确路径，无需改动

## 补充与归属
- `menuRouteMap.js` 仍有若干路径用旧 `/pages/` 前缀（如 `home/search`、`message/index`、`collect/index`），可同样改为 `pages_main`
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：395868ae-5e71-4d74-afd9-9f02b478b2f1

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "housemap_route_fix",
  "source_extraction_id": "aac1b2384e6740f491121840123bb125",
  "version": 1,
  "memory_type": "entities"
}
-->
