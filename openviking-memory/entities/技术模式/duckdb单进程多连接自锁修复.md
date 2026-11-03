# DuckDB单进程多连接自锁修复
DuckDB「被占用」报错常源于单进程内多连接未关闭，读路径须用只读连接且用毕关闭。

## 问题根因
- 报错「Can't open a connection...」「Unique file handle conflict」不一定是外部进程占用
- 缓存层 `_conn()` 只读场景仍 `ensure_schema()` 开写连接且不用即 `close()`，导致 report.py 读十几个键堆连接自锁、部分查询回退 CSV

## 修复方案
- 拆 `_read_connection()`（只读+用毕关闭）与 `_write_connection()`（写入+用毕关闭）
- 仍异常时用 PowerShell `Get-CimInstance Win32_Process -Filter "Name='python.exe'"` 查并发写库进程（如 sync_*、回测）

## 验证与归属
- 验证证据：会话 7230ae3b：修 duckdb_cache.py 后 `python report.py` 无回退、无 merge 报错
- 涉及文件：duckdb_cache.py、report.py、sync_market_duckdb.py、sync_stockdb_to_duckdb.py
- 所属项目：投资推送；来源会话ID：7230ae3b-3ad8-46da-ad7b-da9ceb90867d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "DuckDB单进程多连接自锁修复",
  "source_extraction_id": "096d8f58fb69458090ec2f870f3595df",
  "version": 1,
  "memory_type": "entities"
}
-->