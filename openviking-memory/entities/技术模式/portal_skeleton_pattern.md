# 公共门户二级页骨架屏
门户对外首页（UnifiedLogin + publicPortal）为约 24 个二级页提供加载骨架，核心是单组件 `PortalSkeleton.vue` 按真实版式输出占位，落地 15 种版式（列表类、公告正文、汇总、合同查询、楼幢/楼盘表网格、机构/经纪人基本信息等）。

## 架构要点
- `PortalSkeleton.vue` 按真实版式输出占位，已落地 15 种版式
- `PortalDialogHost.vue` 复用 `@/utils/loading.js` 最短展示 600ms，递增 token 丢弃被后一次切换覆盖的异步等待
- 叠加打开的详情弹窗不应再次触发二级页骨架屏

## 验收标准
- 同视口（如 1920×1080）逐页比对骨架与真实页总高度，目标误差约 ≤3px
- `tests/e2e/public-portal-skeleton.spec.ts` 4 项用例全部通过（版式归属、直刷二级路由不出现首页骨架、高度一致、下钻切换版式、详情弹窗不重复加载）

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/components/PortalSkeleton.vue、zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue、zhi2-web-admin/src/utils/loading.js、zhi2-web-admin/tests/e2e/public-portal-skeleton.spec.ts
- 所属项目：门户；来源会话 ID：session_8fedec701ebfbbfa2d3c0a93a4c98a27；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_skeleton_pattern",
  "source_extraction_id": "1f7e4e8d2e59479e8551fc7265f7eaad",
  "version": 1,
  "memory_type": "entities"
}
-->