---
status: approved
human_confirmed: true
approved_sha256: 2386e16ec061079d5ccd055800664f3414101b1c64458bf996ccf001f26d1afc
approved_version: 1
---

# PLANNER_SYSTEM 增加「按题型派活·引用统一路由表」规则句

## 一、前因后果（痛点）
编排器已有 planner/code_editor/pwsh/file_reader/summarizer/verifier 多模型池，但规划器提示（PLANNER_SYSTEM）只按"工具选择/验证意图"分流，**不按题型决定执行档位**，导致等价任务无差别用同一档。controller-bench 406 行实测证明不同题型最强模型不同（对抗题 gpt-6-luna 0.875 vs deepseek-flash 0.605；抗坏工具 deepseek-flash 系最强）。用户要求先落一条"按题型派活、引用统一路由表"的**规则句**，且**不写死模型 id**（模型只在路由表一处维护，避免 prompt 漂移）。

## 二、现状与证据
- `src/graph.py:57-83` `PLANNER_SYSTEM` 常量，含硬约束一~四；`{tools}`/`{signal}` 为 format 占位符。
- `src/graph.py:919` `PLANNER_SYSTEM.format(tools=tools_desc, signal=_render_signal_rules())`。
- `tests/test_tool_signal_split.py:90-97` 断言 format 后无残留 `{signal}`/`{tools}`——**新增文本不得含裸 `{}`**（JSON 示例须写成 `{{}}` 转义），否则 format 抛错。
- 统一路由表权威定义在 `.plan/explore-multimodel-20261114.md` 文末「附：统一路由表」（v3 approved）。
- config.yaml 各工具池模型 = 路由表的落地载体；本改动只加提示规则，**不改任何模型池配置**。

## 三、实施方案
1. 在 `PLANNER_SYSTEM` 中**固定插入锚点**：硬约束四段末（`…纯问答 planner step 不需要 verify。` 之后）、`只输出一个 JSON 数组` 之前，追加【硬约束五：按题型选执行档】。固定锚点防 diff 漂移（回应 P2-1）。
2. 规则句内容要点（**全句不含任何具体模型 id**，回应审核 P1-1 的"规划器读不到 .md"问题——把**题型→工具档映射**直接内嵌，模型 id 仍只在路由表维护）：
   - 先判定任务题型，分 7 类：执行/检索/效率、抗坏工具改道、对抗/根因/多轮纠错、代码生成、长输出判读、安全拒绝、低成本兜底。
   - 每类只映射到**执行档位/工具**（如"效率类→一条 pwsh 聚合命令""对抗/根因→浅层分析+可能多步""代码生成→code_editor/code_edit_with_signal""长输出判读→summarizer""安全拒绝→refuse 或强模型+guard"），**不点名具体模型**。
   - 明确一句："各题型最强模型以编排器统一路由表为准，规划器只需按题型选对工具档、无需感知模型 id"。
   - 强调：不写死模型版本号；模型映射只在路由表一处维护。
3. 新增文本内所有 `{` `}` 一律写 `{{` `}}`（若含 schema 示例），确保 `.format()` 不破。
4. `tests/test_tool_signal_split.py` **新增一条测试**（回应 P1-2）：断言 format 后含【硬约束五】关键词，且**新增段不含模型 id 模式**（正则 `[a-z]+/[a-z0-9.\-]+@?|composer|gpt-|glm-|deepseek-|grok` 在硬约束五段落内为空）。
5. 不改 `SIGNAL_TRIGGERS`、不改 config.yaml。

## 四、验证计划
- `python -m pytest tests/test_tool_signal_split.py -q` 全绿（含新增的"硬约束五存在 + 无模型 id"断言 + 原 `test_prompt_renders_without_residual_placeholder`）。
- 手动 `python -c "import src.graph as g; print(g.PLANNER_SYSTEM.format(tools='x', signal=g._render_signal_rules()))"` 确认无 KeyError、无残留占位符、含新规则句。

> 变更受 git 管理，git revert 即可。
