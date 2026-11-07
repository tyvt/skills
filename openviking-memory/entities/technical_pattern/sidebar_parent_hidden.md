# 侧栏父级隐藏未追溯导致子菜单误显
当父级 Layout 设置 hidden: true 时，侧栏子项仍错误显示，因为可见性判断未追溯祖先隐藏状态。

## 根因
- `listRouters` 子路由设置 `hidden: false`，与菜单管理中的「隐藏」状态冲突（如「应用管理详情」父 Layout 为 hidden:true，子节点 application/:tableid 为 hidden:false，且 listRouters 未在子节点体现 hidden:true 或 visible:1）。
- `buildNavbarChildrenMenus` 将 children 扁平化，未追溯父 Layout 的 hidden: true。
- `isRouteHidden()` 仅判断当前节点，未判断祖先 hidden 标志。
- 门户将大量菜单拆分为多个 `path: "/"` 的 Layout，侧栏实际使用扁平化后的 children；原逻辑只看子项是否 hidden，父已隐藏、子仍为 hidden:false 时（如「应用管理详情」因排在第一个常出现在侧栏最上方）仍会被推进侧栏列表。

## 修复要点
- 在 `buildNavbarChildrenMenus` 与 `isRouteHidden()` 中增加父级 hidden 状态判断。
- 或在 `listRouters` 中同步子节点的 hidden 字段。

## 涉及文件
- `zhi2-web-admin/src/layout/components/Sidebar/index.vue`
- `zhi2-web-admin/src/utils/menuVisibility.js`
- `zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue`
- `zhi2-web-admin/src/store/modules/permission.js`
- `zhi2-web-admin/src/layout/components/Navbar.vue`
- `zhi2-web-admin/src/api/portal/menu.js`
- `zhi2-web-admin/src/layout/components/TagsView/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据来源：cursor 提取，portal/027.md
- 所属项目：门户
- 来源会话ID：92104882-f56a-49cf-931b-814063421ad6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "sidebar_parent_hidden",
  "source_extraction_id": "04a383200b2048969f86cf9638b3ae40",
  "version": 2,
  "memory_type": "entities"
}
-->