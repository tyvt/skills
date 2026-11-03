# merge_dataframes_by_date日期类型导致merge_asof失败
投资推送中 `data_cache.merge_dataframes_by_date` 将日期转 python date 致 object dtype，并发缓存刷新后 merge_asof 混用类型报错。

## 问题根因
- 若用 `combined['_merge_dt'].dt.date` 写回日期列，得 object dtype
- 缓存过期并发刷新（创业板 PE/PB、美股等）后内存与 `cyb_data`/`us_index_data` 的 `merge_asof` 混用 datetime64 与 object，报 `Incompatible merge dtype, dtype('O') and dtype('O')`（易误判为 akshare 网络问题）

## 修复方式
- 日期列保留 `datetime64[ns]`，如 `combined[date_col] = combined['_merge_dt']`
- 仍失败可删 `data/cache/cyb/`、`data/cache/us/` 强制重拉

## 验证与归属
- 验证证据：会话 4ffab379 报错出现在 akshare tqdm 刷新缓存时；改保留 datetime64 后 merge_asof 与 `python report.py` 验证通过
- 涉及文件：data_cache.py、cyb_data.py、us_index_data.py、report.py
- 所属项目：投资推送；来源会话ID：4ffab379-d597-4f7b-b836-4964bddd5105

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "merge_dataframes_by_date日期类型导致merge_asof失败",
  "source_extraction_id": "a3dc477ad941455eaf900a9789834bdb",
  "version": 1,
  "memory_type": "entities"
}
-->