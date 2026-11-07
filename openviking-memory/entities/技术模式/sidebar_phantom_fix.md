# 门户侧边栏幽灵父级菜单修复
门户项目修复侧边栏在顶栏模式下残留「不存在的父级」节点、首页热门应用误提交整棵菜单、无标题父级显示空箭头、顶栏菜单被误关等问题。

## 问题根因
- 顶栏模式下侧栏被整棵菜单树覆盖：GenerateRoutes 先写入完整 sidebarRoutes；TagsView.syncSidebarWithRoute 无法匹配当前模块时不更新 store，侧栏残留其他模块父级节点
- 首页「热门应用」activeMenu 直接 commit(item.children)，未走 getSidebarRoutesForTopNav，也未过滤 hidden / 无标题占位目录
- 无标题父级：隐藏 Layout 等节点没有 meta.title 时仍显示只有箭头的空父级
- 顶栏菜单被误关：Navbar.visibleMenus 里存在 return []，顶栏主菜单不显示并影响模块切换

## 修改方式
- menuVisibility.js：增加 flattenPhantomMenuParents / normalizeSidebarRoutes（过滤 hidden + 去掉无标题父级）
- permission.js：开启 topNav 时初始侧栏按当前路由计算；SET_SIDEBAR_ROUTERS 统一规范化
- 热门应用走 getSidebarRoutesForTopNav 并过滤 hidden / 无标题目录，修复顶栏菜单显示

## 涉及文件与归属
- d:\repository\门户\zhi2-web-admin\src\utils\menuVisibility.js
- d:\repository\门户\zhi2-web-admin\src\permission.js
- d:\repository\门户\zhi2-web-admin\src\views\home\index-new.vue
- d:\repository\门户\zhi2-web-admin\src\layout\components\Navbar.vue
- 所属项目：门户；来源会话ID：3e984634-49ba-447f-809c-53e40d9305bb；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_phantom_fix",
  "source_extraction_id": "094ea85f71754ba48e097e9c549bb100",
  "version": 1,
  "memory_type": "entities"
}
-->
