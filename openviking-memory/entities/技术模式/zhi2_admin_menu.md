# zhi2-web-admin 菜单路由与资源导入约定
房产前端项目采用后端驱动菜单，页面按约定路径落位即可被菜单引用。

## 菜单路由模型
- 业务菜单由后端动态下发：store.dispatch('GenerateRoutes') 依据后端菜单数据生成路由
- menuFilePath / component 映射到 views/<path>.vue（排除 components/ 目录）
- 新增菜单页只需在 views/ 下建 .vue 文件，后端菜单 component 指向该路径（如 boothMap/index），无需改前端路由表

## SVG 资源导入
- @/assets/images/*.svg 经 Vite 默认当作 URL 资源导入（参考既有 register-page-banner.svg）
- vite-plugin-svg-icons 仅作用于 public/assets/images/svg 图标目录，不影响普通 svg 导入

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_admin_menu",
  "source_extraction_id": "0222a72cc6c24a19a5d151e2307cfe50",
  "version": 1,
  "memory_type": "entities"
}
-->