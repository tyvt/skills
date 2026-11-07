# 门户 Vite 静态图引用约定
门户首页与 publicPortal 背景、头图等静态资源应使用站点根路径 `/assets/images/homeNew/...` 引用。

## 约定要点
- 应使用 `url('/assets/images/homeNew/…')` 形式
- 与 `UnifiedLogin.vue`、`HomeHeroBanner.vue` 及 `homeLayout.js` 中 `IMG_BASE = '/assets/images/homeNew'` 一致
- `public/` 目录在 Vite 构建后映射为站点根路径 `/assets/...`

## 禁止写法
- 不要写成相对 import
- 不要写成错误前缀

## 验证与归属
- 验证证据：portal.scss 审查已核对 `url('/assets/images/homeNew/portal_page_bg.jpg')` 与 IMG_BASE 约定一致，Vite public 映射正确
- 涉及文件：src/views/home/publicPortal/portal.scss、src/views/home/UnifiedLogin.vue、src/views/home/components/HomeHeroBanner.vue
- 所属项目：门户；来源会话：b65aa587-d24e-4841-9f24-0ea21ddc7bde；代码基线：2785dd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_vite_image",
  "source_extraction_id": "3f03ea727476499892bbe2ec8f798037",
  "version": 1,
  "memory_type": "entities"
}
-->