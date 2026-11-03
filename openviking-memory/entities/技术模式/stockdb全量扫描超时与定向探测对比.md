# StockDB全量扫描超时与定向探测对比
投资推送项目中对比 StockDB 与 RQAlpha 全量能力时，顶层 `rd.get('*')` 全量扫描易超时，应改为文档加定向探测。

## 问题背景
- 对 Redis/远程 `rd.get('*')` 做顶层 key 全扫可能因数据量读超时，拿不到完整表清单
- 本机为空表（如有效*/涨停*/龙虎榜*）需记录是未同步还是不存在

## 修复方案
- 报告应改为：官方 SDK 文档列能力边界，对日 K/分钟 K/指数等定向 `get_data` 探测字段与样本
- 分钟 K 与日 K 字段相同（如 21 列 OHLCV、估值、市值、is_st 等）可作为抽样结论写入对比 MD

## 验证与归属
- 验证证据：会话 470e994e：全扫超时；1min 与日线字段一致、指数 000001 可读，结论写入 docs/stockdb_vs_rqalpha.md
- 涉及文件：docs/stockdb_vs_rqalpha.md、DATA_SOURCES.md、dividend_lowvol_rotation/prices.py
- 所属项目：投资推送；来源会话ID：470e994e-c94f-4fbd-b86a-4d3069e69a94

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "StockDB全量扫描超时与定向探测对比",
  "source_extraction_id": "7de63fb7c38a48e2b63cdd0da15fdb08",
  "version": 1,
  "memory_type": "entities"
}
-->