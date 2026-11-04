# 苏找房首页导航外边距致Banner下灰色间隙
苏住房C 苏找房首页 `.home-nav-wrap` 的外边距在浅灰背景下产生灰色间隙，已在 cursor 会话 82834510 修复。

## 问题根因
- `.home-nav-wrap` 设 `margin-top: 36px` 在 `#f5f5f5` 背景下产生灰色间隙
- 搜索框高度未被预留，布局衔接异常

## 修复要点
- 于 `Project_Suzhufang.vue` 将 `.home-nav-wrap` 的 `margin-top` 改为 `0`
- 为 `header-wrap` 增加 `padding-bottom: 24px` 以预留搜索框高度

## 涉及文件
- src/pages_tab/components/Project_Suzhufang.vue
- src/pages/index/project.vue
- src/pages_tab/components/menu/ProjectTabBar.vue

## 验证与归属
- 验证证据：extracted source=cursor session=82834510-c303-48f8-b95b-7d3747c2cc8e
- 所属项目：苏住房C（zhi2-mobile-shimin）；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_nav_gap_fix",
  "source_extraction_id": "d87d02d750784fd08f483b63d35a6981",
  "version": 1,
  "memory_type": "entities"
}
-->