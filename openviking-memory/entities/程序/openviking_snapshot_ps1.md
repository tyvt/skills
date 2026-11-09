# OpenViking 定时快照脚本
Windows PowerShell 脚本，由 OpenViking-Memory-Snapshot 定时任务每日 03:00 调用，负责 OpenViking 数据与记忆双快照的提交推送。

## 基本信息
- 脚本路径 D:/repository/skills/scripts/run-openviking-snapshots.ps1
- 由 Windows 定时任务 OpenViking-Memory-Snapshot 每天 03:00 以 `powershell.exe -File ...un-openviking-snapshots.ps1 -Push` 执行
- 依次运行 snapshot-openviking-data.mjs 与 snapshot-openviking-memory.mjs
- 2026-11-09 修复后最终提交 e46c864d

## 功能流程
- 执行顺序：停 OpenViking 服务 → data 快照 → memory 快照 → 提交推送 → 重启服务
- data 快照用 robocopy /E /XO 增量复制 vectordb
- 验证效果：data 提交 e08a7c4c（20250 文件 / 265.12 MB）、memory 提交 1cbd5195（6546 md / 8.38 MB），均推送成功

## 已知问题
- 2026-11-09 修复前根因：PowerShell 5.1 将 node stderr 转 ErrorRecord 配合 `$ErrorActionPreference=Stop` 立即终止；无 BOM UTF-8 中文注释被按 GBK 解码报语法错误
- 修复方式：改用 `*> ` 文件重定向 + EAP=Continue + catch 记录失败，脚本改为纯 ASCII 注释
- vectordb 用 robocopy /E /XO 增量复制，源目录删除的旧索引文件不从备份删除（备份 48→77 文件含历史 .ldb）；如需严格镜像可改 /MIR

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "openviking_snapshot_ps1",
  "source_extraction_id": "404f82f161ea4128bbd06c509e41ccdc",
  "version": 1,
  "memory_type": "entities"
}
-->