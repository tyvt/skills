# Python bool字符串真值歧义致停牌状态误判
turtle_quant 项目 stockdb_rd.py 中因 `bool("0")` 返回 True 导致非停牌 bar 被错误标记 paused=True 的 bug 记录与修复方案。

## 问题现象
- turtle_quant/adapters/stockdb_rd.py 第144行使用 `bool(raw["paused"])` 转换字符串
- Python 中 `bool("0")` 返回 `True`（非空字符串均为真）
- 导致非停牌 bar 被错误标记 `paused=True`，错误进入零价位占位符逻辑

## 解决方案
- 解析 StockDB SDK 停牌状态需显式判断字符串内容，如 `raw["paused"] == "1"`
- 避免错误进入零价位占位符逻辑

## 验证与归属
- 验证证据：extracted source=cursor session=22744518-8928-4f53-8f8b-a46c1d60becd
- 涉及文件：turtle_quant/adapters/stockdb_rd.py、storage/sync.py、storage/parquet.py、storage/snapshot.py、storage/checkpoint.py、storage/quality.py、adapters/baostock_adapter.py、adapters/chinabond.py
- 所属项目：量化选股（turtle_quant）；代码基线：none；来源会话ID：22744518-8928-4f53-8f8b-a46c1d60becd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stockdb_paused_bug",
  "source_extraction_id": "ae74fa2c32b04f48ba3fe3d595c53fce",
  "version": 1,
  "memory_type": "entities"
}
-->