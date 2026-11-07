# public-portal 像素回归验收
房产综合服务平台对外门户（src/views/home/publicPortal/）视觉验收以 npm run test:e2e:public-portal 为准（Playwright + Pillow + pixelmatch）。

## 验收门槛
- 非弹窗页面态整体相似度门槛 95%
- 公司/许可等详情弹窗态单独按 modal ≥85% 判定
- 夹具 tests/e2e/fixtures/public-portal-designs.ts 的 PORTAL_DESIGNS 与设计目录 PNG 按索引一一对应
- 改 UI 后需同步修正夹具中的几何、grid 类型与显式下限，而非只改页面

## 验证与归属
- 验证证据：任务说明「UI 区域门槛 95%，公司/许可详情弹窗门槛 85%」；run8 结论「13 个非弹窗态 ≥95%、3 个详情弹窗 ≥85%」
- 涉及文件：zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts、zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts、zhi2-web-admin/playwright.public-portal.config.ts、zhi2-web-admin/scripts/portal-visual-reference.py
- 所属项目：门户；来源会话 ID：2bcfc14a-d4b3-4c95-bd2c-a5ae8c791258；代码基线：be0bc4eaa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_pixel_regression",
  "source_extraction_id": "e88d7ad093b243e2bf01f883f5d8b250",
  "version": 1,
  "memory_type": "entities"
}
-->