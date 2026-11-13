---
id: route-miss-weak-signal-20261113
priority: P1
created: 2026-11-13
review_round: 1
review: pass(72/100, 0 P0)
approved_sha256: 11e9efcea50b4fc9934e54b90c88d39d05e42085385e80803c44d59729a117bf
approved_version: 1
status: approved
human_confirmed: true
confirmed_at: 2026-11-13
implemented_at: 2026-11-13
verify: pytest 137 passed (基线131+新增6)，实机冒烟见下
---

# 路由 MISS 误报修正：工具词降级为弱信号 + plan_tools 反向验证 + MISS 可解释化

## 一、前因后果

用户发现新会话用了编排器但全程未触达 composer（cursor/composer-2.5）。排查确认：composer 仅挂在 `code_edit_with_signal` 池主选（config.yaml:84），而该会话任务全为执行类（build/eslint/目录列举），规划器全部正确派给 pwsh，composer 本就不该被调用。

但 `.sessions/route.jsonl` 中出现 3 条 `[ROUTE-MISS]`：期望 signal/code_editor、实际 pwsh。复核后全部为**误报**——请求里含执行词（如「验证代码能否编译的构建」「前后 10 行代码」「临时 py 脚本」），被 `expected_tool()` 的子串匹配误判为「想改代码」。

用户定级 P1：不影响生产与已完成归因，只影响未来趋势监测；要求修复方向为「工具词降级为弱信号 + plan_tools 反向验证 + MISS 判定可解释」，并把该发现写进 cursor-model-routing/REPORT.md 测量方法节，防止「MISS 计数被当成路由失效率直接引用」的二次误读。

## 二、现状与证据

**误报实例（route.jsonl，均为 route_source=planner、pwsh 实际执行正确）：**

| ts | 请求特征 | 期望(误) | 误报根因 |
|---|---|---|---|
| 1794560830 | eslint 校验命令 | code_editor | 「--ext」?…实为 code_words 子串误命中 |
| 1794560919 | npm run build「这是**验证**代码能否编译的构建」 | code_edit_with_signal | 「验证」命中 SIGNAL_TRIGGERS「要验证」 |
| 1794562529 | Select-String 检索「前后 10 行**代码**」 | code_editor | 「代码」命中 code_words |
| 1794563452 | python 统计 jsonl「临时 py **脚本**」 | code_editor | 「脚本」命中 code_words |

**代码位置（src/graph.py）：**

- L75-80 `SIGNAL_TRIGGERS`：触发词唯一定义源，同时渲染进 PLANNER_SYSTEM 给规划器分流用。
- L153-169 `expected_tool()`：日志对照用的「理想工具」猜测器。L161 对 SIGNAL_TRIGGERS 全词做子串命中→期望 signal；L165-167 code_words（写/实现/修改/重构/函数/代码/脚本/报错）子串命中→期望 code_editor。**无任何「执行类意图」排除**，执行词（build/eslint/python/检索）天然携带上述字眼。
- L172-194 `route_miss()`：plan_tools 含期望工具即豁免（f8dec839 已修 plan[0] 误判）；但 chosen=pwsh 时 plan_tools 里不会有 code 类工具，无法自救。

**关键区分**：SIGNAL_TRIGGERS 渲染给规划器的用途是**正向引导**（帮规划器在 code 类两兄弟间选择），误命中顶多多一步说明；但同一个词表被 expected_tool 用作**MISS 判定依据**，误命中直接产出假警报。两用途对精度的要求不同，后者必须更保守。

## 三、分布实施方案

**改动 1 — src/graph.py `expected_tool()`（L153-169）重写为三级判定：**

