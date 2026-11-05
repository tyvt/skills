# Playwright 测试产物忽略规则新增
产品2.0 的 zhi2-web-admin/.gitignore 已加入 Playwright 测试产物忽略规则，并清理误纳入版本控制的文件。
## 新增忽略项
- /test-results/、/playwright-report/、/blob-report/、/playwright.cache/ 等目录忽略
- 保留跟踪 e2e/**/*.spec.js、fixtures、helpers、e2e/**/*-snapshots/、e2e/assets/test-files/
## 额外处理与验证
- 已将此前误跟踪的 playwright-report/index.html 等清理
- 所属项目：产品2.0；来源会话：41415a1f-2941-4133-85d2-60741ce0ac5c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gitignore_playwright_ignore",
  "source_extraction_id": "e626ff8127fa48a1baaecc584e194dd4",
  "version": 1,
  "memory_type": "entities"
}
-->