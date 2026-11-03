# RecursiveMenu激活态侧栏图标跟文字同色
自定义侧栏 RecursiveMenu 中，接口下发的菜单图标在激活时应与文字一致使用主题色。

## 现象
- 激活菜单时仅文字变色，图标仍为灰色

## 解决方案
- 在 `RecursiveMenu.vue` 为 `.menu-title.active-menu .menu-title--icon` 与 `.menu-title.active-parent .menu-title--icon` 设置 `color: var(--primary-color)`，覆盖默认图标色

## 关联信息
- 验证证据：会话 db9b9d8a 最终结论修改两条选择器后激活态图标与文字一致
- 涉及文件：zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- 所属项目：2-0
- 来源会话：db9b9d8a-7b5f-4e97-ba73-4fdf181714a1
- 代码基线：产品2.0 侧栏 RecursiveMenu

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recursivemenu_icon_color",
  "source_extraction_id": "e48a8732da734876864af7434cc9e0e7",
  "version": 1,
  "memory_type": "entities"
}
-->