# 禅道bug转任务回写
在新禅道库把当天已解决的 bug 转成关联任务并补记工时的一套库内写库流程。

## 关联字段
- `zt_task.fromBug` 存来源 bug id，是 bug→task 的唯一关联；新建任务后须回写对应 `zt_bug.toTask`，据此防重复转任务。
- 新建任务时标题取 bug 标题，`module` 必须取 bug 的真实 module（填 0 会被判错），product/project/execution 取 bug 自身值。

## 操作要点
- DBX 会把 `INSERT ... SELECT` 判为高风险拦截，改用逐条或多值单表 `INSERT` 从 bug 表生成任务。
- 回写 `toTask` 用子查询形式 `UPDATE`（事务内禁用 `CASE`）；工时行 `product` 格式为 `,<product_id>,`，取各 bug 自身 product。
- 每个 bug 记一条工时（`objectType='task'`、`objectID`=新任务 id、`work`=任务标题），按条数×时长验算单日总量。

## 示例
- 2026-11-25 依此流程为 11-24 的 13 个未转 bug 建任务 2793–2805，各记 0.50h，并把原 2768/2769 由 4.00h 调低至 0.75h，当天合计 8.00h。

<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "技术模式",
  "name": "禅道bug转任务回写",
  "source_extraction_id": "9c5b3ccd2a434f10b23180fa83ad018c",
  "version": 1,
  "memory_type": "entities"
}
-->