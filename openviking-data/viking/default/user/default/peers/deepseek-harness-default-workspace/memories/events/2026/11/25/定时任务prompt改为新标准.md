# Summary
2026-11-25 将定时任务 `schedule-78e071ef-…` 的 prompt 改为「查当天 tiany 解决的 bug → 未转任务则新建 → 按约 8h 记工时 → work 用任务标题 → 防重 + 事务复核」，并备份旧 prompt，下次运行时间为 2026-11-26 00:00。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 这个任务处理方式不对，如果改了bug，也要把bug都转任务然后记录工时，重新处理，后续任务也按照这个标准
...
**assistant [peer=deepseek-harness-default-workspace]**: 数据库部分完成。现在更新定时任务 prompt 为新标准。先查看当前任务。
**assistant [peer=deepseek-harness-default-workspace]**: 现在写新 prompt，把标准改为「bug 转任务 + 记工时」，并保留 DBX 事务写法与防重规则。
**assistant [peer=deepseek-harness-default-workspace]**: 定时任务已更新为新标准。回填计划终稿状态。

<!-- MEMORY_FIELDS
{
  "event_name": "定时任务prompt改为新标准",
  "goal": "同步自动化执行标准",
  "summary": "2026-11-25 将定时任务 `schedule-78e071ef-…` 的 prompt 改为「查当天 tiany 解决的 bug → 未转任务则新建 → 按约 8h 记工时 → work 用任务标题 → 防重 + 事务复核」，并备份旧 prompt，下次运行时间为 2026-11-26 00:00。",
  "ranges": "26,115-119",
  "source_extraction_id": "9c5b3ccd2a434f10b23180fa83ad018c",
  "version": 1,
  "memory_type": "events"
}
-->