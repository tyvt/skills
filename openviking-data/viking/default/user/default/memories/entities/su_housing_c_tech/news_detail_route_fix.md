
# 新闻详情页路由错误修复
苏住房C(zhi2-mobile-shimin)小程序首页点击新闻报错 page not found，因新闻详情已迁至 pages_main 分包但首页仍跳旧路径。

## 问题根因
- 新闻详情页已迁到 pages_main 分包（pages_main/news/detail），但首页点击新闻仍跳转旧路径 /pages/news/detail，该页面在 pages.json 中不存在导致报错

## 修复方案
- Home_Suzhufang.vue 的 goNewsDetail 改用 route-map.js 中的 PAGES.news.detail() 生成正确路径 /pages_main/news/detail?id=...
- menuRouteMap.js 同步更新菜单路由：3_1_10 指向 /pages_main/news/index；3_1_16 指向 /pages_main/news/detail?id=...

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译小程序后首页点击新闻资讯验证；其他菜单若报 page not found 需排查 menuRouteMap.js 中未迁移的旧 /pages/ 路径
- 所属项目：苏住房C；来源会话：29317b48-dcb1-481b-a230-4459674df2a0
- 涉及文件：Home_Suzhufang.vue、route-map.js、menuRouteMap.js、pages.json
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "news_detail_route_fix",
  "source_extraction_id": "85eda2beba664de9b5d23d9ab50c962c",
  "version": 1,
  "memory_type": "entities"
}
-->