# 多因子数据管道 Parquet 优先约定
红利低波等多因子重构约定：本地 Parquet 字段优先，远程字段先落本地 DuckDB 再算，禁止边跑策略边直连远程 API。

## 数据读取规则
- 能用本地 `stock_daily` 等 Parquet 的字段一律走 Parquet（最优路径）
- 无法形成 Parquet 的远程字段先同步进本地 DuckDB，再执行因子与回测
- 禁止边跑策略边直连远程 API

## 财务与行业数据来源
- 季报财务优先 StockDB `get_fundamentals`，备用 AKShare `stock_financial_abstract`
- PE_TTM 用已有 Parquet
- 行业用 `cache/dividend_lowvol/stock_industry_sw_l1.csv`

## 验证与归属
- 验证证据：rollout-2026-08-27 用户明确要求「所有需要 API 远程拉取的数据都先同步到本地 duckdb」及「可以用本地 parquet，无法形成 parquet 再使用 duckdb」
- 最终验收 52 项测试通过
- 涉及文件：output/validation/comprehensive_report.md、cache/dividend_lowvol/stock_industry_sw_l1.csv
- 所属项目：投资推送；来源会话ID：rollout-2026-08-27T12-47-53-01a0418b-c09c-7882-aeea-91ab71028277

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "多因子数据管道parquet优先",
  "source_extraction_id": "17e08beb3b824e8dbcd91bdb8c2c85a8",
  "version": 1,
  "memory_type": "entities"
}
-->