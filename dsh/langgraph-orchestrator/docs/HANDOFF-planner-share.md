---
status: draft
human_confirmed: false
risk: low
session: 2026-11-13-handoff-planner-share
title: 交接：planner 占 execute 50.6% 的拆分与下一步
---

# 交接文档：planner 占比的真实拆分

> 目的：让下一个会话不用重查数据，直接用结论选课题。
> 写于 2026-11-13 16:5x，基于 61 个会话 / 1194 行 `*.costs.jsonl`。

## 一、我上一轮的定性错了，需要修正

我说过「planner 占 execute 50.6% = 分流失效总根源」。**这个定性不成立**，因为它没拆任务类型。
正确的说法是：50.6% 里有一部分是**合理的**（本来就不需要工具），只有一部分是真失效。

## 二、已核验事实（可直接引用，不必重跑）

### E1 总量与分母

| 项 | 值 |
|---|---|
| 成本日志文件 | 61 个 `*.costs.jsonl` |
| 总行数 | 1194 |
| graph 会话（有 `role=plan`） | 33 |
| `op:"tool"` 直调会话 | 12 |
| `plan_review` 单独会话 | 16 |

### E2 graph 内 execute 工具分布（n=85）

| 工具 | 次数 | 占比 |
|---|---|---|
| planner | 43 | **50.6%** |
| file_reader | 20 | 23.5% |
| summarizer | 8 | 9.4% |
| plan_reviewer | 6 | 7.1% |
| code_editor | 4 | 4.7% |
| security_guard | 3 | 3.5% |
| pwsh | 1 | 1.2% |
| **code_edit_with_signal** | **3（均为本会话验证调用）** | — |

### E3 关键新数据：按输入上下文大小拆分 planner-as-execute（n=43 有 usage）

| 类型 | 条数 | 占比 | 含义 |
|---|---|---|---|
| `prompt_tokens < 400` | **28** | **65%** | 未读大上下文，**纯靠模型自身知识作答** |
| `prompt_tokens >= 400` | **15** | **35%** | 带了上下文却仍自己答，**这类才是真失效候选** |

其中 `prompt<400` 组的 completion 中位数 1516、最大 5839 —— 说明它们**确实在实质作答**，不是寒暄。

### E4 planner 输出体量对比（中位数 completion tokens）

| 工具 | n | median | mean | max |
|---|---|---|---|---|
| planner | 37 | **2313** | 3059 | 8192 |
| plan_reviewer | 6 | 2206 | 2845 | 9364 |
| code_editor | 4 | 1530 | 835 | 1604 |
| code_edit_with_signal | 3 | 752 | 1973 | 5068 |
| pwsh | 7 | 455 | 573 | 1603 |
| file_reader | 26 | 116 | 302 | 1543 |

planner 的输出量是 file_reader 的 20 倍，比 code_editor 还大。**它不是摘要器，是在写答案。**

### E5 会话维度

31 个会话出现过真实工具，8 个会话全程只用了 planner。

### E6 新工具的生产使用情况

`code_edit_with_signal` 在生产流量中**执行 0 次**。已有的 3 次全部是本会话 15:31–15:40 的验证调用（含那次 32.57s 偏题）。该工具上线以来从未被真实任务选中。

## 三、二分结论（本轮核心）

把 43 次 planner-as-execute 拆开：

### A 类：本来就不需要工具（约 28 条 / 65%）—— 合理，不该修

特征：`prompt_tokens < 400`，模型靠自身知识直接答。
典型场景：解释概念、写一次性小片段、回答“是什么/怎么用”、给出建议。

**这类不该被计入“分流失效”。** 强行让它走工具只会多花一轮、拿不到更好结果。

### B 类：带了上下文却仍自己答（约 15 条 / 35%）—— 真失效候选

特征：`prompt_tokens >= 400`，说明已经把文件/日志/代码带进来了，规划器却选择“我自己总结/我直接改”，而没有路由给 `file_reader` / `code_editor` / `code_edit_with_signal`。

**这才是应该修的。** 但它不一定是“偏好问题”——也可能是规划器判断“内容已经足够，不必再调工具”是**对的**（例如宿主已把全文贴给它）。

## 四、下一个课题该选哪个：需要先回答一个问题

B 类 15 条里，到底是：

- **（偏好）规划器明明该转交却自己干了** → 课题 = 修 `PLANNER_SYSTEM` 的偏好
- **（质量）转交也无用，它自己答得更好** → 课题 = 评估工具选择是否真的影响结果质量

**判别方法（建议下一步先做，成本约 10 分钟）**：

1. 从 `.sessions/*.costs.jsonl` 里筛出 `prompt_tokens>=400` 且 `tool=planner` 的 15 条，取其 `session_id` + `ts`。
2. 到 DSH 会话历史里找到对应请求（注意：`session_event_search` 本次实测超时，建议直接用文件检索或限小时间窗）。
3. 对每条回答两个问题：
   - 该请求是否涉及**写改代码**或**需要读未提供的内容**？
   - planner 的答卷是否**完整且正确**（拿完整 `content` 人工读）？
4. 给出 2×2：

| | 答题合格 | 答题不合格 |
|---|---|---|
| **本该走工具** | 偏好问题（低优先） | **质量+偏好（高优先）** |
| **本来不需工具** | 合理 | 模型能力问题（非路由问题） |

## 五、已知的坑（别重复踩）

1. **`route_miss` 必须 plan-aware**：多步计划「pwsh 定位 → code_edit_with_signal 修 → pwsh 自测」是正当的，只看 `plan[0]` 会误判。已修，见 `f8dec839`。
2. **`expected_tool` 是关键词粗判**，不是 ground truth。
3. **单次冒烟不可信**：同一请求实测过规划器分别选 planner / code_editor / code_edit_with_signal。
4. **`graph.py:930` 会改写 plan**：手测时不要预填 plan，要看日志。
5. **成本日志不含请求文本**：只有 `role/tool/model/elapsed/usage`。想关联请求必须走会话历史。
6. **`op:"tool"` 不写路由日志**，设计使然。

## 六、本轮已完成的代码改动（均已提交，状态干净）

| commit | 内容 |
|---|---|
| `2bbeef99` | 新增 `code_edit_with_signal` 工具（composer-2.5 主选） |
| `39f162d0` | off-task 检测 + 真实流量触发率日志 |
| `74f12da9` | 第 5 类“虚构交付物型”偏题 + 复现性边界（skills 仓） |
| `a9232c5b` | 路由日志 `[ROUTE-MISS]` + `route_source` 三态 |
| `3213eda2` | 日志核查清单 |
| `f8dec839` | 路由判定改 plan-aware，补 pwsh 误选，加强 `PLANNER_SYSTEM` |
| `3365e1d9` | 把 op/工具比例基线写进清单 |

验证状态：`pytest` **123 passed**；`node orchestrator/selftest.mjs` **EXIT=0**；路由矩阵 5/5 正确。

可用脚本：`scripts/route_stats.py`、`scripts/offtask_stats.py`。
可用文档：`docs/LOG-REVIEW-CHECKLIST.md`。

## 七、建议的开局方式

下一个会话直接说：

> 读 `dsh/langgraph-orchestrator/docs/HANDOFF-planner-share.md`，按第四节做 B 类 15 条的 2×2 归因。

**不要**一上来就改 `PLANNER_SYSTEM`——先确认是偏好还是质量。
**也不要**先做批量重放脚本（脱离会话上下文、需新增 replay 态、成本不为零），等归因出来再说。
