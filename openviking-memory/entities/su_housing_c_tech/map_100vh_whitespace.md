# 小程序100vh减导航栏高致地图留白
苏住房C 微信小程序中 `houseMap.vue` 的 `.container` 用 `calc(100vh - 43px - env(safe-area-inset-top))` 计算高度，因页面内容区已在导航栏下方，导致容器偏矮、底部留白。

## 问题根因
- 微信小程序页面内容区已在导航栏下方
- `.container` 用 `calc(100vh - 43px - env(safe-area-inset-top))` 使容器偏矮，底部留白

## 修复要点
- 为 `page` 设置 `height: 100%` 与 `overflow: hidden`
- 将 `.container` 高度改为 `height: 100%` 铺满地图

## 涉及文件
- src/pages/houseMap/houseMap.vue
- src/components/ZsMap/ZsMap.vue
- src/pages.json
- src/pages/houseMap/components/NewHouse.vue
- src/pages/houseMap/components/StockHouse.vue
- src/pages_main/houseMap/houseMap.vue
- src/pages_main/houseMap/components/NewHouse.vue
- src/pages_main/houseMap/components/StockHouse.vue

## 验证与归属
- 验证证据：extracted source=cursor session=5735d92c-20ba-4d48-87c7-2b6597fa43b8
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：5735d92c-20ba-4d48-87c7-2b6597fa43b8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "map_100vh_whitespace",
  "source_extraction_id": "41104766f2154919ae35cea9ede14f5c",
  "version": 1,
  "memory_type": "entities"
}
-->