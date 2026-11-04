# 门户 E2E 整页截图视口外内容缺失
门户 E2E 视觉用例整页截图视口以下空白非内容丢失，系 Playwright 无法抓取 body 滚动视口外内容所致。

## 根因
- 全局样式 html, body { overflow: auto } 配合 body { height: 100% } 使滚动发生在 body 上
- Playwright 的整页截图抓不到视口外内容，表现为视口以下空白

## 说明与处理
- 单独对第二块面板截图确认其两张卡已正确分开，内容未丢失
- 该问题属测试基础设施原有，之前多版设计稿 heightDelta 为负也受其影响
- 本轮未改动该测试基础设施

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/home/operationGuide/components/OperationGuideBody.vue
- 所属项目：门户；来源会话ID：session_c415e28d93e133b66067f38564803a54；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "playwright_screenshot_limit",
  "source_extraction_id": "38c4fed0fdf5450498d3c66aeea4789a",
  "version": 1,
  "memory_type": "entities"
}
-->