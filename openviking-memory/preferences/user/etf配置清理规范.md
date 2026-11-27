---
audit_status: invalid
last_checked: 2026-11-27T03:47:46+08:00
verdict_note: savedTargetAllocation/allEtfCodes/DEVIATION_THRESHOLD_MAP/159980 仅命中 skills/memory-migration-archive 记忆归档 JSON，D-/repository 实际 index.html 无任何代码证据；无法证明有效。
---
- `index.html` 中移除某 ETF（如 `159980` 有色ETF大成）时，从 `savedTargetAllocation`、`allEtfCodes`、`etfNameMap`、`DEVIATION_THRESHOLD_MAP` 删除，但 `savedTransactions` 内的该 ETF 交易记录保持不变。
- 验证证据：session 651e7d06；涉及文件：index.html；来源会话：651e7d06-ffe4-4db5-aa88-cd6aae30725e

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "ETF配置清理规范",
  "source_extraction_id": "61ac1443c2464ba4a5c7ada13fdee10d",
  "version": 1,
  "memory_type": "preferences"
}
-->