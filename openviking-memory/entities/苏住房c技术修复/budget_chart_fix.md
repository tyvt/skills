# 年度预算收入/支出图表不显示修复
苏住房C小程序 pages_benefit/budget/index.vue 中年度预算收入/支出图表因 canvas 在 scroll-view 内不渲染而空白，已修复。

## 问题根因
- 图表组件 EchartsUniapp（底层 canvas）被放在 scroll-view 里面。
- 微信小程序中 canvas 为原生组件，官方限制不能在 scroll-view 内正常渲染，导致图表区域一直空白。

## 修复内容
- 将图表移出 scroll-view，固定在顶部，仅下方预算卡片列表可滚动。
- 优化图表数据更新：改为整对象替换 chartOption，确保组件正确响应数据变化。
- 切换年/Tab 时重建图表：使用动态 canvasId 和 key，避免状态异常。
- budgetAmount 统一用 Number() 转换，避免 ECharts 无法识别字符串。

## 验证与归属
- 验证路径：慧物业 → 阳光物业 → 年度预算，检查 Tab 切换与年份切换后饼图显示。
- 涉及文件：pages_benefit/budget/index.vue、components/echarts-uniapp/echarts-uniapp.vue、api/benefit.js。
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：9446951a-feff-46d8-9660-d4cca2cd85fd。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "budget_chart_fix",
  "source_extraction_id": "40d24fb84e4e48ed912d6d0221c023e2",
  "version": 1,
  "memory_type": "entities"
}
-->