# register_openviking_schedule
OpenViking 计划任务注册 PowerShell 脚本。

## 描述
- 注册 Windows 计划任务 `OpenViking-Memory-Snapshot`
- 无 `pwsh` 时回退到 `powershell.exe`

## 关系
- 生成/更新调用 `run-openviking-snapshots.ps1` 的计划任务
- 已随双快照配置推送到 `origin/main`（提交 ab181bdf）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "register_openviking_schedule",
  "source_extraction_id": "7ab171ffd54748fc90dd07f7ad5c3fc0",
  "version": 1,
  "memory_type": "entities"
}
-->