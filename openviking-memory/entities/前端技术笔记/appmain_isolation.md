# 内容区层叠上下文隔离防止盖住 Navbar
园区物管2.0 后台地图类页面因主内容区未建立独立层叠上下文，内部高 z-index 元素盖住 Navbar 顶栏，需给 AppMain 加 isolation。
## 现象
- 地图类页面（腾讯地图/带高 z-index 搜索栏）里，Navbar 下拉菜单「能展开但点不到」或完全被盖住。
- 不是 Navbar 自身坏了，而是被透明层盖住。
## 根因
- app-main 主内容区没有建立独立层叠上下文，页面内大 z-index（如 1888）与地图内部高 z-index 子元素直接和 Navbar（z-index:9）同根比较，1888 > 9 导致覆盖。
## 解决方案
- 布局层根治：AppMain.vue 加 position:relative; z-index:0; isolation:isolate，把主内容区整体压在 Navbar 之下，全局生效。
- 页面层自查：搜索栏等浮层 z-index 只需盖过同页地图（如 10），不要写 1888；地图容器用 position:absolute; inset:0 铺满，外层 overflow:hidden 防溢出。
## 关联信息
- 涉及文件：zhi2-web-admin/src/layout/components/AppMain.vue、Navbar.vue、views/benefit/statisticsMap/index.vue、components/ZsTencentMap。
- 所属项目：园区物管2.0；来源会话：afe24635-17e4-4855-b880-847a1c56ae6f；代码基线：c97957703。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "appmain_isolation",
  "source_extraction_id": "d666360db8d5471ab075b4f725e5c78b",
  "version": 1,
  "memory_type": "entities"
}
-->
