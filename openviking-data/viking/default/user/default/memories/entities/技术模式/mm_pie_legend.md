# 房产监测饼图左移与图例完整
zhi2-web-admin 房产监测页（market-monitor）「各板块成交套数比例」饼图需左移且右侧图例区县名完整无省略。

## 问题根因
- TradePanel 饼图 center 为 ['50%','50%'] 居中，未偏左
- DistrictPie 图例 w-[44%] + gap-9（36px）过宽间距，区县名 truncate 被省略（"姑."、"吴." 等）

## 解决方案
- TradePanel.vue：饼图 center 由 ['50%','50%'] → ['44%','50%'] 圆心左移
- DistrictPie.vue：图例宽度 w-[44%] → w-[52%]（饼图容器 flex-1 变窄=更靠左）；gap-9 → gap-2.5 缩列距；区县名去 truncate 改 whitespace-nowrap 完整展示

## 验证与归属
- 验证：会话 2026-11-04，10 个区县名（姑苏区/吴中区/相城区/工业园区/高新区/吴江区/昆山市/太仓市/常熟市/张家港市）全部完整，存量房饼图同修复
- 涉及文件：zhi2-web-admin/src/views/property/marketMonitor/components/TradePanel.vue、DistrictPie.vue
- 所属项目：zhi2-web-admin 房产监测；来源会话：2026-11-04

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mm_pie_legend",
  "source_extraction_id": "c0ad0a9d312d40b6a54ce9d51b9c054a",
  "version": 1,
  "memory_type": "entities"
}
-->