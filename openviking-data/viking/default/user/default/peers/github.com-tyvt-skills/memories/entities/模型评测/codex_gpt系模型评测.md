# codex/gpt 系模型评测
2026-11-14 对 codex/gpt 系 4 个模型跑 controller-bench 35 题全量评测（4×35=140 combos），结果存 D:\repository\skills\controller-bench\results\bench-codex-full.json，正式报告 CODEX-REPORT-20261114.md（位于 D:\repository\skills\controller-bench\）。

## Description
- 被测模型：gpt-6.1-sol、gpt-6.1-terra、gpt-6-sol、gpt-6-luna（gpt-5.6 全系、gpt-6-astra 已关停下线）
- 有效分（fmt/err 记 0）：gpt-6.1-terra 0.779、gpt-6.1-sol 0.771、gpt-6-sol 0.771、gpt-6-luna 0.769，整体 0.769–0.779
- 均明显弱于 workbuddy/kimi-k3.1-pro（0.849），JSON 干净（几乎不崩）但工具选择判断差
- 计费模型（per-token），性价比不如 workbuddy/kimi-k3.1-pro

## 题型强弱
- 共同短板 M1 工具选择 0.51–0.67：M1-4 纯片段代码生成全判 direct_answer 不走 code_editor（爱直接答、不肯落工具）；M1-5/M1-6 爱加冗余前置 pwsh 步骤拉低效率
- 共同强项 M2 步骤依赖、M4 路由、M10 评审 0.84–0.98；M7 扇出/M8 判读部分满分

## 任务类型适配
- gpt-6-luna（综合最佳）：复杂多步规划、对抗/根因、长上下文判读（M2 0.98、M4 0.97、T对抗 0.79 最高）
- gpt-6.1-terra（效率型）：批量聚合、长日志判读、diff 评审（M5 效率 0.94、M7 1.0、M8 1.0、M10 1.0）
- gpt-6-sol（依赖链+路由）：中等多步任务、坏工具改道（M2 0.91、M4 0.93、M3 0.81 抗坏工具最好）
- gpt-6.1-sol（均衡无突出）：M4 0.92 尚可，最慢 10.9s
- 结论：均不适合作主控 planner 首选（M1 工具选择垫底），适合分工使用


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "模型评测",
  "name": "codex_gpt系模型评测",
  "source_extraction_id": "d6af3b8809a949fe968962f4e16109aa",
  "version": 1,
  "memory_type": "entities"
}
-->