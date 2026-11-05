# Hamburger 图标不显示修复
产品2.0 页签栏汉堡菜单图标（`Hamburger.vue`）因 SVG sprite 注册路径问题不显示，已修复为直接引用静态文件。

## 问题
- `Hamburger.vue` 通过 `SvgIcon` 引用 `menu-fold`，但 `vite-plugin-svg-icons` 只注册 `public/assets/images/svg/` 下的图标
- `menu-fold.svg` 实际在 `public/assets/images/menu-fold.svg`，不在 sprite 目录，`<use xlink:href="#icon-menu-fold">` 找不到符号
- 历史上 commit `430056fd6` 曾改成 `<img>` 引用；页签 UI 改版（`24edf67dd`）又改回 `SvgIcon`，图标再次消失

## 修复要点
- 恢复直接引用静态 SVG：`<img :class="['hamburger', isActive ? 'active' : '']" src="/assets/images/menu-fold.svg" alt="">`
- 保留新的外层 `hamburger-svg` 容器与 hover 样式

## 涉及文件
- zhi2-web-admin/src/layout/components/TagsView/Hamburger.vue
- zhi2-web-admin/src/components/SvgIcon/index.vue
- zhi2-web-admin/src/layout/components/TagsView/index.vue
- zhi2-web-admin/vite.config.js

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：b5854166-69ad-4373-b2ce-06fc224fa0a4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "hamburger_fix",
  "source_extraction_id": "5c881ec3a20f414facbaf9f447492b5b",
  "version": 1,
  "memory_type": "entities"
}
-->