# 资金收支接口合并单次请求适配

根因：资金收支原分两个接口调用，现合并为 `getFundIncomeExpenditureTrend`。关键修复：`dataHelpers.js` 新增 `applyFundIncomeExpenditureTrendFromApi`，映射 `month` 为 X 轴、`incomeRecordAmount` 与 `expenditureRecordAmount` 为入账金额（万元）。

**验证证据**：extracted source=cursor session=89f3491d-92ec-4f80-ad71-e695f8826a01

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/index.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/dataHelpers.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/constants.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/benefit/mapOverview/mock.js、dataHelpers.js

**所属项目**：园区物管2.0
**来源会话**：89f3491d-92ec-4f80-ad71-e695f8826a01
**代码基线**：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_income_merge",
  "source_extraction_id": "9c0e6f113ab94ec3bf48ce74c44050b9",
  "version": 2,
  "memory_type": "entities"
}
-->