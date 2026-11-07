# 门户 Playwright 整页截图视口外空白误区
全局 body 滚动时 Playwright 整页截图视口外空白不等于页面缺内容，应改用元素级截图。
## 问题根因
- html,body{overflow:auto} 且 body{height:100%} 时滚动发生在 body 上
- page.screenshot(fullPage:true) 可能只可靠捕获视口内区域，视口以下呈空白，导致 heightDelta 偏负或误判内容丢失
## 解决方案
- 验收长面板/折叠区块应改用元素级截图（locator.screenshot）或滚动容器截图
- 与页面 CSS 修复无关时不要为通过整页截图去改业务布局
## 涉及文件与归属
- zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue
- zhi2-web-admin/tests/e2e
- 所属项目：门户；来源会话：session_c415e28d93e133b66067f38564803a54；代码基线：dfee5a6
- 验证证据：操作指引视觉用例整页截图视口下空白；对第二块面板单独截图确认卡片已分开，归因测试基建与 body 滚动

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_playwright_screenshot",
  "source_extraction_id": "d1c4f5df3e10427d9609e97a7b9ada3f",
  "version": 1,
  "memory_type": "entities"
}
-->