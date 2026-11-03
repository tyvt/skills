# 视觉走查基线截图对比流程
对已部署线上环境批量截图存 prod 图、本地 dev 截 local 图，靠同名文件配对人工或自动 diff，建立 UI 改造验收客观判据。

## 适用场景
- 整块 UI 改造（迁移模块、改版）验收，或用户说「和线上不一致」时建立客观判据
- 只靠人眼看当前页面无法判断「这里本来就该这么宽/这么长」，必须有线上参照物

## 执行步骤
- 拆两条 npm script：连线上产出 *.prod.png 作基线，连本地 dev 产出 *.local.png，输出到同一目录（如 e2e/assets/visual/price-filing/）
- 生成 manifest 记录「文件名 → 菜单/filePath」映射，避免靠文件名猜业务
- 对比按同名配对（如 county-list.prod.png ↔ county-list.local.png），修复部署后重跑两条命令逐菜单复核
- 该目录与 test-results 同属可再生证据产物，考虑纳入 gitignore 勿提交仓库
- 更严格时直接上 Playwright toHaveScreenshot 或 pixelmatch 出像素差报告

## 验证与归属
- 来源会话 6e92d8f9（基线 5169909）：用户两轮反馈要求截图线上对比，交付 10 菜单各 2 张共 20 张图
- 涉及文件：playwright.config.js、package.json、e2e/assets/visual/price-filing/manifest.prod.json、e2e/.env.e2e、e2e/fixtures/env-loader.js
- 所属项目：产品2.0；代码基线：5169909

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "visual_baseline_workflow",
  "source_extraction_id": "8bfe7b9f72d7470eae3c3aa21cb9be36",
  "version": 1,
  "memory_type": "entities"
}
-->