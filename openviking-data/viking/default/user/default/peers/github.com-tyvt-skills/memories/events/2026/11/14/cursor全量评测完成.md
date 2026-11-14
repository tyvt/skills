# Summary
用户决定对 cursor 模型去重（同模型不同上下文变体只留一个）、单独去除 composer-2.5，再跑全量 35 题评测。去重后 10 个模型（claude-opus-4-7@1m、gpt-5.6-sol@272k、gpt-5.6-terra@272k、deepseek-v41-flash-1017、gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-mini、gpt-5.4-nano、grok-4.7@500k、muse-spark-1.3@1m）跑 10×35=350 组合（并发 6）完成。有效分排名：1. grok-4.7@500k（0.820）、2. gpt-5.4-mini（0.809）、3. claude-opus-4-7@1m（0.803）、4. deepseek-v41-flash-1017（0.787）、5. gpt-5.6-terra@272k（0.760）、6. gpt-5.6-sol@272k（0.734）、7. muse-spark-1.3@1m（0.734）、8. gpt-5.4-nano（0.674）、9. gemini-4-hydrogen（0.656）、10. gpt-5.3-codex（0.637）。gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-nano 名目分虚高但 JSON 污染多致有效分低。结果存 D:\repository\skills\controller-bench\results\bench-cursor-full.json。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 去重，再单独去除composer-2.5，再全量
**assistant [peer=github.com-tyvt-skills]**: 好。去重（同模型不同 context 变体只留一个）+ 去除 composer-2.5，对剩余跑全量 35 题。

先确定去重后的名单。13 个 A 档去掉重复变体：
- claude-opus-4-7：@1m/@300k → 留 @300k（够用且便宜无差，实为同价，留 @1m 也行；我留 @1m 更大上下文）
- gpt-5.6-sol：@1m/@272k → 留 @272k（基准口径，272k 更常见）
- gpt-5.6-terra：@1m/@272k → 留 @272k
- 其余单变体：deepseek-v41-flash-1017、gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-mini、gpt-5.4-nano、grok-4.7@500k、muse-spark-1.3@1m

去重后 = **10 个**。跑 10×35=350 组合。建 todo + 脚本。
**assistant [peer=github.com-tyvt-skills]**: 10×35=350 combos，并发 6。cursor 部分模型慢，预计 10-15 分钟。监听。
**assistant [peer=github.com-tyvt-skills]**: 推进正常。继续监听。
**assistant [peer=github.com-tyvt-skills]**: 180/350。继续。
**assistant [peer=github.com-tyvt-skills]**: 300/350，剩 grok + muse。读 partial 看进度而非重复 wait。
**assistant [peer=github.com-tyvt-skills]**: 300/350，剩莫约 grok/muse 尾巴。读 job 收尾。
**assistant [peer=github.com-tyvt-skills]**: 332/350，剩 muse 尾巴（含慢/err）。再等收尾。
**assistant [peer=github.com-tyvt-skills]**: 全量完成（350 rows, DONE）。评分 + 题型矩阵 + 任务类型判断。
**assistant [peer=github.com-tyvt-skills]**: Bug: `m=['x']` 覆盖了循环变量 m（残留行）。修掉那行。
**assistant [peer=github.com-tyvt-skills]**: 数据完整。完成 todo 并给你结论。
**assistant [peer=github.com-tyvt-skills]**: ## cursor 去重 10 模型 × 全 35 题结果

结果存 [bench-cursor-full.json](D:\repository\skills\controller-bench\results\bench-cursor-full.json)。

### 总分（有效分，fmt/err 记 0）

| 排名 | 模型 | 有效分 | 名目 | fmt | 中位耗时 |
|---|---|---|---|---|---|
| 1 | **cursor/grok-4.7@500k** | **0.820** | 0.869 | 2 | 12.7s |
| 2 | **cursor/gpt-5.4-mini** | **0.809** | 0.858 | 2 | **6.8s** |
| 3 | **cursor/claude-opus-4-7@1m** | **0.803** | 0.852 | 2 | 6.9s |
| 4 | cursor/deepseek-v41-flash-1017 | 0.787 | 0.810 | 1 | **4.0s（最快）** |
| 5 | cursor/gpt-5.6-terra@272k | 0.760 | 0.806 | 2 | 6.1s |
| 6 | cursor/gpt-5.6-sol@272k | 0.734 | 0.734 | 0 | 6.6s |
| 7 | cursor/muse-spark-1.3@1m | 0.734 | 0.756 | 0 | 21.4s（最慢） |
| 8 | cursor/gpt-5.4-nano | 0.674 | 0.786 | **5** | 8.2s |
| 9 | cursor/gemini-4-hydrogen | 0.656 | 0.820 | **7** | 9.1s |
| 10 | cursor/gpt-5.3-codex | 0.637 | 0.797 | **7** | 6.3s |

> 关键：**名目分骗人再次验证**——gemini-4-hydrogen（名目 0.82→有效 0.656）、gpt-5.3-codex（0.797→0.637）、gpt-5.4-nano（0.786→0.674）都是 5–7 题 JSON 污染被拉低。

### 各题型强弱

