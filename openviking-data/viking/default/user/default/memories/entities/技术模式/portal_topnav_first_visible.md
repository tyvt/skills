# 门户顶栏 topMenus 展平取首个可见子项
门户顶栏 topMenus 在 menu.path==='/' 展平根路径菜单时，须取第一个可见子项而非直接取 children[0]，未对齐会展示错误项。

## 现象
- topMenus 在 menu.path==='/' 时直接 push(menu.children[0])，未与 menuVisibility.js 的 isRouteHidden 过滤对齐
- 第一个子菜单被 hidden/visible/meta.hidden 隐藏时，顶栏展示错误项或 item.meta 异常
- 验证证据：menuVisibility 审查 HIGH，Navbar 262-264 与 resolveTopNavbarPath 未对齐首个可见子路由

## 修复要点
- 与侧栏一致：menu.children?.find((c) => !isRouteHidden(c)) 后再 push
- 无可见子项的目录应跳过

## 涉及文件
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/utils/menuVisibility.js

## 关联信息
- 所属项目：门户；来源会话 ID：f244d50e-db76-4027-b64b-fdc47bdf7a0c；代码基线：b84b4e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_topnav_first_visible",
  "source_extraction_id": "edf38fe4ee324ea4ba2b9502ab8058e8",
  "version": 1,
  "memory_type": "entities"
}
-->