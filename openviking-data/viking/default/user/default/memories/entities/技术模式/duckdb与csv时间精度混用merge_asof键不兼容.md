# DuckDB与CSV时间精度混用merge_asof键不兼容
投资推送项目中 DuckDB 读出的 datetime64[us] 与 CSV 缓存的 datetime64[ns] 混用会导致 merge_asof 键不兼容报错。

## 问题背景
- DuckDB `load_wide_frame` 默认 `datetime64[us]`，CSV 缓存常为 `datetime64[ns]`
- DuckDB 读失败回退 CSV 后在同一面板里 `merge_asof` 会报 `incompatible merge keys M8[ns] vs M8[us]`

## 修复方案
- 在数据入口统一精度：`duckdb_store.load_wide_frame` 与 `data_cache.load_dataframe` 解析日期后一律转为 `datetime64[ns]`
- 避免多数据源拼接时再踩坑

## 验证与归属
- 验证证据：会话 7230ae3b：`us_index_data.build_valuation_panel` 在 DuckDB 部分失败后混源 merge 触发；统一 ns 后报告跑通
- 涉及文件：duckdb_store.py、data_cache.py、us_index_data.py
- 所属项目：投资推送；来源会话ID：7230ae3b-3ad8-46da-ad7b-da9ceb90867d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "DuckDB与CSV时间精度混用merge_asof键不兼容",
  "source_extraction_id": "7de63fb7c38a48e2b63cdd0da15fdb08",
  "version": 1,
  "memory_type": "entities"
}
-->