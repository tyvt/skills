# 顶栏下拉地图页无法点击根因
园区物管2.0 地图页（benefit/statisticsMap）中 Navbar「更多功能」和用户下拉菜单能展开但点不到。

## 现象与根因
- 现象：Navbar 下拉在地图页面看似展开却无法点击交互
- 根因：层叠上下文（stacking context）问题。Navbar z-index:9，app-main 未建立独立层叠上下文；地图页搜索栏 z-index:1888 及腾讯地图内部高 z-index 子元素直接与 Navbar 同层比较（1888>9），透明层盖住 Navbar 下拉区域

## 解决方案
- AppMain.vue：增加 position:relative、z-index:0、isolation:isolate，把主内容区限制在 Navbar 之下
- statisticsMap/index.vue：搜索栏 z-index 由 1888 改为 10，content-wrap 增加 overflow:hidden 防地图溢出
- map.vue：地图容器改为 position:absolute; inset:0 严格铺满内容区

## 套路
- 主内容区需通过 isolation:isolate 建立独立层叠上下文，避免任意页面高 z-index 盖住顶栏

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/layout/components/AppMain.vue、src/views/benefit/statisticsMap/index.vue、src/views/benefit/statisticsMap/components/map.vue、src/layout/components/Navbar.vue
- 所属项目：园区物管2.0
- 来源会话ID：afe24635-17e4-4855-b880-847a1c56ae6f

<!-- MEMORY_FIELDS
{
  "category": "布局缺陷根因",
  "name": "navbar_dropdown_stack_block",
  "source_extraction_id": "ca96a95541ed44c7b78f9358b4b4b46d",
  "version": 1,
  "memory_type": "entities"
}
-->