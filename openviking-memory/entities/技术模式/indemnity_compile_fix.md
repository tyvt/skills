# 理赔首页编译问题修复
产品2.0 理赔首页（indemnity/homePage）组件因缺失图片资源和未定义 Sass 变量导致构建失败，已修复至 `npm run build` 退出码 0。

## 缺失图片资源
- `cardData.vue` 引用了不存在的 `down.png` / `up.png`
- 已改为 Element UI 图标 `el-icon-top` / `el-icon-bottom`

## Sass 变量未定义
- `buildingTable/index.vue` 的 scoped 样式使用了 `$--color-primary` 但未引入 Element 变量文件
- 已改为项目统一写法 `background-color: var(--primary-color)`

## 验证与归属
- 构建：`zhi2-web-admin` 的 `npm run build` 退出码 0，产物在 `dist/`
- 涉及文件：`cardData.vue`、`buildingTable/index.vue`、`src/utils/resolveServerAssetUrl.js`
- 所属项目：产品2.0；来源会话：607e0008-39cd-4f41-ac93-f621b4844489

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "indemnity_compile_fix",
  "source_extraction_id": "fe9e7839c3e6497a831416b10b84332b",
  "version": 1,
  "memory_type": "entities"
}
-->