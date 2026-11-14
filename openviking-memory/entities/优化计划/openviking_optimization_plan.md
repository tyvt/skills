# openviking 优化计划
OpenViking 优化计划是记录成本与可观测性优化方案、验收标准及实施安排的规划文档。

## 基本信息
- 文件：.plan/openviking-optimization-20261113.md；2026-11-13 置 approved / human_confirmed: true（修订后通过，原 11 条 P1/P2 意见）。
- 2026-11-12 用户选择仅规划，未改配置或脚本。

## 实施顺序
- 顺序 A 可观测性（A0 caller 埋点为 B 的进入 gate）→ B 成本 → C 行为。
- B2 保留定时路径 feature flag + 漏抽检测。

## 验收标准
- A：错误明细零缺口，404/409 零新增。
- B：hy3 24h 日均 token 降 ≥70%、深夜归零、p50 不超 A0 基线×1.1，灰度命中率降 >10% 即回滚。
- C：前后对照 10 会话基线。

## 实施安排
- A0/A1/A3 改插件源码（目标 0.5.32，worktree+分支）；源码仓不在 D:\repository 顶层，候选 ~/.dsh/patches。
- B1 的 ov.conf 改动需重启服务，选低峰执行。
- 本会话成本 157k；建议下个会话按计划开始阶段 A。

<!-- MEMORY_FIELDS
{
  "category": "优化计划",
  "name": "openviking_optimization_plan",
  "source_extraction_id": "1e2b4cea7fe14fe9a7d115375b59a1a3",
  "version": 1,
  "memory_type": "entities"
}
-->