---
status: approved
human_confirmed: true
session: plan-slim-lossy
title: 计划瘦身：源头 4 段式 + 送审有损抽取 + reviewer 去噪音
---

# 计划瘦身：源头 4 段式 + 送审有损抽取 + reviewer 去噪音

## 前因后果
端到端实测证实：规范计划的 `_condense_plan` 无损压缩率≈1.000（排版已紧凑，无可剥冗余），对降 grok 时延无效。真正的水分在**冗长背景+源码粘贴+回滚八股**，需有损结构化瘦身；回滚本就靠 git（独立分支 `git revert`），不必写进计划。

## 现状与证据
- `api.py:29` `_PLAN_REVIEW_SYSTEM`（L29-47）；`api.py` 的 `_condense_plan/_condense_once/_is_decoration/_is_fence`（上一 commit a37e8d5b 新增，送审前无损压缩）。
- `api.py:390-393` 送审 user_content = context + `## 待审核计划` + review_plan。
- **关键事实（纠正需求前提）**：本仓 `graph.py:55` `PLANNER_SYSTEM` 产出的是**执行用的 JSON 工具步骤数组**，**不写 `.plan/*.md` 审核文档**；`.plan` 文档由 **DSH 宿主主模型按 `dsh/AGENTS.md:27-31` 计划审批节撰写**。故"约束主控写 4 段式"的落点是 **AGENTS.md**，不是 PLANNER_SYSTEM。
- `dsh/AGENTS.md:28` 现要求计划含"前因后果/现状与证据/实施方案/**风险与回滚**/验证计划"5 段（**强制包含风险与回滚**，与瘦身目标相反）。

## 实施方案
1. **源头治八股（`dsh/AGENTS.md:28`）**：计划骨架由 5 段改为 4 段——前因后果(≤3句)/现状与证据(只写行号/字段名，禁贴大段源码；代码证据只写"文件:行号 + 一句话")/实施方案(逐步改哪里，不写实现代码)/验证计划(只写怎么跑测试)。**禁止单列「风险与回滚」章节**，如确需则一行"变更受 git 管理，git revert 即可"。禁贴完整 JSON/YAML，只写 diff 要点。
2. **reviewer 去噪音（api.py `_PLAN_REVIEW_SYSTEM`）**：追加——审核聚焦「是否漏文件/依赖、边界(空值/并发/异常)是否处理、验证是否覆盖改动点」；计划若标注"变更受 git 管理"则**不要求**冗长回滚步骤。**注意：不主动写"忽略背景/格式"之类措辞**，避免与送审层有损抽取的过滤叠加造成双重过滤漏审（抽取负责降噪，reviewer 保持完整判断力）。
3. **送审有损抽取（api.py 新增 `_extract_core_for_review`，替代 `_condense_plan` 送审路径）**：按 `##` 二级标题切分。**保留以下段**：`前因后果`(**不纯字符截断——按句过滤，凡含约束/禁止/必须/不得/仅限/底线等关键词语的句子一律不截**，其余背景句可截，总长软上限 600 字)、`现状与证据`(**不整块剥 fenced code block，改为「每个代码块最多保留前 10 行 + 省略提示」**，行号/字段名保留，整段截前 1000 字)、`实施方案`(完整)、`验证计划`(完整)、`设计`/`方案`(完整)。**底线：实施方案与验证计划段落完整保留不截断**。
4. **fail-safe（关键）**：抽取前先校验——若原文**缺少「实施方案」或「验证计划」任一标题**，或抽取结果为空，则**退化为送原计划全文**（绝不因标题不规范而漏送关键段）。
5. **开关**：`PLAN_REVIEW_SLIM` **默认 false**（不默认改变现网送审行为，需显式开启；或用可热加载配置读取）。true 时走有损抽取；false 送原计划全文。
6. **废弃 _condense_plan**：删除 `_condense_plan/_condense_once/_is_decoration/_is_fence` 及 `tests/test_condense_plan.py`；`run_plan_review` 中原调用 `_condense_plan` 处改为「开关开→`_extract_core_for_review`，关→原样」；git 历史可找回。

## 验证计划
- 单测 `tests/test_extract_core.py`，**至少覆盖 3 类计划**：
  - (a) 正常 5 段+大段源码粘贴：抽取后留前因后果(按句过滤、含关键词句不截)/现状与证据(每个代码块≤10行、行号保留)/实施方案/验证计划；源码超 10 行部分省略、实施方案与验证计划**逐字完整**。
  - (b) 缺验证计划标题 → **退化送原计划全文**（fail-safe，最关键用例）。
  - (c) 抽取为空 → 原计划。
- 全量 `pytest -q` 全绿（删除旧 condense 测试后其余不回归）。
- 端到端：取真实 ~8k 计划，`PLAN_REVIEW_SLIM` 开/关各调一次 plan_review，对比 grok verdict 一致、issues 无新增漏审，且送审 token 显著下降。

## 风险与回滚
变更受 git 管理，git revert 即可。

