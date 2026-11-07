# 门户侧栏菜单可见性组合缺陷
门户侧栏 hidden 菜单仍显示、切页签或开启 topNav 出现幽灵父级、首页刷新只剩箭头、顶栏一级菜单空白，是 menuVisibility 归一化、侧栏写入时机与 constantRoutes 污染叠加根因。

## 现象
- 后台菜单 meta 隐藏，RecursiveMenu 仍渲染
- 切回页签出现不存在的上级目录
- 硬刷新首页侧栏只剩一列 `>` 空标题目录节点
- 顶栏一级菜单整行空白
- 开启 topNav 时侧栏再次出现「不存在的父级」或空标题仅箭头父级
- resolveTopNavbarPath 被 /redirect 干扰致侧栏留空目录

## 根因
- menuVisibility.js 需统一首页归属 `/`、strip `/redirect`、不 mutate Vuex 路由树、剔除子项全 hidden 目录节点
- TagsView 首页须 SET_SIDEBAR_ROUTERS 为空，routesLoaded 后再次 syncSidebarWithRoute
- permission.js 初始化侧栏不拼 constantRoutes，避免幽灵父级
- Navbar.visibleMenus 误返 [] 致顶栏空白；topMenus 应取首个可见子菜单
- GenerateRoutes 写入完整/整棵 sidebarRoutes 后 TagsView.syncSidebarWithRoute 无法匹配当前模块时不更新 store，侧栏残留其他模块树
- 首页「热门应用」activeMenu 直接 commit(item.children) 未走 getSidebarRoutesForTopNav 且未滤 hidden
- 无 meta.title 的 Layout 占位节点仍渲染父级

## 修复要点
- 集中改 menuVisibility.js、TagsView、Navbar.vue、permission.js、home/index.vue
- hidden 过滤与空目录剔除放在构建侧栏 children 统一入口，不在 RecursiveMenu 打补丁
- menuVisibility.js 增加 flattenPhantomMenuParents / normalizeSidebarRoutes（滤 hidden、去掉无标题父级），并固定首页路由归属 path: '/' 剥离 /redirect
- permission.js 在 topNav 下按当前路由初始化侧栏且 SET_SIDEBAR_ROUTERS 统一规范化
- TagsView 强制 SET_SIDEBAR_ROUTERS 为空并在 routesLoaded 后 syncSidebarWithRoute；TagsView / Navbar / home/index.vue 与顶栏逻辑对齐
- Navbar 的 visibleMenus 取首个可见子菜单

## 涉及文件
- zhi2-web-admin/src/utils/menuVisibility.js
- zhi2-web-admin/src/layout/components/TagsView/index.vue
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/layout/components/Sidebar/index.vue
- zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- zhi2-web-admin/src/store/modules/permission.js
- zhi2-web-admin/src/views/home/index.vue
- zhi2-web-admin/src/store/getters.js
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/layout/mixin/ResizeHandler.js

## 关联信息
- 所属项目：门户；来源会话 ID：f1e6a91e-9b3c-44e9-9570-576bc6246461、3e984634-49ba-447f-809c-53e40d9305bb；代码基线：b84b4e7、50578e9

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_menu_visibility",
  "source_extraction_id": "edf38fe4ee324ea4ba2b9502ab8058e8",
  "version": 3,
  "memory_type": "entities"
}
-->
