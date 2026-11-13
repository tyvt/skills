---
status: approved
human_confirmed: true
risk: low
review_override: false
session: pool-realignment-20261113
title: 编排器池落地：plan_reviewer 加 grok 首选 + planner 聚合约束 + security_guard 去 glm
approved_sha256: ce50e601142c7f542de5aee62378752d207581da1d8e3b456b822fc6d37b1bac
approved_version: 1
---

## 验证结果（2026-11-13 执行后回填）
- 全量 pytest：137 passed。
- 活体冒烟（M5-2 同款简单题）：planner 输出 **1 步聚合**（Select-String + Measure-Object 一条管道），guard 链正常（flash 一审 → escalate → final ALLOW）。
- op:list 池结构复验：待用户重启 DSH Web 后执行（config/graph.py 启动时读死）。

# 编排器池落地计划（基于 controller-bench 实测）

## 一、前因后果
- controller-bench 14 模型×25 题实测（commit 4eae5751）：`cursor/grok-4.7@256k` 路由校准唯一满分 1.00、总分 0.90 最高；现役 planner `deepseek-v4.1-flash` 效率 0.75 短板（步骤偏多）；`glm-5.3-flash` 在 M3-3 幻觉工具题误判为 execute_tools——guard 角色不能接受。
- 用户落地建议：plan_reviewer 首选加 grok（审核员要绝对正确）；planner 维持 deepseek 但加"简单任务一步聚合" prompt 约束；security_guard 去掉 glm 备选。
- 测试基线：`pytest tests/test_tool_signal_split.py` 11 passed（改动前已跑）。

## 二、现状与证据
- `dsh/langgraph-orchestrator/config.yaml` L151–160：plan_reviewer 池 = workbuddy/deepseek → auto/deepseek，max_tokens 8192，timeout 300（2026-11-12 注释：max_tokens 低会 502）。
- `config.yaml` L118–124：security_guard 池 = workbuddy/deepseek + autoclaw-cn/zai_glm-5.3-flash。
- `src/graph.py` L55–70：PLANNER_SYSTEM 已有两条硬约束（写码选码工具/验证选 signal），无聚合约束；L68-69 输出 schema 是 JSON 数组。
- 池单点风险背景：2026-11-12 image_analyst 曾推翻"不留备用"设定；security_guard_fast 本就是单模型。

## 三、实施方案
| 步 | 动作 | 落点 | 验证 |
|---|---|---|---|
| 1 | plan_reviewer.models 首位插入 `cursor/grok-4.7@256k`（max_tokens 8192），原双 deepseek 降为次选/兜底；池级 max_tokens/timeout 不动 | `config.yaml` L153–157 | `orchestrate op:list` plan_reviewer 池显示 grok 首位 |
| 2 | PLANNER_SYSTEM 追加【硬约束三：简单任务一步聚合】：读+改+验证可合并为一条命令/单工具指令的禁止拆多步；目标简单任务 1 步、含依赖的中等任务 ≤3 步 | `graph.py` L59-67 约束区 | pytest 11 个用例仍过 + 新约束文本渲染进 {signal} 后的完整 prompt |
| 3 | security_guard.models 删除 `autoclaw-cn/zai_glm-5.3-flash`，仅留 workbuddy/deepseek（与 security_guard_fast 同为单模型口径） | `config.yaml` L120–122 | op:list security_guard 池仅 1 模型 |
| 4 | 监控项记录（无代码）：后续若 planner 计划出现"不存在的工具"（M3-3 同型漂移），触发重测 | 本计划备注 | — |

## 四、风险与回滚
| 风险 | 缓解 | 回滚 |
|---|---|---|
| grok 首选使每次 plan_review 变慢（13.3s vs 4.4s）且计费 | 审核频率低（仅计划送审），单次成本 ≈$0.02；失败自动落到 deepseek 次选 | git revert 该段 |
| security_guard 变单点 | **已核实 fail-closed**：graph.py L998–1009 模型失败/无有效 JSON 一律 DENY（L8 注释同口径），单模型不构成 fail-open | 回填 glm 行 |
| prompt 约束与现有测试断言冲突 | 新约束为纯文本无大括号，`test_prompt_renders_without_residual_placeholder` 守 format 安全；改后跑全量 pytest | edit 还原 |

### 审核修正（plan_review PASS 76/100，v1：approved_sha256=ce50e601…7bac）
- #1 聚合行为测试：新增离线用例断言 PLANNER_SYSTEM 含聚合约束关键词 + format 无残留；步骤数行为靠改后活体冒烟（orchestrate full 简单题）验证，写入验证计划。
- #2 guard 失败路径：已核实 fail-closed（L998–1009），无需注入测试。
- #3 参数归属：per-model `max_tokens: 8192` 与 plan_reviewer 现有两条目（L154–157）schema 完全一致；池级 max_tokens 保持 8192 不动，无矛盾。

## 五、验证计划
- 改后 `python -m pytest tests/ -q`（编排器目录）全过。
- `orchestrate op:list` 三个池与预期一致（若编排器配置是启动时读死，则由用户重启 DSH Web 后复验——遵守"用户自行重启"偏好）。
- 用一道简单题（如"统计文件 ERROR 行数"）过 orchestrate full 验证 planner 输出 1 步聚合。

## 六、范围与成本
- 只改 2 文件：`config.yaml`、`graph.py`；不改 graph.py 路由逻辑、不动其他池。
- plan_review 审核成本 ≈$0.02/次（grok）。提交方式与推送在人工确认轮一并确认。
