---
status: approved
human_confirmed: true
approved_sha256: ba73abf5f6ebb1fb0bf0a355025a28b2950a3e49243eba905a07c193f659f228
approved_version: 3
---

# M6–M10 新题集落地（controller-bench 题型扩充）

## 一、前因后果（痛点）
现有 controller-bench 只有 M1–M5（工具选择/步骤依赖/坏工具/路由/效率）+ T8–T11（综合对抗），缺真实高频场景：多轮纠错、扇出去重、长上下文判读、多模态判读、diff 评审。这 5 类也恰是"最该按模型能力分流"的类别。需补 M6–M10 五类题，使模型评测覆盖这些场景，为"关停明显不行模型、其余参与新题评测"提供依据。

## 二、现状与证据
- `tasks-master.json`：`tasks` 数组现 29 题（M1-1…M5-4 + T8–T11），schema 字段：`id/cat/route_expect/prompt/optimal_tools/acceptable_tools/optimal_steps/required/trap`。
- `route_expect` 合法取值 `execute_tools|direct_answer|refuse`（`_meta.output_schema.route`，line 8）。
- `image_analyst` 已注册：`config.yaml:114`，且 M1-6 已作 optimal_tools 使用 → M9 可用。
- `run-bench.ps1:148` full 套件 `$sel = $tasks` —— 新增题自动进 full 评测，幂等按 model+task 跳过已有行。
- `score.ps1:33-58` 通用四维评分（tool/comp/route/eff + format_error），按任务字段通用计算，**不硬编码题号**（仅混淆矩阵限定 M4-*/M3-3/M3-5）。
- 结论：**新增任务插进 tasks 数组即可被 run/score 流水线自动处理，scorer 无需改**（保持 schema 兼容，最低风险）。**新题共 6 道（M6×2 + M7/M8/M9/M10 各 1），总题数 29→35。**

## 三、实施方案
1. `tasks-master.json`：在 T11 之后、`]` 之前新增 6 题（沿用现有 schema，字段与既有题完全同构，不引入新字段以保 scorer 兼容）。完整字段定义如下：

| id | cat | route_expect | optimal_tools | acceptable_tools | optimal_steps | required（正则交替） | trap |
|---|---|---|---|---|---|---|---|
| M6-1 | M6纠错 | execute_tools | ["pwsh"] | [] | 2 | ["换道\|改用\|不同\|重试\|调整\|避开", "超时\|失败\|报错"] | 首步已失败，复读同命令=0 分 |
| M6-2 | M6纠错 | execute_tools | ["pwsh"] | [] | 2 | ["换\|避开\|替代\|拆分\|缩短\|定向\|窄", "超时\|失败\|stall\|中断"] | stall 后须换窄命令/拆分，不复读同一命令 |
| M7-1 | M7扇出 | execute_tools | ["pwsh"] | [] | 1 | ["ForEach\|批量\|聚合\|一条\|遍历\|循环"] | 10 文件须一条聚合命令，禁拆 10 步 |
| M8-1 | M8判读 | execute_tools | ["pwsh"] | [] | 1 | ["Select-String\|Measure-Object\|匹配\|统计\|提炼\|聚合"] | 2k 行日志须聚合提炼，禁整读进上下文 |
| M9-1 | M9图像 | execute_tools | ["image_analyst"] | [] | 1 | ["image_analyst\|图像\|截图\|看图\|视觉"] | pwsh/file_reader 无法看图 |
| M10-1 | M10评审 | direct_answer | [] | [] | 0 | ["回归\|破坏\|兼容\|风险\|不影响\|安全"] | 纯文本评审不执行；须点出回归风险 |

   - prompt 设计：M6-1/2 给"首步失败/超时回报"的上下文；M7-1 给目录下 10 个文件清单；M8-1 给 2k 行日志路径（假设路径，规划器只看文本、不真读）；M9-1 给截图路径；M10-1 贴一段含潜在回归的 diff 文本。
   - **optimal/acceptable_tools 均取自 run-bench.ps1 的 9 工具清单**（file_reader/code_editor/code_edit_with_signal/planner/image_analyst/security_guard/summarizer/git/pwsh）——回应 P1-1：M6-2 原用 orchestrate（不在该清单）已改为 pwsh；全部 optimal_tools 校验属上述 9 工具。
   - **trap 与评分关系（回应 P1-2）**：trap 是题面陷阱说明，**不直接计分**；真实惩罚靠 required recall（completeness）。M6-1/2 复读同命令时 analysis/intent 不含"换道/拆分/避开"类词 → comp 低分；为加强惩罚，required 首项设为换道类强词，复读场景难命中，completeness 显著降分。
   - **scorer 兼容核对（回应 P1-1）**：M10 为 `direct_answer`、`optimal_steps=0`、tools=[]。核对 `score.ps1:37-54`：`route_expect≠execute_tools` 时 toolScore 取 `steps.Count==0?1:0`、effScore=1、routing 按 route 匹配、comp 按 required recall——**M10 可正常算分，无除零/异常**（与既有 M4-3/M4-4/M4-5 同型直接答题一致）。
   - **单轮计划测试口径（回应 P1-2）**：M7/M8/M9 的文件清单、2k 日志路径、截图路径均为**给规划器看的占位文本**，本套只测"规划文本是否选对工具/策略"，**不真实执行、不真读盘**（与 M1-6 用假设截图路径同理）；真实执行需另跑 orchestrate 端到端。故此路径无需真实存在。
2. `tasks-master.json` `_meta`：补 `m6_m10_batch` 说明段（回应 P2-2：题型定义 6 题、与已有四维评分复用、route_expect 取值、局限：单轮计划产出，M6/M7 的 recovery/fanout 专用字段留后续增强）。
3. **不改 score.ps1**（四维通用逻辑已覆盖；本批先用现有字段保证可跑）。
4. 不改 run-bench.ps1。

## 四、验证计划
- JSON 合法 + 逐题核对（回应 P1-3/P2-1）：`python -c "import json,re;d=json.load(open('tasks-master.json',encoding='utf-8'));ids=[t['id'] for t in d['tasks']];assert len(ids)==len(set(ids));new=[t for t in d['tasks'] if t['id'].split('-')[0] in ('M6','M7','M8','M9','M10')];assert len(new)==6;assert all(t['route_expect'] in ('execute_tools','direct_answer','refuse') for t in d['tasks']);[re.compile(p) for t in new for p in t['required']];print('total',len(ids),'new',[t['id'] for t in new])"` —— **落地前必跑 json.load 自检**（含中文/大括号转义正确），断言 id 唯一、新题 6、route 合法、required 正则可编译、total=35。
- `pwsh run-bench.ps1 -Suite full -DryRun` 确认组合数 = 模型数 × 35。
- 对 1–2 个模型跑新题冒烟（M6–M10 各 1 次），确认产出 JSON、`pwsh score.ps1 -Suite full` 含新 task 行且 M10（direct_answer）required 能命中、M6 若复读则 completeness 低（验证 trap 生效）。`

> 变更受 git 管理，git revert 即可。
