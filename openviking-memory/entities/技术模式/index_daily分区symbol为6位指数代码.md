# index_daily 分区 symbol 为 6 位指数代码，非 RQAlpha 后缀格式
导出到 index_daily 分区的 symbol 列存 6 位指数代码，不可误用 RQAlpha 后缀格式。

## 写入规范
- index_daily 分区 symbol 列写入 6 位指数代码（如 000300、000001），与 stock_daily 列宽一致但语义为指数
- 从 RQAlpha bundle 拉数使用 INDEX_ORDER_BOOK_IDS（如 000001.XSHG），勿误以为分区内存 RQAlpha 格式或对指数错误调用 to_rqalpha_id 再写入

## 验证与归属
- 验证证据：实查分区样例 ['000300', '000001']；导出逻辑用 DEFAULT_INDEX_SYMBOLS 写 symbol
- 涉及文件：data/parquet/README.md、scripts/export_to_parquet.py、data/parquet_constants.py
- 所属项目：投资推送；来源会话ID：f26e414b-5ffc-41af-87fb-2940b83bf8da

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "index_daily分区symbol为6位指数代码",
  "source_extraction_id": "47b88250035e448993c5fc96fa935340",
  "version": 1,
  "memory_type": "entities"
}
-->