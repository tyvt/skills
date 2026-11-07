# WorkBuddy签到定时任务迁移至pi-web
苏州市房地产监测V3 环境中，WorkBuddy 签到脚本从 `.workbuddy` 迁移至 `.pi-web` 并由 pi-web-ui 创建 cron 定时任务。

## 迁移内容
- 脚本保存至 `C:\Users\Administrator\.pi-web\scripts\workbuddy-checkin\`（含 checkin_all.py、wbipc_client.py、run-checkin.cmd）
- pi-web-ui 创建 cron `0 8 * * *` 任务 `task-cn8tz7` 写入 `~/.pi-web/scheduler-tasks.json` 实现每日签到

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/069.md
- 涉及文件：SKILL.md、checkin_all.py、wbipc_client.py、README.md、scheduler-tasks.json
- 来源会话ID：01a171cc-76a9-7048-964a-22d6748131b4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "workbuddy_checkin_migration",
  "source_extraction_id": "67328dd98cc24bed8e1ff6930be16dd5",
  "version": 1,
  "memory_type": "entities"
}
-->