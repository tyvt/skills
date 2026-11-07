# Playwright 断言 timeout 机制
Playwright 断言中的 timeout 表示最多等待多久断言才算失败，而非固定等待后再断言。

## 作用说明
- `expect(page.getByTestId('app-layout')).toBeVisible({ timeout: APP_LAYOUT_VISIBLE_TIMEOUT })` 中 timeout 为 4000ms。
- 在 4 秒内 Playwright 反复检查元素是否可见；可见则通过，超时不可见则失败。
- 用于容纳路由/数据加载后渲染布局的耗时，避免慢环境误报。

## 相关文件
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；来源会话ID：94bb4e4d-8fe7-4af8-94d6-b46eb0e0d207；代码基线：none。

## 验证与归属
- 验证证据：extracted source=cursor project=2-0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_timeout_assert",
  "source_extraction_id": "61a33b5fab654f63a4728d9b086afb8c",
  "version": 1,
  "memory_type": "entities"
}
-->
