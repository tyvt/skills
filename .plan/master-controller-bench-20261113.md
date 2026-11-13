---
status: approved
human_confirmed: true
risk: low
review_override: false
session: master-controller-bench-20261113
title: 主控模型批量测试（M1–M5 × 候选矩阵）
approved_sha256: cbb3f26c457cf81c750b17c66ec3b503ea62481b4abed4f474e5dff7afeae72f
approved_version: 1
---

# 主控模型批量测试计划

## 一、前因后果
- 编排器 planner 池现为 `workbuddy/deepseek-v4.1-flash → auto/deepseek-v4.1-flash`。主控职责 = 选工具 + 排步骤依赖 + 路由（该执行 / 该直答 / 该拒绝）。已归因问题：`file_reader` 命名误导、`pwsh` 编排器内可用而不被选、约一半该走工具的任务被直接回答。
- 用户方向：借 OrchestrationBench（规划/执行分离）、APB（工具噪声/坏工具）、TPS-Bench（效率指标）、MetaRouting（直答 vs 工具 vs 拒绝）的题目结构，用自己的工具生态造约 25 题，批量测候选主控模型，产出可行动的池次序。
- 已有资产：`cursor-model-routing/` 的 T1–T7 + `run-matrix.ps1` 直连网关测试骨架可复用；网关 27 个模型清单已实测；`.task-state/execution-logs/` 存有编排器真实执行日志。

