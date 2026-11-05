# 资金收支接口合并为getFundIncomeEx
园区物管2.0 资金收支趋势接口由 `getFundIncomeTrend`+`getFundExpenditureTrend` 合并为 `getFundIncomeExpenditureTrend`。

## 接口变更
- 原分别调用 `getFundIncomeTrend`、`getFundExpenditureTrend`
- 现合并为一次请求：`POST /benefit/largeScreenStatistics/getFundIncomeExpenditureTrend/{year}`

## 响应字段映射
- `month` → X 轴月份
- `incomeRecordAmount` → 收入入账金额（万元）→ 图表「入账金额」
- `expenditureRecordAmount` → 支出入账金额（万元）→ 图表「支出金额」

## 关键代码
- `dataHelpers.js` 新增 `applyFundIncomeExpenditureTrendFromApi` 解析函数（约 84:114 行）

## 验证与归属
- 验证：cursor 会话 89f3491d 提取，当前代码已适配
- 涉及文件：benefit/mapOverview/dataHelpers.js、benefit/mapOverview/index.vue
- 所属项目：园区物管2.0；来源会话：89f3491d-92ec-4f80-ad71-e695f8826a01；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fund_income_ex_interface",
  "source_extraction_id": "ac80b5d8fa304846a9b0db0e9fb8bf49",
  "version": 1,
  "memory_type": "entities"
}
-->