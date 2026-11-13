---
status: approved
human_confirmed: true
risk: low
review_override: false
session: 2026-11-13-route-offtask-review
title: 路由与 off-task 日志核查清单
---

# 路线核查清单（日志满样本后怎么用）

## 一、为什么有两份日志

| 日志 | 文件 | 分母 | 回答的问题 |
|---|---|---|---|
| 路由 | `.sessions/route.jsonl` | **每一次规划决策** | 工具有没有被选中？ |
| off-task | `.sessions/offtask.jsonl` | 已选中的代码类工具调用 | 选中的工具输出对不对？ |

**不能互相替代**。只看 off-task 会得到错的结论：若分流一直 MISS，off-task 样本会很少且不代表生产分流。
所以**先看路由，再看 off-task**。

## 二、先决条件：分流到底跑没跑（先于任何 MISS 统计）

**2026-11-13 实测的基线数据（61 个会话的成本日志，1194 行）**：

| 会话类型 | 数量 | 占比 |
|---|---|---|
| graph（`op:"full"`，有 plan） | 33 | 54% |
| `op:"tool"` 直调 | 12 | 20% |
| `plan_review` 单独 | 16 | 26% |

**但关键在于 graph 会话内部的 execute 工具分布（n=85）**：

| 工具 | 次数 | 占比 |
|---|---|---|
| **planner** | **43** | **50.6%** |
| file_reader | 20 | 23.5% |
| summarizer | 8 | 9.4% |
| plan_reviewer | 6 | 7.1% |
| code_editor | 4 | 4.7% |
| security_guard | 3 | 3.5% |
| pwsh | 1 | 1.2% |

**两个结论，比 30 条 MISS 数据更根本**：

1. **planner 占 execute 的 50.6%**——说明超过一半的规划决策「没选任何实际工具，规划器自己答了」。这是分流失效的**总根源**，远大于 code_editor vs code_edit_with_signal 之争。先修这个，否则后续样本全是选择偏差。
2. **`code_edit_with_signal` 在生产流量中执行次数 = 0**。已有的 3 次全部是本会话 15:31–15:40 的验证调用（含那次 32.57s 偏题）。即：**这个工具上线以来从未被真实任务选中过**。

所以：**先看这个比例，再看 MISS**。若 `op:"tool"` 占比高或 planner 占比高，MISS 统计既等不到样本、也不代表生产。

- [ ] 跑上面两个表的统计（脚本见 `scripts/route_stats.py`，需先把历史 costs 日志里的 `role=execute` 聚合）。
- [ ] 若 planner 占比 >30%，优先修 `PLANNER_SYSTEM`（已加两条硬约束），而不是扩标注集。
- [ ] 若 `op:"tool"` 占比 >50%，路由日志永远是空的——这本身就是结论：分流根本没跑。

## 三、路由核查（第一批，门槛 n≥30 规划决策）

- [ ] **先看 `route_source` 分布**。若 `fallback_planner` 占比 >20%，先修规划器稳定性（解析失败/空计划），因为兜底样本不能用来评估分流准确率。
- [ ] 只看 `route_source=planner` 的 MISS 率。样本 <30 时看 CI，**不得用点估计下结论**。
- [ ] 看 **MISS 去向表**。判断属于哪类：
  - `code_edit_with_signal -> code_editor`：判据太弱，提示词需加强
  - `code_edit_with_signal -> planner`：规划器把任务理解成“直接回答”，需在 prompt 里明确“涉及写代码必须选 code_*”
  - `code_edit_with_signal -> pwsh`：规划器想直接执行，需区分“生成代码” vs “跑命令”
- [ ] 抽 5 条 `request_head` + `chosen` 人工确认：`expected_tool` 的判据本身对不对（它只是关键词粗判，会有误判）。
- [ ] 如果 MISS 率 >30% 且集中在同一去向，**先修路由再谈 off-task**——否则 off-task 样本本来就是偏的。

## 四、off-task 核查（第二批，门槛 n≥30 代码类调用）

前置条件：路由 MISS 率已可接受（<10%），否则样本有选择偏差。

- [ ] `python scripts/offtask_stats.py` 看分模型触发率。
- [ ] **优先扩标注集的是“触发率高或样本量大”的模型**，而不是笼统全扫。当前预期主嫌疑是 `cursor/composer-2.5`。
- [ ] 按 `matched` 做特征聚类：同一特征词反复命中说明正则太宽（误报）或同一失效模式复现。
- [ ] 抽 `hit=true` 与 `hit=false` 各 5 条，人工读 `head`/`tail` + `instruction_head`，确认：
  - 是否真偏题（正则可能误报）
  - 是否漏检（读起来像偏题但 `hit=false`）
- [ ] 根据复核结果调 `_OFFTASK_PATTERN`：**误报优先修**（误报会抬高重跑率与成本），漏检次之。

## 五、何时可以下结论

**先修再观察，不要死等 30 条**（2026-11-13 修正）：

- n=1 的 100% MISS 已经足够强到直接修 prompt。等 30 条的前提是「分流在跑」，但实测 planner 占 execute 50.6%、新工具生产执行 0 次——**分母本身就不成立**。
- 正确顺序：① 查 op/工具比例 → ② 修 PLANNER_SYSTEM → ③ 用固定矩阵复测（本项目实测 5/5）→ ④ 再靠真实流量持续监测。

| 问题 | 需要的最小样本 | 结论形式 |
|---|---|---|
| 分流准确率 | 固定矩阵 5~10 条即可初判；生产统计需 ≥30 规划决策 | MISS 率 + 95% CI |
| composer 偏题率 | ≥30 次 `code_edit_with_signal` 调用 | 触发率 + CI，并注明分母已受路由影响 |
| 是否该回滚 composer | 偏题率 CI 下限 >10%，且已确认无误报 | 回滚到 flash 主选 |

> 样本 <30 时不要用点估计改配置；但**分流 bug 不用等 30 条**——单条可复现的误路由就够修。

**关于批量重放脚本**：暂不做。它脱离会话上下文、需要新增 replay 态、且成本不为零。应在「修 prompt + 真实流量」验证无效后再考虑。

## 六、已知陷阱

1. **route_miss 必须 plan-aware（2026-11-13 已修）**：多步计划「pwsh 定位 → code_edit_with_signal 修代码 → pwsh 自测」是**正当的**，初版只看 `plan[0]` 会误判成 MISS。现只要 `plan_tools` 含期望工具就不算 MISS，且 `plan_tools` 已落入日志供事后核对。
2. **`graph.py:930` 会改写 plan**：规划节点重跑时，手写的 plan 会被覆盖。所以手测时不要靠预填 plan 验证分流，要看日志。
3. **`expected_tool` 是关键词粗判**，不是 ground truth。它只是给人工复核做初筛；MISS 率高时先怀疑判据本身。
4. **时区**：`ts` 是 epoch 秒，`--since` 按 UTC 解析。
5. **日志不会自动轮转**。积累多了手动归档，否则统计变慢。
6. **`op:"tool"` 不写路由日志**，这是设计使然，不是 bug。
7. **单次冒烟不可信**：同一请求实测过规划器分别选 planner / code_editor / code_edit_with_signal。必须看多次或看日志。
