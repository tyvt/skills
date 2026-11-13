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

## 二、先决条件：日志有没有数据

- [ ] 路由日志只在 **graph 路径（`op:"full"` 经模型规划）** 产生；`op:"tool"` 直调单工具**不经规划，不写路由日志**。若你的流量以 `op:"tool"` 为主，路由日志会永远是空的——这本身就是一个结论（说明分流根本没跑）。
- [ ] 跑 `python scripts/route_stats.py`，看「规划决策总数」。为 0 则先解决流量来源，不要往下走。

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

| 问题 | 需要的最小样本 | 结论形式 |
|---|---|---|
| 分流准确率 | ≥30 规划决策 | MISS 率 + 95% CI，如「12/45 = 26.7%，CI 16%-41%」 |
| composer 偏题率 | ≥30 次 code_edit_with_signal 调用 | 触发率 + CI，并注明分母已受路由影响 |
| 是否该回滚 composer | 偏题率 CI 下限 >10%，且已确认无误报 | 回滚到 flash 主选 |

> 样本 <30 时唯一合法的结论是「样本不足，继续采」。不要因为看到 50% 就改配置。

## 六、已知陷阱

1. **`graph.py:930` 会改写 plan**：规划节点重跑时，手写的 plan 会被覆盖。所以手测时不要靠预填 plan 验证分流，要看日志。
2. **`expected_tool` 是关键词粗判**，不是 ground truth。它只是给人工复核做初筛；MISS 率高时先怀疑判据本身。
3. **时区**：`ts` 是 epoch 秒，`--since` 按 UTC 解析。
4. **日志不会自动轮转**。积累多了手动归档，否则统计变慢。
5. **`op:"tool"` 不写路由日志**，这是设计使然，不是 bug。
