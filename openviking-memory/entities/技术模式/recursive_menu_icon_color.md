# RecursiveMenu 激活态图标颜色未随主题色
zhi2-web-admin 侧边栏 RecursiveMenu 激活态图标未应用主题色，需补样式覆盖。

## 问题根因
- 激活态图标未应用主题色 var(--primary-color)，导致图标颜色不随文字变主题色

## 解决方案
- 在 zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue 添加 `.menu-title.active-menu .menu-title--icon` 与 `.menu-title.active-parent .menu-title--icon` 样式覆盖

## 验证与归属
- 验证证据：src=2-0/008.md
- 涉及文件：zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue
- 所属项目：2-0（产品2.0）；来源会话：db9b9d8a-7b5f-4e97-ba73-4fdf181714a1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recursive_menu_icon_color",
  "source_extraction_id": "9b7970b9216d41dfac7377ac2dcc844d",
  "version": 1,
  "memory_type": "entities"
}
-->