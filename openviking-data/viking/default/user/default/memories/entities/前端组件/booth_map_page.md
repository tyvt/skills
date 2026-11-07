# 展位图静态展示页
房产前端 zhi2-web-admin 中用于展示「展位图」SVG 的静态菜单页，由 2026-11-04 需求落地。

## 功能
- 以白卡片 + 圆角阴影容器，内部用 <img> 响应式展示 booth-map.svg 插画
- 实际展示的是「暂无数据」空状态插画（240×200，文档/剪贴板 + 淡蓝楼块 + 漂浮圆点），并非真实平面图

## 文件位置
- 页面：zhi2-web-admin/src/views/boothMap/index.vue
- 资源：zhi2-web-admin/src/assets/images/booth-map.svg

## 挂载方式
- 菜单由后端动态下发，后端菜单管理将 component 配为 boothMap/index 即可出现在菜单
- 前端无需改 router/index.js（loadView 按 views/<path>.vue 映射）

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "booth_map_page",
  "source_extraction_id": "0222a72cc6c24a19a5d151e2307cfe50",
  "version": 1,
  "memory_type": "entities"
}
-->