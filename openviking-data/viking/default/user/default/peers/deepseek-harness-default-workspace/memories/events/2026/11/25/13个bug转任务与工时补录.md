# Summary
2026-11-25 在新禅道库事务内新建关联任务 2793–2805（fromBug 指向 13 个 bug、标题取 bug 标题），回写 13 个 `zt_bug.toTask`，插入 13 条各 0.50h 工时，并把 2768/2769 由 4.00h 调低为 0.75h；事务内与提交后独立连接复核均为当天 `zt_effort` 15 条、合计 8.00h、work 全为任务标题且无 `提交:` 残留，bug 6476/task 2706 未改动；原始行备份至 `D:\plan\default-workspace\zt_effort_backup_20261124_reprocess.md`。
# 2026-11-25 (Wednesday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 这个任务处理方式不对，如果改了bug，也要把bug都转任务然后记录工时，重新处理，后续任务也按照这个标准
...
**assistant [peer=deepseek-harness-default-workspace]**: 13 个任务已建好。现在查询新任务 id↔fromBug 映射，用于回写 toTask 和记工时。
**assistant [peer=deepseek-harness-default-workspace]**: 13 个新任务 id = 2793~2805。现在一次性回写 13 个 bug 的 toTask（用 CASE 会被引擎拦，改用 VALUES 构造的 UPDATE 或逐条；先试 INSERT...VALUES 型多值 UPDATE）。规则说事务内禁用 CASE，用子查询形式 UPDATE。
**assistant [peer=deepseek-harness-default-workspace]**: toTask 回写完成。现在插入 13 条工时（objectID=新任务，work=任务标题，consumed=0.50，product 按各 bug 产品）。
**assistant [peer=deepseek-harness-default-workspace]**: 13 条工时插入完成。现在调低 3085/3086 到 0.75。
**assistant [peer=deepseek-harness-default-workspace]**: 全部写入完成。事务内复核：条数=15、合计=8.00、无提交格式残留、6476/2706 未被改动。
**assistant [peer=deepseek-harness-default-workspace]**: 事务内禁用 CASE/SUM。拆成简单 COUNT 查询逐项复核。
**assistant [peer=deepseek-harness-default-workspace]**: 事务内复核通过：15 条（2 旧 + 13 新），work 全是任务标题无提交格式，合计 0.75×2 + 0.50×13 = 8.00h。核对 6476/2706 未动后提交。
**assistant [peer=deepseek-harness-default-workspace]**: 6476/2706 保持原状（bug toTask 本就是 0，未动）。提交事务。
**assistant [peer=deepseek-harness-default-workspace]**: 提交成功。独立连接（不传 session_id）复核落库结果。
**assistant [peer=deepseek-harness-default-workspace]**: 独立复核：15 条、合计 8.00h。关会话。

<!-- MEMORY_FIELDS
{
  "event_name": "13个bug转任务与工时补录",
  "goal": "完成禅道补录写入",
  "summary": "2026-11-25 在新禅道库事务内新建关联任务 2793–2805（fromBug 指向 13 个 bug、标题取 bug 标题），回写 13 个 `zt_bug.toTask`，插入 13 条各 0.50h 工时，并把 2768/2769 由 4.00h 调低为 0.75h；事务内与提交后独立连接复核均为当天 `zt_effort` 15 条、合计 8.00h、work 全为任务标题且无 `提交:` 残留，bug 6476/task 2706 未改动；原始行备份至 `D:\\plan\\default-workspace\\zt_effort_backup_20261124_reprocess.md`。",
  "ranges": "26,93-111",
  "source_extraction_id": "9c5b3ccd2a434f10b23180fa83ad018c",
  "version": 1,
  "memory_type": "events"
}
-->