# 顶栏叶子菜单侧栏错误拼接修复
苏州市房地产监测V3 修复点击顶栏叶子菜单后侧栏被错误拼出无关项的问题。

## 问题根因
- 点击顶栏叶子菜单后 `TagsView` 在路由变化时仍调用 `resolveSidebarRoutes` 写回 `SET_SIDEBAR_ROUTERS`，手动展开侧栏看到错误项
- 原先 `childrenMenus` 混入 `constantRoutes`，匹配范围过大易配错兄弟菜单

## 修复内容
- `ruoyi.js` 增加 `shouldSyncSidebarForTopNav`：顶栏模式下仅当前页归属顶栏目录项（有 `children`）时才自动同步侧栏，叶子顶栏项侧栏为空
- `TagsView` 按规则同步或清空侧栏，统一用 `collectNavbarChildrenMenus` 构建子菜单（不再拼接 `constantRoutes`）
- `Navbar` 的 `getChildrenMenus` 与 `TagsView` 使用同一套扁平化逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`ruoyi.js`、`Navbar.vue`、`TagsView/index.vue`、`app.js`
- 所属项目：苏州市房地产监测V3；来源会话：44bfddd2-789d-4e25-bd4a-fae9e73e0efa

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "navbar_leaf_menu_sidebar_bug",
  "source_extraction_id": "f8bdd9b3412f4342a39559b352c1b670",
  "version": 1,
  "memory_type": "entities"
}
-->