# 修复固定菜单占用屏幕的 min-width 问题
在带有 `position: fixed` 的用户菜单中，`min-width: max(100%, 132px)` 根据 viewport 宽度计算 `100%`，拉伸了下拉菜单并覆盖了侧边栏。

## 问题
- 用户菜单使用 `position: fixed`
- `min-width: max(100%, 132px)` 使 `100%` 等于 viewport 的宽度
- 下拉菜单拉伸并覆盖侧边栏

## 解决方案
- 从 `min-width` 中移除 `max(100%, …)`
- 在 `updateDesktopDropdownPosition` 中，根据头像区域的真实宽度计算 `minWidth`（最小 132px）

## 文件和来源
- 涉及文件: Navbar.vue, variables.css, index.vue, AppMain.vue, TagsView/index.vue, index.scss, ruoyi.scss, facility/index.vue
- 会话: eaeb4d6a-1209-47e7-a761-4c6b265f74bc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_minwidth_fix",
  "source_extraction_id": "76f2d71ba1c4492cb8ab951b1612621d",
  "version": 1,
  "memory_type": "entities"
}
-->