1. **强执行标记优先**：新增模块级 `_EXEC_MARKERS`，**全部用命令形态词**（采纳审核建议 1，不用裸词）：`npm run`、`npm test`、`npm run build`、`eslint`、`python -c`、`python -m`、`node ../`、`select-string`、`get-childitem`、`get-content`、`exit code`、`回传 exit`、`命令：`。「写 python 函数」「实现 build 功能」等编码请求不含命令形态，不受影响。命中任一 → 返回 None（执行意图压倒工具词）。
2. **signal 期望需共现**：SIGNAL_TRIGGERS 命中不再直接判 signal，须与代码对象词（函数/组件/正则/模块/类/接口/`.py`/`.ts`/`.vue` 等）或改写动词（写/改/修/重构/实现）**同请求共现**才期望 signal；仅弱词单 hit → None。
3. **code_editor 期望排除纯分析**：code_words 命中后，若含纯分析词（解释/说明/分析/为什么/是什么/怎么用）→ None；否则期望 code_editor。

SIGNAL_TRIGGERS 本体不动（仍是规划器正向判据的唯一定义源），只改 expected_tool 的消费方式。

**改动 2 — src/graph.py `route_miss()`（L172-194）与 `log_route()`：判定可解释化 + plan_tools 反向验证（采纳审核建议 2）**

- **plan_tools 反向验证**：plan_tools 非空且全部属于执行类工具集（pwsh/planner/file_reader/summarizer 等非 _CODE_TOOLS）时，即使 expected 命中弱信号也返回 None（规划器整份计划都是执行形态，反向印证执行意图）。
- route_miss 返回 dict 增加 `why` 字段：记录命中词与判定路径（如 `exec_marker=eslint`、`weak_only=验证`、`plan_tools_all_exec`、`cooccur_ok`）。
- log_route 落盘行增加 `decision`（`miss|ok|ambiguous|exec`）与 `why` 字段；非 miss 的弱命中以 `decision=ambiguous` 落盘供趋势观察，**不计入 miss 统计**。
- **兼容性（审核建议 3 已核实）**：route_miss 现签名即 `Optional[Dict]`（L194 已返回 dict），新增 `why` 键非破坏性；生产调用点唯一（graph.py:827，`if miss:` 语义不变）；测试调用点（test_route_log.py 12 处）断言 is None / is not None，不受新增键影响。

**改动 3 — 统计脚本兼容**：`scripts/route_stats.py` 改用 `.get()` 读新字段，旧行（无新键）按 `decision=miss` 旧口径兼容。

**改动 4 — REPORT.md 测量方法节**（cursor-model-routing/REPORT.md，新增小节）：
写明 MISS 计数口径：expected_tool 是基于关键词的弱分类器，MISS 是「候选警报」不是「路由失效率」；引用本次 4/4 误报复盘（执行类请求携带验证/代码字眼），失效归因必须结合 plan_tools 与人工复核，禁止把 MISS 率直接当 KPI 引用。

## 四、风险与回滚

- **漏报风险（主要）**：执行标记表过宽会把真实「写代码+跑测试」请求误判为 None（如「跑 pytest 验证刚写的函数」含 `pytest`）。缓解：第 2 级共现规则先于 exec 标记中的裸词（`pytest` 单独出现不触发强执行，仅命令形态 `pytest `+路径或「回传」才触发）；回归测试锁定真 MISS 样本「写函数+pytest 断言」仍判 miss。
- **日志消费方**：route.jsonl 新增字段为纯增量，旧行无新键，route_stats.py 已列兼容改动。
- **回滚**：graph.py + 测试为单 commit，revert 即回原判定；REPORT.md 为文档，无运行时影响。

## 五、验证计划

1. **基线**：已跑 `python -m pytest tests/ -q`（execution 快路径）→ **131 passed, exit 0**（前稿误记 127，以实际为准）。
2. **新回归测试** `tests/test_route_miss_weak_signal.py`：
   - 4 条真实误报请求（build/eslint/检索/python 统计）→ expected_tool 返回 None 或 route_miss 返回 None；
   - 真 MISS 样本（写函数+pytest 断言、按方案逐条改）→ 仍产出 miss 且 why 可解释；
   - 弱命中样本 → decision=ambiguous、不计 miss。
3. **实施后全量 pytest** 对比基线，零回归。
4. **实机冒烟**：orchestrate op:full 发一条「npm run build 回传 exit code」请求，查 route.jsonl 新行 decision=exec、无 MISS 告警。
