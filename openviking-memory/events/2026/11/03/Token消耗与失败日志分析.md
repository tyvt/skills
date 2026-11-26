# Summary
2026-11-03 对48个会话完成Token与失败日志审计：总输入541,410,677、未命中60,631,600（11.2%）、输出5,007,451、缓存命中88.8%、约6,948 steps；工具层115次失败（103可自愈）、供应商层42次失败（40限流）；4个会话占全天63%未命中，根因为低缓存模型/新会话、goal反复续跑、compaction反复失败、大结果回灌与重复整读、工具错误自愈；审计中发现失败审计脚本默认日期的dayLabel显示bug。
# 2026-11-03 (Tuesday) ChatLog:
**user**: 分析一下今天Token消耗，和对话中的失败日志
**assistant**: I'll analyze today's token consumption and failure logs. This matches the `token-frugal` skill, so let me load it first to follow the proper audit workflow.
**assistant**: The skill is loaded. Now let me run the token audit, the workflow (failure-cause) audit, and the comprehensive tool+supplier failure audit for today (2026-11-03). These are independent read-only scripts.
**assistant**: Let me collect the results from all three background jobs.
**assistant**: The token audit is done. The workflow-audit finished with exit code 1, which often just means it printed warnings. Let me read both remaining outputs.
**assistant**: Two things to resolve: the `workflow-audit.mjs` script isn't at that path, and the failure audit reported **2026-11-02** (yesterday) instead of today. Let me check what scripts actually exist and how the failure-audit date works.
**assistant**: `workflow-audit.mjs` only exists as a template, and there's an `audit-deep.mjs` instead. The failure audit script reported yesterday's date. Let me read the relevant scripts to understand the date logic and whether a deep/failure audit for today exists.
**assistant**: Key findings: the failure-audit script defaults to the wrong day (TZ bug → it reported yesterday). It accepts an explicit date. And `workflow-audit.mjs` is only a *template*, while the real deep script is `audit-deep.mjs`. Let me re-run the failure audit for today explicitly, and check whether the workflow-audit template is a complete usable script.
**assistant**: The `workflow-audit.mjs` is a complete script, just misplaced in `templates/`. Let me run it from there for today (with explicit date to avoid the TZ bug), and collect the failure-audit result.
**assistant**: Now let me collect the today's failure audit and the workflow-cause audit.
**assistant**: I now have complete data from three independent scripts. But there's a discrepancy I must resolve before reporting: the failure-audit script's *default* date labeled the data "2026-11-02" yet returned identical numbers to my explicit "2026-11-03" run. That suggests its day-filter may not be narrowing. Let me verify the date filter actually works so I'm not reporting cumulative numbers as "today's."
**assistant**: All data is verified and consistent. The date filter works correctly — the earlier "2026-11-02" label was a display bug in the script's default-date code (it scanned 11-03 files but printed the UTC-midnight-shifted label); my explicit `2026-11-03` run is the correct one. Here is the analysis.

---

# 2026-11-03 Token 消耗与失败日志分析

## 一句话结论
今天 **48 个会话**、**总输入 5.41 亿 tokens**，未命中 **6063 万**（占 11.2%），输出 501 万，**缓存命中率 88.8%**，约 **6948 steps**。其中 **4 个会话就吃掉 63% 的未命中**，且都伴随 compaction 反复失败 / 低缓存模型 / 重复整读等工作流事故。失败日志：**工具层 115 次（103 次可自愈）+ 供应商层 42 次（40 次限流）**。

## 一、Token 总览（按等效成本口径）
| 指标 | 数值 |
|---|---|
| 总输入 | 541,410,677 |
| 未命中 (uncached) | 60,631,600 |
| 缓存读 (cacheRead) ≈ | 480,600,000（命中率 88.8%） |
| 输出 | 5,007,451 |
| 总 steps / turns | 6,948 / — |
| **等效成本** (cacheRead×0.1 + uncached) | **≈108.7M「成本单位」** |

> 等效成本里未命中占 **56%**、缓存读占 **44%**——命中率虽高，但缓存读仍按 1/10 计价，且未命中是被少数会话拉爆的。**压未命中 + 压步数仍是第一抓手。**

## 二、异常会话盘点（命中率<75% 或 每步未命中>12k）
剔除本次分析会话 `cc14a6fd`（自身，刚起步 0% 命中）和 `144bd20b`（Composer 2.5 模型自测，0%），真实异常 7 个，吃掉 **71%** 的未命中：

| sid | 标题 | 未命中 | 命中% | 每步 | 产出比 | 工作流事故 |
|---|---|---|---|---|---|---|
| ⚠ `ee03fc37` | 核对翻译并改为白话 | **13,884k** | **34%** | **59,332** | 0.9% | goal 续跑 **16 轮**、重复整读 **121**、compaction **227/125/102**、工具错 49 |
| ⚠ `6a13b9f0` | 补全缺失页面并测试 | 11,514k | 76% | 17,768 | 23.7% | step/turn 64.8（单轮巨长） |
| ⚠ `5c809f6a` | 禅道 Bug 6023 主分支处理 | 7,172k | 46% | 27,479 | 3.1% | compaction **39/1/38**（仅 1 次成功！） |
| ⚠ `4da4d1a7` | 测试部署异常与验证码 | 5,627k | **1%** | **44,657** | 0.7% | 命中率崩盘 |
| ⚠ `0802295f` | Zentao Bug 6099 Link | 2,299k | **2%** | 22,103 | 2.0% | 命中率崩盘 |
| ⚠ `85f10a79` | ZenTao bug 6071 view | 2,082k | 79% | 12,178 | 2.4% | 重复整读 12、comp 38/23/15 |
| ⚠ `774f05fe` | gitlab-runner 16. | 294k | **8%** | 12,246 | 0.4% | 命中率崩盘 |

