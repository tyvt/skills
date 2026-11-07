# 门户侧栏刷新空菜单与顶栏更多功能
门户刷新后侧栏只剩箭头、顶栏一级菜单为空的问题，已按 vue-reviewer 三项结论修复。

## 根因
- 首页刷新：GenerateRoutes 先写整棵菜单，TagsView 未在首页再次清空，或 resolveTopNavbarPath 被 /redirect/.. 干扰，侧栏留下大量只显示 > 的空目录节点。
- 顶栏：visibleMenus 误写 return []，桌面顶栏一级菜单为空。

## 修复要点
- menuVisibility.js：首页路由固定归属 path:'/'；normalizeMenuPath 剥离 /redirect；buildNavbarChildrenMenus 不再原地改 Vuex；过滤子项全隐藏的空目录。
- TagsView：首页强制 SET_SIDEBAR_ROUTERS 为空数组；routesLoaded 后再次 syncSidebarWithRoute。
- Navbar：修复 visibleMenus；topMenus 取第一个可见子菜单。

## 验证
- 涉及文件：menuVisibility.js、permission.js、Sidebar/index.vue、Navbar.vue、RecursiveMenu.vue；来源会话 f1e6a91e-9b3c-44e9-9570-576bc6246461；项目门户。

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_refresh_empty",
  "source_extraction_id": "1121f675ae5041a1b8d5b2fb551f6b4f",
  "version": 1,
  "memory_type": "entities"
}
-->
