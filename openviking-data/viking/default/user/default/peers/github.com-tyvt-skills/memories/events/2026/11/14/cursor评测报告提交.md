# Summary
2026-11-14，github.com-tyvt-skills 将 cursor 与 codex 评测记录文档整理为 CURSOR-REPORT-20261114.md 与 CODEX-REPORT-20261114.md（含总分表、题型×模型矩阵、任务类型适配表、口径与局限），仅提交两份报告文档（results/*.json 被 .gitignore 忽略、REPORT.md 等遗留脏改动未碰），提交哈希 6f196e88，未推送。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 整理成正式记录文档（含矩阵+适配）并提交
**assistant [peer=github.com-tyvt-skills]**: 写 cursor 评测记录文档（镜像 codex 文档结构），然后用提交。
**assistant [peer=github.com-tyvt-skills]**: 文档已写。提交——本次新增 3 份产出：codex 报告、cursor 报告、cursor 数据文件（bench-cursor-full.json）+ screen-cursor.json + codex 数据。检查 status 只 add 本次相关文件。
**assistant [peer=github.com-tyvt-skills]**: results 目录被 .gitignore 忽略了（数据 json 未跟踪也正常——bench 历史数据之前没提交过）。本次要提交的正式产出是两份报告文档。REPORT.md 是遗留脏改动（非本会话改），不提交。score-t.ps1 是遗留未跟踪，不碰。

只 add 两份报告。
**assistant [peer=github.com-tyvt-skills]**: 已提交 `6f196e88`（未推送）。

## 完成：cursor 评测记录文档已整理并提交

**交付**：[CURSOR-REPORT-20261114.md](D:\repository\skills\controller-bench\CURSOR-REPORT-20261114.md)（连同上一轮的 [CODEX-REPORT-20261114.md](D:\repository\skills\controller-bench\CODEX-REPORT-20261114.md) 一起提交）

**文档内容**（含你要的矩阵 + 适配）：
- 总分表（有效分/名目分/format_error/耗时，10 模型排名）
- 题型 × 模型矩阵（11 类题型 × 10 模型）
- 任务类型适配表（每个模型适合什么、短板什么）
- 口径与局限（去重说明、单轮计划产出、M9 非真看图、计费）

**核心结论**：
- cursor 头部 **grok-4.7@500k(0.820) / gpt-5.4-mini(0.809) / claude-opus-4-7(0.803)** 接近 workbuddy/kimi-k3.1-pro(0.849)
- **推荐组合**：grok-4.7@500k 综合主力、gpt-5.4-mini 效率/扇出/对抗、claude-opus-4-7 工具选择/路由、dsv41-flash-1017 最快(4.0s)
- **名目分骗人**：gemini-4-hydrogen/gpt-5.3-codex/gpt-5.4-nano 名目 0.79-0.82 但 5-7 题 JSON 污染，有效分掉到 0.64-0.67

**提交**：`6f196e88`，仅含两份报告文档（results/*.json 数据被 .gitignore 忽略、REPORT.md 等遗留脏改动未碰），未推送。

要推送请说。下一步是否要把这批 cursor 头部模型纳入编排器池做影子对照？

<!-- MEMORY_FIELDS
{
  "event_name": "cursor评测报告提交",
  "goal": "记录评测报告交付",
  "summary": "2026-11-14，github.com-tyvt-skills 将 cursor 与 codex 评测记录文档整理为 CURSOR-REPORT-20261114.md 与 CODEX-REPORT-20261114.md（含总分表、题型×模型矩阵、任务类型适配表、口径与局限），仅提交两份报告文档（results/*.json 被 .gitignore 忽略、REPORT.md 等遗留脏改动未碰），提交哈希 6f196e88，未推送。",
  "ranges": "0-12",
  "source_extraction_id": "b6d257e6cd1a4f8692fd66173eb05217",
  "version": 1,
  "memory_type": "events"
}
-->