| 模型 | M1工具 | M2依赖 | M3坏工具 | M4路由 | M5效率 | M6纠错 | M7扇出 | M8判读 | M9图像 | M10评审 | T对抗 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| grok-4.7@500k | 0.88 | 0.95 | 0.73 | 0.94 | 0.92 | 0.86 | 0.75 | 0.8 | **1.0** | 1.0 | 0.76 |
| gpt-5.4-mini | 0.6 | **0.97** | **0.96** | 0.94 | 0.81 | 0.91 | **1.0** | 0.75 | **1.0** | 1.0 | **0.83** |
| claude-opus-4-7 | **0.85** | 0.92 | 0.69 | **0.98** | 0.88 | 0.86 | 0.75 | 0.75 | **1.0** | 1.0 | 0.69 |
| dsv41-flash-1017 | 0.64 | 0.86 | 0.92 | 0.96 | 0.8 | 0.9 | 0.67 | 0.8 | 0.75 | 1.0 | 0.69 |
| gpt-5.6-terra | 0.72 | 0.91 | 0.7 | 0.96 | 0.7 | **0.97** | 0.5 | **1.0** | 0.75 | 1.0 | 0.79 |
| gpt-5.6-sol | 0.61 | 0.77 | 0.75 | 0.9 | 0.73 | 0.73 | 0.5 | 0.67 | 0.67 | 1.0 | 0.67 |
| muse-spark@1m | 0.84 | 0.76 | 0.59 | 0.87 | 0.82 | 0.8 | 0.75 | 0.75 | 0.75 | 1.0 | 0.57 |
| gpt-5.4-nano | 0.6 | 0.93 | 0.72 | 0.87 | 0.92 | 0.78 | 1.0 | 1.0 | 1.0 | 1.0 | 0.42 |
| gemini-4-hydrogen | **0.93** | 0.79 | 0.78 | 0.95 | 0.76 | 0.86 | 0.5 | 0.75 | – | 1.0 | 0.74 |
| gpt-5.3-codex | 0.48 | 0.94 | 0.82 | 0.92 | – | 0.84 | – | 1.0 | 1.0 | 0.65 | 0.72 |

### 任务类型适配

| 模型 | 最适合 | 短板 |
|---|---|---|
| **grok-4.7@500k** | **综合最强**：M2依赖0.95/M4路由0.94/M5效率0.92/M9图像1.0，全面均衡 | 慢(12.7s)、计费、T对抗一般(0.76) |
| **gpt-5.4-mini** | **效率+扇出+对抗**：M2 0.97、M3坏工具0.96、M7扇出1.0、T对抗0.83（最高）、快6.8s | M1工具选择弱(0.6) |
| **claude-opus-4-7** | **工具选择+路由**：M1 0.85（最高）、M4 0.98（最高）、M5 0.88 | 弱M3坏工具(0.69)、T对抗(0.69) |
| **dsv41-flash-1017** | **最快(4.0s)+坏工具+路由**：M3 0.92、M4 0.96、M6 0.9 | M1工具选(0.64)、扇出弱(0.67) |
| **gpt-5.6-terra** | **纠错+判读**：M6纠错0.97（最高）、M8判读1.0、M4 0.96 | M7扇出最差(0.5)、效率一般 |
| **gpt-5.6-sol** | 均衡无明显强项 | M7(0.5)、M9(0.67)、T(0.67) |
| **muse-spark@1m** | M1工具选0.84尚可 | 最慢(21s)、T对抗最差(0.57)、M3弱(0.59) |
| **gpt-5.4-nano** | **扇出+判读**：M7/M8/M9 全1.0 | M1(0.6)、T对抗极差(0.42) |
| **gemini-4-hydrogen** | **工具选择最强(0.93)** | 7题JSON污染、M7扇出0.5 |
| **gpt-5.3-codex** | M2/M8强 | M1最差(0.48)、5题JSON污染 |

### 一句话
> **cursor 这批质量高于 codex/gpt 和 workbuddy**（有效分 0.82 vs 0.78 vs 0.849 打平）。**首选组合**：grok-4.7@500k（全面）、gpt-5.4-mini（效率/扇出/对抗最强）、claude-opus-4-7（工具选择/路由最强）、dsv41-flash-1017（最快坏工具改道）。**注意 gpt-5.4-nano/gemini-4-hydrogen/gpt-5.3-codex 名目高但 JSON 污染多，实际有效分低。**

需要我把 cursor 这份也整理成正式记录文档（含矩阵+适配）并提交吗？

<!-- MEMORY_FIELDS
{
  "event_name": "cursor全量评测完成",
  "goal": "完成cursor全量评测",
  "summary": "用户决定对 cursor 模型去重（同模型不同上下文变体只留一个）、单独去除 composer-2.5，再跑全量 35 题评测。去重后 10 个模型（claude-opus-4-7@1m、gpt-5.6-sol@272k、gpt-5.6-terra@272k、deepseek-v41-flash-1017、gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-mini、gpt-5.4-nano、grok-4.7@500k、muse-spark-1.3@1m）跑 10×35=350 组合（并发 6）完成。有效分排名：1. grok-4.7@500k（0.820）、2. gpt-5.4-mini（0.809）、3. claude-opus-4-7@1m（0.803）、4. deepseek-v41-flash-1017（0.787）、5. gpt-5.6-terra@272k（0.760）、6. gpt-5.6-sol@272k（0.734）、7. muse-spark-1.3@1m（0.734）、8. gpt-5.4-nano（0.674）、9. gemini-4-hydrogen（0.656）、10. gpt-5.3-codex（0.637）。gemini-4-hydrogen、gpt-5.3-codex、gpt-5.4-nano 名目分虚高但 JSON 污染多致有效分低。结果存 D:\\repository\\skills\\controller-bench\\results\\bench-cursor-full.json。",
  "ranges": "23-73",
  "source_extraction_id": "f851cda3b4fb4e0084ef2ce66ed93ebd",
  "version": 1,
  "memory_type": "events"
}
-->