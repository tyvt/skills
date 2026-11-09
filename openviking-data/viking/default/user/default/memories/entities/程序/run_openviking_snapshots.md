# run_openviking_snapshots
OpenViking 双快照包装 PowerShell 脚本，用于计划任务每日执行。

## 描述
- 接收 `-Reason scheduled -Push` 参数调用
- 顺序执行 `snapshot-openviking-data.mjs` 与 `snapshot-openviking-memory.mjs`

## 关系
- 由 Windows 计划任务 `OpenViking-Memory-Snapshot` 每天 03:00 通过 `powershell.exe` 调用
- 日志输出至 `%TEMP%\openviking-snapshot\`

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "run_openviking_snapshots",
  "source_extraction_id": "7ab171ffd54748fc90dd07f7ad5c3fc0",
  "version": 1,
  "memory_type": "entities"
}
-->