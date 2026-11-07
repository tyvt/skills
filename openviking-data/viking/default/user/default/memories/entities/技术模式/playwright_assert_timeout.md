# Playwright断言timeout含义与设置
Playwright 断言 timeout 定义元素可见性检查的最长等待时间，非固定休眠，需按慢加载设合理值。

## 核心要点
- 断言 timeout 是元素可见性检查的最长等待时间，而非固定休眠
- 在慢加载场景下设合理 timeout 避免误报失败

## 解决方案
- 在 zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js 中对 app-layout 设 APP_LAYOUT_VISIBLE_TIMEOUT=4000ms

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；代码基线：none
- 验证证据：src=2-0/016.md
- 来源会话ID：94bb4e4d-8fe7-4af8-94d6-b46eb0e0d207

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_assert_timeout",
  "source_extraction_id": "1c14e868233949f988121dd48731d257",
  "version": 1,
  "memory_type": "entities"
}
-->