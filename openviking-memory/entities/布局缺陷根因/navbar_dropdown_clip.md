# 顶栏下拉被裁切根因
园区物管2.0 顶导航栏「更多功能」下拉菜单（position:absolute; top:100%）曾整块被裁掉不显示。

## 根因
- 外层 .top-nav-container 设了 overflow:hidden（为做菜单横向滚动），下拉超出导航栏高度部分被父级裁切
- 次要问题：TagsView 的 z-index:8 会盖住延伸下来的下拉

## 修复做法
- 滚动职责下沉：用单独 .nav-items-scroll 包住左侧菜单做 overflow-x:auto（配 width:max-content），外层保持 overflow:visible
- .navbar 整体加 position:relative; z-index:9 高于 TagsView(8)，下拉展开时自身 z-index 提到 20
- 「更多」按钮 flex-shrink:0 防被挤没

## 套路
- 横向滚动容器与悬浮下拉必须是兄弟层级，不能让下拉挂在 overflow 裁切容器内

## 关联
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/src/layout/index.vue、zhi2-web-admin/src/layout/components/TagsView/index.vue
- 所属项目：园区物管2.0
- 来源会话：5eee9074-4df3-4e60-a122-c6a55131f0d7
- 代码基线：a63180c9a 时代之前即存在该布局结构

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "布局缺陷根因",
  "name": "navbar_dropdown_clip",
  "source_extraction_id": "c2bae86dadf94c5dbe29e2855b2b27c1",
  "version": 1,
  "memory_type": "entities"
}
-->
