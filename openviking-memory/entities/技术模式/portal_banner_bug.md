# 门户 banner 骨架高度差弹跳修复
二级页顶部城市 banner 骨架若同时挂 `portal-skeleton-bar` 与 `portal-banner-skeleton`，后者先设 `position: absolute`，但全局 `.portal-skeleton-bar { position: relative; height: 22px }` 会覆盖绝对定位，骨架落入文档流（约 22px 块叠在 165px 图下 → 总高 187px），骨架消失后回到 165px，标题栏上移出现缝隙。

## 修复
- 在 `portal.scss` 中于 `.portal-skeleton-bar` 规则之后增加更高优先级选择器：`.portal-city-banner-box .portal-banner-skeleton { position: absolute; inset: 0; height: auto; border-radius: 0; }`
- 使加载前后 banner 区高度一致，避免揭开时跳版

## 验证与归属
- 验证：修复前 bannerH 187 → 165；修复后加载中与加载完成一致
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/portal.scss、zhi2-web-admin/src/views/home/publicPortal/components/PortalSkeleton.vue
- 所属项目：门户；来源会话 ID：01a1626e-5d09-70c5-a400-7518fbdd30f5；代码基线：fd9ef3e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_banner_bug",
  "source_extraction_id": "1f7e4e8d2e59479e8551fc7265f7eaad",
  "version": 1,
  "memory_type": "entities"
}
-->