## 二、现状与证据
- 工具空间（orchestrate op:list 实测 2026-11-13）：10 工具——`file_reader`（明确无读盘权限）、`code_editor` / `code_edit_with_signal`（纯文本生成，无磁盘读写）、`planner`、`image_analyst`、`security_guard`(+fast)、`summarizer`、`git`（只读摘要，禁 pull/push）、`pwsh`（真实执行仅发生在 op:"full"）。误导陷阱：`file_reader`/`code_editor` 名字像能读写盘，实际不能；`git` 不做 status/diff 以外的事。
- 网关模型清单（27 个，curl 实测）：workbuddy 系（deepseek-v4.1-flash / glm-5.3-flash / hy3）、auto 系、autoclaw-cn/zai_glm-5.3-flash、codex 系 10 个（gpt-5.6/6/6.1 各变体）、cursor 系 12 个（composer-2.5、grok-4.7@256k/500k、grok-4.6/4.5、kimi-k3/k2.7-code、glm-5p3(-flash)、glm-5.2、deepseek-v41-flash-1017）。
- 测试骨架：`cursor-model-routing/run-matrix.ps1` 支持 模型×任务 直连网关采集 耗时/prompt/completion/cached_tokens/成本，幂等写 results/*.json；已跑过 35+12 格验证可用。tasks.json 结构（prompt+判据）可扩展。
- 归因样本：#1–#15 planner 真实 instruction（会话归因产出）作为路由/拒绝题种子；`route_miss` 样本作为工具选择题种子。

## 三、实施方案
| 步 | 动作 | 落点 | 验证 |
|---|---|---|---|
| 1 | 写 M1–M5 测试集 `tasks-master.json`（25 题：M1 工具选择×6 含 2 陷阱、M2 步骤依赖×5、M3 噪声/坏工具×5、M4 路由×5（2 执行/2 直答/1 拒绝）、M5 效率×4，每题带 ground_truth 路径与判据） | `D:\repository\skills\controller-bench\tasks-master.json` | JSON 合法、25 题、每题有 rubric |
| 2 | 写评分器 `score.ps1`：按 4 维打分——工具选择（最优/可接受/错误）、完整性（必要步骤 recall）、效率（步骤数/预估 token 比最简计划）、路由校准（三分类混淆）；解析结构化计划（JSON 步骤列表） | 同目录 `score.ps1` | 对样例输出能打分 |
| 3 | 改造 runner：复制 `run-matrix.ps1` 为 `run-bench.ps1`，prompt 换成 M 集 + PLANNER_SYSTEM（注入 10 工具原文描述 + 计划 JSON schema 约束），直连网关按 模型×25 题 跑 | 同目录 `run-bench.ps1` | `-DryRun` 打印组合数正确 |
| 4 | 第一轮候选池（3 模型×25=75 次）：`workbuddy/deepseek-v4.1-flash`（现役）、`workbuddy/glm-5.3-flash`、`auto/glm-5.3-flash`，温度 0.2，max_tokens 1500 | `results/bench-r1/*.json` | 75 行全有输出与耗时/token |
| 5 | 第二轮候选池（6 模型×25=150 次）：`codex/gpt-5.6-sol`、`codex/gpt-6-sol`、`codex/gpt-6.1-sol`、`cursor/grok-4.7@256k`、`cursor/composer-2.5`、`cursor/deepseek-v41-flash-1017`；cursor 赠额模型先跑 M1+M4 各 1 题冒烟再全量，累计花费硬上限 $10 超限停 | `results/bench-r2/*.json` | 每模型 25 行；花费≤$10 |
| 6 | 汇总 `REPORT.md`：4 维得分表 + 成本/延迟列 + 混淆矩阵 + 推荐 planner 池次序（含次选与降级链） | 同目录 `REPORT.md` | 交用户判读 |

### 审核修正（2026-11-13 plan_review PASS 78/100，v1）
- **预检锁定 ID**：9 个候选各先跑 1 题 ping 预检，确认精确 model ID 可用后再进全量；预检失败模型当场剔除并记录。
- **预算口径**：冒烟调用计入总预算；runner 内实现累计成本读数（网关 usage），超 $10 即停并落盘已完成部分。
- **评分细则固化**：tasks-master.json 内固化 rubric；4 维权重 = 工具选择 0.35 / 完整性 0.25 / 路由校准 0.25 / 效率 0.15（主控 token 是成本大头，效率权重低于正确性）；format_error 统一计 0 分并单独统计格式失败率；"最优/可接受/错误"三档判定写入每题 rubric 的 acceptable_tools 列表。

## 四、风险与回滚
| 风险 | 缓解 | 回滚 |
|---|---|---|
| 计划输出非结构化导致评分困难 | PLANNER_SYSTEM 强制 JSON schema（steps[].tool/intent/depends_on/estimate_tokens），score.ps1 对解析失败记 format_error 单独计 | 无持久改动 |
| 直连网关≠编排器端到端（无 DSH 真实注入的完整 system prompt） | PLANNER_SYSTEM 用编排器 op:list 的**原文工具描述**注入，最大化贴近；报告标注局限 | 无 |
| 赠额/计费模型烧钱 | R2 赠额模型先冒烟 2 题，硬上限 $10，超限立即终止 | 无 |
| 25 题×9 模型=225 次调用耗时长 | 每模型独立 json 幂等断点续跑（已有则跳过）；跑批用后台 job + watchdog 监听 | 无 |
| 单次结果噪声 | M4 路由题（安全相关）命中错误时对该模型复跑 1 次确认；总分接近的模型标注"需 3 次复现"再进池 | 无 |

## 五、验证计划
- `tasks-master.json` 用 `ConvertFrom-Json` 校验 25 题、5 类、每题含 rubric。
- `run-bench.ps1 -DryRun` 打印 模型×题目 组合数（R1=75、R2=150）不真调。
- R1/R2 结果每行含 耗时/prompt_tokens/completion_tokens/cost；score 输出 4 维分与混淆矩阵。
- 报告给出明确的池次序建议（主选→次选→兜底）+ 与现役 deepseek-v4.1-flash 的对比结论。

## 六、范围与成本
- 只写 `D:\repository\skills\controller-bench\`（新目录）+ `.task-state/` 临时产物；不改编排器 config、不改 DSH 包、不改网关。
- 估算调用：R1 75 + R2 150 = 225 次请求，max_tokens 1500；主池与 codex 系按各自池额度，cursor 赠额部分硬上限 $10。
- 结果目录加 .gitignore；API key 用本地网关 key（magpie，无外泄风险）。git 提交收尾单独确认。
