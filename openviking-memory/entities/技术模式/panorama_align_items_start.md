# 数据看板多列Grid子板块高度未撑满
园区物管2.0 资金全景看板多列 CSS Grid 因父级 align-items:start 阻断默认 stretch，导致中/右列 section 只按内容高度顶对齐留白。

## 现象与根因
- 同一行左侧列最高，中/右列「资金收入」「资金支出」等 section 只按内容高度顶对齐，下方留白，饼图区未随容器变高
- 根因：父级 .panorama-top（或同类多列网格）显式写 align-items: start；网格行高仍由最高列决定，但非 stretch 对齐的列子项不会拉满该行高度

## 解决方案
- 改回 align-items: stretch（或删掉 start 让网格默认 stretch），并确认列内链条把剩余高度交给图表区
- 配合 .composition-stack { flex: 1 }、.chart-wrap--stack-pie { flex: 1 1 auto } 与 ECharts resize
- 与已知「详情页双来源间距」不同，本条针对看板横向多列等高布局

## 验证与归属
- 验证证据：src=园区物管2.0/067.md；会话 47b47b3c 用户报资金收入/支出板块高度未占满容器；改 align-items:start 为 stretch 后中右列 panorama-block 拉满行高，饼图区 flex:1 吃掉垂直空间
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue
- 所属项目：园区物管2.0
- 来源会话：47b47b3c-2c00-4ffa-a15f-e111501a134b
- 代码基线：f00310232

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "panorama_align_items_start",
  "source_extraction_id": "df5493c7835e4a3caf5149b96826070c",
  "version": 2,
  "memory_type": "entities"
}
-->