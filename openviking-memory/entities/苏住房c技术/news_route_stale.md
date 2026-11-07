# 新闻详情页迁pages_main后旧路径残留致page not found
苏住房C小程序首页点「新闻资讯」报 navigateTo:fail page "pages/news/detail?id=..." is not found，因新闻详情页已迁 pages_main 分包但跳转仍用旧 /pages 路径。

## 问题现象
- 首页点「新闻资讯」报 navigateTo:fail page "pages/news/detail?id=..." is not found
- 页面已迁到 pages_main/news/detail，pages.json 无旧 /pages/news/detail

## 根因
- 新闻详情页从 /pages/news/detail 迁到 pages_main/news/detail
- 首页 Home_Suzhufang.vue 的 goNewsDetail 仍硬编码旧路径
- menuRouteMap.js 同一批菜单也残留旧路径（3_1_10 列表、3_1_16 详情）

## 解决方案
- 跳转路径不要在各页面手写字符串，统一走 src/utils/route-map.js 的 PAGES 构造器（如 PAGES.news.detail(id)），页面迁移只改 route-map 一处
- menuRouteMap.js 同一批菜单也需同步改成 /pages_main/news/...
- 出现同类 page not found 按「菜单 key → menuRouteMap.js → route-map.js → 页面内硬编码跳转」顺序全量排查未迁移的 /pages/... 路径，不只修报错那处

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 29317b48 用户贴 MiniProgramError 报 pages/news/detail not found；定位页面已迁 pages_main，修复 Home_Suzhufang.vue 的 goNewsDetail 改用 PAGES.news.detail() 并同步 menuRouteMap.js 的 3_1_10 / 3_1_16
- 涉及文件：src/pages/index/components/Home_Suzhufang.vue、src/utils/route-map.js、src/utils/menuRouteMap.js、src/pages.json
- 所属项目：苏住房C；来源会话ID：29317b48-dcb1-481b-a230-4459674df2a0；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "news_route_stale",
  "source_extraction_id": "f077e1fff63b403981d63766777c8762",
  "version": 1,
  "memory_type": "entities"
}
-->