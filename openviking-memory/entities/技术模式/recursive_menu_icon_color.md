# RecursiveMenu 激活态图标颜色未随主题色
zhi2-web-admin 侧边栏 RecursiveMenu 激活态图标未应用主题色，需补样式覆盖使其与文字同色。

## 问题根因
- 激活态图标未应用主题色 `var(--primary-color)`，导致图标颜色不随文字变主题色
- 接口下发的菜单图标在激活时仅文字变色，图标仍为灰色

## 解决方案
- 在 `zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue` 为 `.menu-title.active-menu .menu-title--icon` 与 `.menu-title.active-parent .menu-title--icon` 设置 `color: var(--primary-color)`，覆盖默认图标色

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/008.md；会话 `db9b9d8a-7b5f-4e97-ba73-4fdf181714a1` 最终结论修改两条选择器后激活态图标与文字一致
- 涉及文件：zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- 所属项目：2-0（产品2.0）；来源会话：db9b9d8a-7b5f-4e97-ba73-4fdf181714a1；代码基线：产品2.0 侧栏 RecursiveMenu

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recursive_menu_icon_color",
  "source_extraction_id": "2f0285f8b19a47cf8f04cc41b8d6c128",
  "version": 2,
  "memory_type": "entities"
}
-->