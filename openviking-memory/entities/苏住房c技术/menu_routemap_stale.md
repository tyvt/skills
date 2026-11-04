# 菜单码跳转表menuRouteMap页面迁移漏改
苏住房C小程序因houseMap迁入pages_main分包后，菜单码映射表menuRouteMap.js仍指向旧路径，导致点菜单报page not found。
## 问题现象
- 小程序点「地图找房」报navigateTo:fail page "pages/houseMap/houseMap?type=0" is not found
- houseMap已迁入pages_main分包（注册为pages_main/houseMap/houseMap）
- 菜单码1_4_5路径仍是旧/pages/houseMap/houseMap
## 根因
- menuRouteMap.js是「后端菜单码→前端页面路径」硬编码表，页面搬迁不自动改
- 不在pages.json校验范围，编译不报错只有点到才炸
## 解决方案
- 收到page not found先到pages.json搜路径确认真实分包前缀
- 除页面内router调用，必须额外排查menuRouteMap.js与utils/route-map.js（旧路径归一化层）
- 批量对账menuRouteMap.js中仍写/pages/前缀项（home/search、message/index、collect/index等）
- 首页入口类页面同步：二手房地图找房type=1、首页type=0路径相同query不同，别只改一处
## 验证与归属
- 会话395868ae：navigateTo失败，houseMap已迁至pages_main，menuRouteMap.js与stockHouse二手房入口仍指向旧路径
- 涉及文件：src/utils/menuRouteMap.js、src/utils/route-map.js、src/pages.json、src/pages_transaction/stockHouse/index.vue
- 所属项目：苏住房C；来源会话ID：395868ae-5e71-4d74-afd9-9f02b478b2f1；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "menu_routemap_stale",
  "source_extraction_id": "1d069700b22d47f4910ca8e2360f52a7",
  "version": 1,
  "memory_type": "entities"
}
-->