# Playwright 单用例仅跑 Chromium 命令
在 zhi2-web-admin 目录对单个 spec 只使用 Chromium 项目：npx playwright test tests/e2e/<文件名>.spec.js --project=chromium。

## 使用场景
- 多浏览器项目在 playwright.config.js 中定义时，不加 --project 会跑全部浏览器。
- 仅验证 Chrome 时需显式指定 --project=chromium。

## 命令示例
- 进入 zhi2-web-admin 目录执行：npx playwright test tests/e2e/navbar-sidebar-accessibility.spec.js --project=chromium。

## 验证与归属
- 验证证据：会话 ae02b45e：用户要 navbar-sidebar-accessibility.spec.js 仅 Chrome 测试。
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js；zhi2-web-admin/playwright.config.js
- 所属项目：2-0；来源会话ID：ae02b45e-8b1c-42ef-ab79-e188825e8cee；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "playwright_chromium_spec",
  "source_extraction_id": "12c8bea9efd949bd9c1e84c070f2e9ac",
  "version": 1,
  "memory_type": "entities"
}
-->