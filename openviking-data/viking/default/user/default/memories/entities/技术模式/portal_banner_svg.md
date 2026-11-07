# 首页二级页面顶部Banner改用SVG
门户 publicPortal 二级页面顶部 banner 已从 portal_city_banner.jpg 替换为 portal_city_banner.svg（切图 173.svg，尺寸 1920×165，与原 banner 一致）。

## 改动要点
- 新增 `zhi2-web-admin/public/assets/images/homeNew/portal_city_banner.svg`
- 修改 `src/views/home/publicPortal/PortalDialogHost.vue`，banner 引用由 `.jpg` 改为 `.svg`
- 原 `portal_city_banner.jpg` 保留未删，需回退时改回引用即可

## 注意事项
- 该 SVG 内嵌 base64 位图，文件约 6.7MB，二级页面首屏加载会变慢
- 若在意性能，可导出同尺寸 jpg/png 替代

## 验证与归属
- 涉及文件：PortalDialogHost.vue、HomeHeroBanner.vue、index-new.vue、layout/index.vue
- 所属项目：门户；来源会话ID：ecaebeeb-54ff-4c5a-91a6-258101a82b57；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_banner_svg",
  "source_extraction_id": "ab3dc4058bf14f468f2d04ac319f429d",
  "version": 1,
  "memory_type": "entities"
}
-->