---
audit_status: valid
last_checked: 2026-11-27T19:17:40+08:00
verdict_note: task-watchdog.ps1 在 skills/dsh/scripts/ 真实存在，STALL/heartbeat 机制命中，工具记忆属实。
---
# task-watchdog.ps1
DSH 任务监控用的 PowerShell 脚本，实际位于 `D:\repository\skills\dsh\scripts\task-watchdog.ps1`。

## 定位
- 2026-11-15 核对预期目录与 harness checkout 时均未找到该脚本。
- 2026-11-15 检查既有 job 记录后确认实际路径为 `D:\repository\skills\dsh\scripts\task-watchdog.ps1`。

## 用途
- 用于以后台方式启动构建任务，并写出日志文件与心跳文件。

## 相关经历
- 2026-11-15 直跑构建被主机策略拦截，编排器本次调用失败。
- 2026-11-15 改为由该脚本启动后台构建，并由代理每 30 秒读取 job 日志进行监控。
- 该次操作明确不启动开发服务器。

<!-- MEMORY_FIELDS
{
  "category": "工具脚本",
  "name": "task_watchdog",
  "source_extraction_id": "c378229083b149c5abfbf04f4fe8384c",
  "version": 2,
  "memory_type": "entities"
}
-->