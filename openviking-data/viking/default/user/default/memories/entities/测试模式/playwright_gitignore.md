# Playwright 测试产物忽略规则
Playwright 测试产物不应纳入版本控制，误提交会污染仓库。
## 忽略范围
- 需忽略目录：/test-results/、/playwright-report/、/blob-report/、/playwright/.cache/
- 测试源码与快照目录保持跟踪，不忽略
## 实施要点
- 于 zhi2-web-admin/.gitignore 追加上述忽略规则
- 清理已误跟踪文件，保留磁盘文件
## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/066.md
- 涉及文件：zhi2-web-admin/package.json、zhi2-web-admin/playwright.config.js
- 来源会话：41415a1f-2941-4133-85d2-60741ce0ac5c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "playwright_gitignore",
  "source_extraction_id": "4c9a5b08c29142c6941e338d2fd48101",
  "version": 1,
  "memory_type": "entities"
}
-->