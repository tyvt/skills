# 看板图表四条硬约定
数智分析看板新增/调整图表须遵守注册名、双 Y 轴、环形数据结构、去标签等约定，否则静默失败。

## 组件注册与基础
- ECharts 封装注册名必须为 `DaEchart`（`components:{ DaEchart }`，模板 `<da-echart :option="..." height="300px|520px"/>`）
- 绝对不能注册成 `DaEChart`（Vue2 局部注册区分大小写，kebab 变 `da-e-chart` 匹配不上，图表空白不报错）
- 导入路径：`./components/EChart.vue` 或热力子目录 `../../components/EChart.vue`

## 坐标轴与数据结构
- 量纲差异大的双序列（如合同备案份数 vs 备案面积万㎡）必须用双 Y 轴，否则面积序列被压平贴底
- 环形/饼图统一 `[{name, value}]`（如 `industryRefundRisk` 与 `houseNature` 同构）
- 面积占比环形图去掉所有文字标签（含 hover 强调），仅 tooltip 展示统计

## 样式与骨架
- 配色坐标轴统一取 `theme.js` 的 `C`、`PALETTE`、`baseTooltip`、`baseAxis`、`legendStyle`、`baseGrid`、`areaGradient`，禁写死色值
- 区县热力用 `visualMap` 连续色阶 `#e8f4ff → #1a5599`、`type:'map'` + `map:'suzhou'`，高度 520px
- 页面骨架照抄 `MarketOverview.vue`：根 `.da-page`，内部 `.grid`/`.grid-2`/`.grid-32`

## 涉及文件与归属
- 文件：`components/EChart.vue`、`theme.js`、`ChartCard.vue`、`KpiRow.vue`、`RankBar.vue`、`pages/MarketOverview.vue`
- 来源会话：`99019521-96f2-4316-b309-dc2f6f8cc441`、`20534a15-4562-4579-9c65-7b7deff9eaac`、`session-6c46bea2-2d63-4a2d-b33f-f111655982f2`；代码基线：`a86bf95`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dashboard_chart_conventions",
  "source_extraction_id": "2f0285f8b19a47cf8f04cc41b8d6c128",
  "version": 1,
  "memory_type": "entities"
}
-->