# 门户直刷二级路由跳过首页骨架
用户直接刷新带门户查询参数的 URL（如 `?portal=projects`）时，不应先闪对外首页骨架再进入二级页。

## 做法
- 抽出 `portalRoutes.js` 集中二级页标题/路由表
- `UnifiedLogin.vue` 在初始路由已指向二级页时跳过首页级骨架
- `PortalDialogHost` 只展示与该 `portal` 值匹配的二级页骨架版式
- 改二级页清单或直链入口时须同时核对路由解析与 skeleton 版式映射

## 验证与归属
- 验证：portalRoutes.js（新文件）+ UnifiedLogin.vue 首页在路由本身就是二级页时跳过首页骨架屏，直接刷新 `?portal=projects` 只看到该页对应的二级页骨架屏
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/portalRoutes.js、zhi2-web-admin/src/views/home/UnifiedLogin.vue、zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- 所属项目：门户；来源会话 ID：session_8fedec701ebfbbfa2d3c0a93a4c98a27；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_route_skeleton",
  "source_extraction_id": "1f7e4e8d2e59479e8551fc7265f7eaad",
  "version": 1,
  "memory_type": "entities"
}
-->