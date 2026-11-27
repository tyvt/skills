---
audit_status: valid
last_checked: 2026-11-27T14:48:05+08:00
verdict_note: permission.js 有 delete route["children"]，Navbar/index.vue 有 menu.children[0] 与 topMenus，空值判断修复场景属实。
---
# 根路径菜单无子项删children致读取报错
permission.js 路由处理对无子路由菜单执行 delete route['children']，导致 NavBar 与 Index 的 topMenus 访问 menu.children[0] 抛 TypeError。

## 问题根因
- permission.js 路由处理对无子路由菜单执行 delete route['children']
- 导致 NavBar 与 Index 的 topMenus 计算属性访问 menu.children[0] 抛出 TypeError

## 修复方案
- 在 NavBar 和 Index 的 topMenus 中增加 children 空值判断

## 验证与归属
- 验证证据：extracted source=cursor session=d9582fdc-02eb-4965-8959-b0e49fc15b39
- 涉及文件：Navbar.vue、index.vue、permission.js
- 来源会话ID：d9582fdc-02eb-4965-8959-b0e49fc15b39

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "root_menu_children",
  "source_extraction_id": "51f806c5ee534d2b8091b45602152e6a",
  "version": 1,
  "memory_type": "entities"
}
-->