# Summary
2026-11-14 用户要求将 codex 评测结果整理成正式记录文档（含题型矩阵+任务类型适配）。助手创建 CODEX-REPORT-20261114.md（位于 D:\repository\skills\controller-bench\），含总分表、题型×模型矩阵、任务类型适配表、M1 工具选择根因诊断、口径局限。核心结论：codex/gpt 系有效分 0.769–0.779、JSON 干净但工具选择硬短板，适合作分工（gpt-6-luna 规划/对抗、terra 效率/判读、6-sol 坏工具改道），不适合作主控首选。
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

<!-- MEMORY_FIELDS
{
  "event_name": "codex评测报告文档创建",
  "goal": "整理评测记录文档",
  "summary": "2026-11-14 用户要求将 codex 评测结果整理成正式记录文档（含题型矩阵+任务类型适配）。助手创建 CODEX-REPORT-20261114.md（位于 D:\\repository\\skills\\controller-bench\\），含总分表、题型×模型矩阵、任务类型适配表、M1 工具选择根因诊断、口径局限。核心结论：codex/gpt 系有效分 0.769–0.779、JSON 干净但工具选择硬短板，适合作分工（gpt-6-luna 规划/对抗、terra 效率/判读、6-sol 坏工具改道），不适合作主控首选。",
  "ranges": "37-44",
  "source_extraction_id": "d6af3b8809a949fe968962f4e16109aa",
  "version": 1,
  "memory_type": "events"
}
-->