# Summary
2026-11-14 用户要求重新获取 cursor 全量路由并先做初筛测试。助手拉取 cursor 全量 66 个模型，对每模型跑 6 题初筛（M1-1/M1-3/M1-5/M3-3/M4-3/M4-5，测 JSON 顺从+关键路由），66×6=396 次调用全部完成，结果存 screen-cursor.json。分档：A(6/6)14个、B(5/6)18个、C(4/6)13个、D(≤3/6)21个；32个(A+B)通过初筛，34个(C+D)不合格。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: codex 评测结果整理成正式记录文档（含题型矩阵 + 任务类型适配）
然后重新获取cursor全量路由，并先做初筛测试
**assistant [peer=github.com-tyvt-skills]**: 两件事：①写 codex 评测记录文档；②拉 cursor 全量模型清单 + 初筛测试。

先建 todo，然后并行：写 codex 文档（纯文档，新建 write）+ 拉 cursor 清单。
**assistant [peer=github.com-tyvt-skills]**: cursor 全量有 **66 个模型**！数量巨大。先写 codex 文档，再规划 cursor 初筛（66 个不能全跑，需先薄筛）。

先写 codex 评测记录文档。
**assistant [peer=github.com-tyvt-skills]**: codex 文档完成。现在处理 cursor——66 个模型太多，且很多是**同模型不同 context 变体**（@300k/@1m）和不同家族（claude opus/sonnet/fable、gemini、gpt、grok、muse、kimi、glm）。

"重新获取 cursor 全量路由，并先做初筛测试"——初筛=快筛 6 题（M1-1/M1-3/M1-5/M3-3/M4-3/M4-5），快速判定 JSON 顺从 + 关键路由。66 个全跑 6 题=396 次调用，量不小但可行（并发）。先拉完整清单确认 66 个。

先看完整 cursor 清单（被截断了），用文件输出。
**assistant [peer=github.com-tyvt-skills]**: 66 个 cursor 模型。初筛策略：66×6 题=396 次调用太多且慢。但同模型不同 context 变体（如 claude-opus-5@300k vs @1m、grok-4.7@256k vs @500k）本质同模型，初筛只测一次即可。我做**去重初筛**：同模型去重到主变体（带 @1m 的去掉，保留 @300k/@256k/无后缀），减少到约 40 个，再快筛 6 题。

不过用户说"重新获取 cursor 全量路由，并先做初筛测试"——全量清单已获取（66）。初筛我按去重后跑（避免同模型重复浪费时间），并说明去重逻辑。先看去重后数量。

实际上，为忠实"全量初筛"又不浪费，我采取：**对所有 66 个都做初筛**，但用并发 8 + 短超时，396 次调用可控（codex 140 次约 5 分钟，396 约 12-15 分钟）。用户要"全量"，就全量跑。建脚本。
**assistant [peer=github.com-tyvt-skills]**: 66×6=396 次，并发 8，部分 cursor 模型慢。监听。
**assistant [peer=github.com-tyvt-skills]**: 推进中。继续监听（这一步会跑一阵，我按半分钟读）。
**assistant [peer=github.com-tyvt-skills]**: 200/396，稳定推进。继续。
**assistant [peer=github.com-tyvt-skills]**: 360/396，快完成。读 partial 文件看是否有结果，避免重复 wait。
**assistant [peer=github.com-tyvt-skills]**: 360/396，还差 36 条（慢模型尾巴）。读 job 收尾。
**assistant [peer=github.com-tyvt-skills]**: 全量初筛完成（396 rows, DONE）。汇总 cursor 初筛结果——每模型 6 题：JSON 成功数、路由正确数（工具选/坏工具/安全/直答）。
**assistant [peer=github.com-tyvt-skills]**: f-string 冲突（内层引号）。改用 .format。
**assistant [peer=github.com-tyvt-skills]**: 结果被截断。写个分类汇总统计（分档：6/6 全过、5/6、≤4/6），并输出完整名单到文件。
**assistant [peer=github.com-tyvt-skills]**: 初筛分档清楚了。读完整 D 档（被截断）以给出完整结论。
**assistant [peer=github.com-tyvt-skills]**: 完整初筛结果到手。更新 todo，给你汇总。
**assistant [peer=github.com-tyvt-skills]**: ## 完成两件事

