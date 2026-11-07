# 数智分析看板数据契约在 mock/index.js
数智分析各看板页数据来自 `mock/index.js` 具名导出，字段名以实际导出为准，照抄任务描述会导致图表空白。

## 已确认导出清单
- 商品房：`newKpis`(8)/`newSupplyTrend`/`newDealTrend`/`newInventoryTrend`/`newPriceRanges`/`newProjectRankByArea`/`newProjectRankBySuite`/`newAnnualSupply`
- 存量房：`stockKpis`(7)/`stockListTrend`/`stockDealTrend`/`stockInventoryTrend`/`stockPriceRanges`/`stockAreaSegments`/`stockRegionRank`/`stockProjectRank`/`stockAnnualTrend`
- 租赁：`rentKpis`(5)/`rentTrend`(`{months, contract, area, price}`)/`rentRegionRank`/`rentInstitutionRank`/`rentPriceRanges`
- 行业管理：`industryKpis`(5)/`industryComplaintTrend`(`{months, value}`)/`industryRefundRisk`(`[{name,value}]`)/`industryInstitutionRank`
- 热力：`heatNewProject`/`heatStockList`/`heatStockDeal`/`heatRent`

## 关键差异与坑
- 描述写 `heatStock`，实际导出 `heatStockList` 与 `heatStockDeal`
- 投诉趋势实际为 `industryComplaintTrend` 且结构 `{months, value}`，非 `complaint`
- `stockAreaSegments` 实际为单序列 `[{name, value}]`，无 `newVal/stockVal`
- 地图 `mock/suzhou.json` 的 `properties.name` 用 10 个短名（新区/吴中/相城/姑苏/吴江/常熟/张家港/昆山/太仓/园区），须与页面 `districtValues` 完全一致

## 涉及文件与归属
- 文件：`src/views/dataAnalysis/mock/index.js`、`mock/suzhou.json`、`pages/MarketOverview.vue`
- 来源会话：`99019521-96f2-4316-b309-dc2f6f8cc441` 等三子会话；代码基线：`a86bf95`

## 开发约定
- 动手前读全 `mock/index.js`，以实际导出名为准，不调接口不造数
- 改真实接口时保持同一字段契约，页面层不用改

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dataanalysis_mock_fields",
  "source_extraction_id": "2f0285f8b19a47cf8f04cc41b8d6c128",
  "version": 1,
  "memory_type": "entities"
}
-->