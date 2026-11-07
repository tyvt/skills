# topMenus访问children报错修复
苏州市房地产监测V3 中 `NavBar` 和首页 `Index` 的 `topMenus` 计算属性访问 `menu.children[0]` 导致 TypeError，已修复。

## 问题原因
- 当菜单项 `menu.path === '/'` 时，代码直接访问 `menu.children[0]`
- `permission.js` 路由处理中，没有子路由的菜单会删除 `children` 字段
- 根路径菜单无子项时 `menu.children` 为 `undefined`，访问 `[0]` 报错

## 修复方式
- 已在 `Navbar.vue` 和 `home/index.vue` 中增加空值判断

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`permission.js`、`Navbar.vue`、`home/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话：d9582fdc-02eb-4965-8959-b0e49fc15b39

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "topmenus_children_fix",
  "source_extraction_id": "eb7c3c1e01c14b17a2de9c1e4de0e0e9",
  "version": 1,
  "memory_type": "entities"
}
-->