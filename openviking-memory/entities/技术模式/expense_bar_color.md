# 支出柱图统一柱色参数修复
园区物管2.0 fundPanorama 页 renderCategoryBar 未接收 uniformBarColor 参数致支出柱图按 mock 多色渲染。

## 问题根因
- renderCategoryBar 未接收 uniformBarColor 参数
- 支出柱图按 mock.js 中 expenseByCategory.colors 渲染多色，与设计预期（统一柱色）不符

## 解决方案
- 在 fundPanorama/index.vue 的 initCharts 调用 renderCategoryBar 时传入统一柱色 '#FFA94D'
- 调用形式：this.renderCategoryBar(this.$refs.expenseBarRef, expenseByCategory, '#FFA94D')

## 验证与归属
- 验证证据：园区物管2.0/061.md
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、mock.js
- 所属项目：园区物管2.0；来源会话：418857f1-8122-4137-97aa-db7576f9cb72；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "expense_bar_color",
  "source_extraction_id": "9ba7963f3db241c4825b708673e79008",
  "version": 1,
  "memory_type": "entities"
}
-->