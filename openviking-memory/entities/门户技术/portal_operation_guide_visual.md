# 门户操作指引页视觉回归独立 Playwright 配置
操作指引多页按设计稿验收，使用独立 Playwright 配置、设计图 fixtures 与区域掩膜。
## 做法要点
- 设计 PNG 入库 tests/e2e/fixtures/operation-guide-designs/，跑 npm run test:e2e:operation-guide（视口 1920×1080、DPR 2）。
- 设计图 Lanczos 缩到 CSS 尺寸，截图 ÷2 后 pixelmatch（threshold=0.1、includeAA=false），相似度门槛 95%。
- Banner 插画未定稿时顶栏与 Banner 区两侧置白；备案查询页淡蓝插画归一化为白；heightDelta 负常是设计画布底部留白。
- 轮播图替换 public/assets/images/operationGuide/banner_*.jpg 或 config/operationGuideBanners.js 追加 { src }。
## 验证与归属
- 会话 session_e82fa10a：9 张设计图视觉比对均 ≥95%，16 用例全过。
- 涉及文件：playwright.operation-guide.config.ts、fixtures/operation-guide-designs、config/operationGuideBanners.js、config/operationGuideContent.js、public/assets/images/operationGuide。
- 所属项目：门户；代码基线：dfee5a6；来源会话ID：session_e82fa10a2d53a413d9975e6ae6524bd0。

<!-- MEMORY_FIELDS
{
  "category": "门户技术",
  "name": "portal_operation_guide_visual",
  "source_extraction_id": "08a22315a92147d78d710883711e5733",
  "version": 1,
  "memory_type": "entities"
}
-->