**Top 4**（`ee03fc37`+`6a13b9f0`+`5c809f6a`+`4da4d1a7`）= **38.2M 未命中 = 全天 63%**。

## 三、失败日志（48 会话）
**工具层：115 次失败（1.37%），其中 103 次可自愈** —— 先取 `tool-call-hygiene` 修正表重试一次即可避免：
| 错误码 | 次数 | 可自愈 |
|---|---|---|
| FS_NOT_OBSERVED | 28 | ✓ |
| INVALID_ARGS | 25 | ✓ |
| FS_EDIT_NOT_FOUND | 20 | ✓ |
| FS_NOT_FOUND | 14 | ✓ |
| TOOL_TIMEOUT | 7 | ✗（真超时） |
| SEARCH_FAILED | 6 | ✓ |
| UNKNOWN_TOOL | 6 | ✓ |
| FS_AMBIGUOUS_EDIT | 3 | ✗ |
| SEARCH_RAW_OUTPUT_OVERFLOW | 2 | ✓ |
| FS_NOT_TEXT | 2 | ✓ |
| SESSION_QUERY_TOOL_UNAUTHORIZED | 1 | ✗ |
| GOAL_ALREADY_EXISTS | 1 | ✗ |

**供应商层：42 次失败（不返回工具错误、直接终结整轮）**：`RATE_LIMIT` **40**、`TRANSPORT` 2。这类是「沉默杀手」，比工具层更隐蔽——连续 429 应直接换 provider 同名模型，别原地重试。

## 四、根因映射（5 类浪费）
- **A 低缓存模型/新会话**：`4da4d1a7`(1%)、`0802295f`(2%)、`774f05fe`(8%) 命中率崩盘 → 用了 cursor/grok/trae/opencode-free 等低缓存路由，或新会话无缓存。
- **B goal 反复续跑**：`ee03fc37` 单会话 **16 轮** goal 注入。
- **C compaction 反复失败**：全天 **484 试 / 275 成 / 209 败**；`ee03fc37` 102 败、`5c809f6a` 38 败仅 1 成——上下文持续近满，压缩硬撑。
- **D 大结果回灌 + 重复整读**：>8k 大结果 **226 条 / 2.7MB**；**重复整读 455 次**；`ee03fc37` 单会话整读 121 次。
- **E 工具错误自愈**：115 次工具失败，103 次属可自愈。

## 五、治理建议（落地为硬规则）
1. **长任务模型锁定**：>50 步只用 `workbuddy-ai/deepseek-v4.1-flash`（98% 命中），禁用低缓存路由；会话中途不切模型。
2. **goal 轮数上限 4–6**：「一批文件一个 goal + 一个会话」，禁止「全处理完再停」式无限续跑（`ee03fc37` 的 16 轮是反面教材）。
3. **窗口 60% 收尾 / compaction 失败 ≥3 次即换会话**：`5c809f6a` 38 次失败还在硬撑，浪费巨大。
4. **错误不原样重试**：拿到 FS_*/INVALID_ARGS/UNKNOWN_TOOL 先取修正表，重试一次仍败就换方案。
5. **大输出先过滤**：pwsh/grep 先 `Select-String` 落盘分段；read 先 grep 定位再 offset/limit；同文件整篇只读一次；大内容一次 `write`。

---
**数据来源**：`audit-tokens.mjs`、`templates/workflow-audit.mjs`、`tool-call-hygiene/audit.mjs`（均为只读）。工具+供应商层失败明细已落盘 `<C:\Users\Administrator\.dsh\reports\agent-failures-latest.json>`。

> 注：失败审计脚本的**默认日期**有显示 bug（`dayLabel` 用 UTC `.toISOString()` 把 +08:00 午夜回拨成前一天），我会显示成「2026-11-02」；已用显式 `2026-11-03` 参数重跑并交叉验证了 11-02（49 会话/81 工具错）与 11-04（0 会话），确认本数据确为今天。脚本若常用，建议把 `dayLabel` 改成按 Asia/Shanghai 取日期。

需要我把这套审计跑成**每日自动报告**（比如复用 `tool-call-hygiene/morning-report.mjs`），或针对 `ee03fc37`/`5c809f6a` 做**单会话深度复盘**（模型到底是谁、上下文 system/tools/message 各占多少）吗？

<!-- MEMORY_FIELDS
{
  "event_name": "Token消耗与失败日志分析",
  "goal": "分析消耗与失败",
  "summary": "2026-11-03 对48个会话完成Token与失败日志审计：总输入541,410,677、未命中60,631,600（11.2%）、输出5,007,451、缓存命中88.8%、约6,948 steps；工具层115次失败（103可自愈）、供应商层42次失败（40限流）；4个会话占全天63%未命中，根因为低缓存模型/新会话、goal反复续跑、compaction反复失败、大结果回灌与重复整读、工具错误自愈；审计中发现失败审计脚本默认日期的dayLabel显示bug。",
  "ranges": "0-55",
  "source_extraction_id": "52ff934c82414d68aa83b5125e81b450",
  "version": 1,
  "memory_type": "events"
}
-->