### ① codex 评测记录文档
[CODEX-REPORT-20261114.md](D:\repository\skills\controller-bench\CODEX-REPORT-20261114.md)：含总分表、题型×模型矩阵、任务类型适配表、M1 工具选择根因诊断、口径局限。核心：codex/gpt 系有效分 0.769–0.779、JSON 干净但**工具选择是硬短板（M1 0.51–0.67）**，适合作分工（gpt-6-luna 规划/对抗、terra 效率/判读、6-sol 坏工具改道），不适合作主控首选。

### ② cursor 全量初筛（66 个模型 × 6 题 = 396 次，全部完成）
数据存 [screen-cursor.json](D:\repository\skills\controller-bench\results\screen-cursor.json)。分档结果：

**A 档 · 满分 6/6 全过（14 个，最优先）**
`claude-opus-4-7@1m/@300k`、`deepseek-v41-flash-1017`、`gemini-4-argon`、`gemini-4-hydrogen`、`gpt-5.3-codex`、`gpt-5.4-mini`、`gpt-5.4-nano`、`gpt-5.6-sol@1m/@272k`、`gpt-5.6-terra@1m/@272k`、`grok-4.7@500k`、`muse-spark-1.3@1m`

**B 档 · 5/6（18 个，可进全量）**
claude-fable-5-1/5-2 两变体、claude-opus-4-8@300k、claude-opus-5-5@300k、claude-sonnet-5-5 两变体、glm-5p3-flash、gpt-5.5@1m/@272k、grok-4.6、grok-4.7@256k、kimi-k3、muse-spark-1.3@300k、muse-wonder-1.0 两变体（部分有 1 次网络 err 或 1 题路由错）

**C 档 · 4/6（13 个，边缘）**
claude-opus-4-8@1m、claude-opus-5 两变体、claude-sonnet-5 两变体、**composer-2.5（4/6，route 3，印证 JSON 不稳）**、gemini-3.5/3.8-flash、gemini-4-carbon、gpt-5.2、gpt-5.4@1m/@272k、gpt-5.6-luna 两变体

**D 档 · ≤3/6（21 个，明确不行/不可用）**
含 `claude-opus-4-5`（0/6）、`claude-sonnet-4-6`（0/6）、`gemini-3.1-pro`（0/6）、`kimi-k2.7-code`（0/6 全 502）、`claude-sonnet-4@200k`（6 err 全挂）、glm-5.2（1/6）、glm-5p3（2/6）、gpt-5.1、gpt-5-mini、grok-4.5（3/6 路由差）、gemini-3-flash、claude-haiku-5-5、claude-fable-5、auto 等。

### 关键结论
- **cursor 66 个里，32 个（A+B 档）初筛通过**，34 个（C+D 档）不合格。
- 大量"老版本"（opus-4-5 / sonnet-4 / gemini-3.1-pro / gpt-5.1）直接 0/6——已不可用。
- cursor 家族里 **gpt-5.6-sol/terra、claude-opus-4-7、grok-4.7@500k、gemini-4 系列、muse-spark** 表现最好（A 档）。

⚠️ 说明：初筛只 6 题（工具选择/依赖/坏工具/直答/安全），测的是"JSON 顺从 + 关键路由"，不等于全量质量排名。A+B 档（32 个）可进全量评测；但 66 个全跑全量（35 题）成本巨大——建议先按家族/版本去重（@1m 与 @300k 同模型只跑一个）再全量。

**下一步选项**：①对 A 档 14 个去重后跑全量 35 题；②对 A+B 档 32 个去重后跑全量；③先只挑你关心的家族（如 claude-opus/gpt-5.6/grok）。你要哪个范围？

<!-- MEMORY_FIELDS
{
  "event_name": "cursor全量初筛测试",
  "goal": "初筛cursor模型",
  "summary": "2026-11-14 用户要求重新获取 cursor 全量路由并先做初筛测试。助手拉取 cursor 全量 66 个模型，对每模型跑 6 题初筛（M1-1/M1-3/M1-5/M3-3/M4-3/M4-5，测 JSON 顺从+关键路由），66×6=396 次调用全部完成，结果存 screen-cursor.json。分档：A(6/6)14个、B(5/6)18个、C(4/6)13个、D(≤3/6)21个；32个(A+B)通过初筛，34个(C+D)不合格。",
  "ranges": "37-82",
  "source_extraction_id": "d6af3b8809a949fe968962f4e16109aa",
  "version": 1,
  "memory_type": "events"
}
-->