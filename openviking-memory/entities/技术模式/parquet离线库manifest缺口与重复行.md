# Parquet 离线库：manifest 缺口、残留键与多 part 重复行
data/parquet 的 manifest 存在记账缺口与残留键，多 part 追加可能导致重复行，需针对性处理。

## manifest 缺口与残留键
- stock_daily_qfq 的 manifest 有历史遗留记账缺口，不影响 DuckDB 查询，就绪判断应单独统计 qfq_ok 并注明缺口
- daily manifest 中约数百只「曾 ok 但已不在当前 stock_codes」的残留键会累积，宜提供 --prune-manifest

## 多 part 重复行
- 同一 year 下多个 part_* 增量追加时，同一 symbol 出现在旧/新 part，read_parquet 返回重复行
- 当前 --resume 按 symbol 整只跳过无重复；未来按 year 粒度重导需显式去重

## 验证与归属
- 验证证据：文档修订补 qfq 输出行、重复行说明、残留键清理建议
- 涉及文件：data/parquet/README.md、data/parquet_constants.py、scripts/export_to_parquet.py
- 所属项目：投资推送；来源会话ID：f26e414b-5ffc-41af-87fb-2940b83bf8da

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "Parquet离线库manifest缺口与重复行",
  "source_extraction_id": "47b88250035e448993c5fc96fa935340",
  "version": 1,
  "memory_type": "entities"
}
-->