# OpenViking 成本优化计划
OpenViking 的成本排查结论与已批准的成本优化落地计划，文档位于 .plan/openviking-optimization-20261113.md。

## 用量与成本测量
- 2026-11-04→11-12 共 1032 次 API 请求（97.2% 为 200），错误含 22×404、2×409、2×405 和 8 次 find 检索错误
- 检索延迟：search p50 5.2s / p90 7.0s / p99 11.9s / max 51.4s，find 单次约 50s
- VLM（auto/hy3）累计 38.0M input + 31.8M output token；query_planner 每次 search 改写查询、约 17 万 token/search，为最大成本与最慢路径（ov.conf 只配 vlm=auto/hy3，query_planner 默认继承）；凌晨 0–6 点仍稳定约 100k+ token/小时，与业务量脱钩，疑为常驻/定时抽取或查询改写空转
- 2026-11-13 决定性证据：DSH 插件每 turn 自动召回 → 凌晨无人时段每小时仍 9–26 次 search（UTC 03 时 22 次），同步 9k in+9k out/次 VLM；UTC 13 时检索为 0 但仍有 hy3 38k+9.6k token，说明后台记忆抽取是第二来源；27h 窗口 hy3 合计 1.84M in + 1.67M out（≈130k tok/h），按 3/15 元每 M 估算 ≈¥31/天，bge-m3 本地零成本

## 计划状态
- 计划于 2026-11-13 置 approved / human_confirmed: true（修订后通过，原带 11 条 P1/P2 意见）；2026-11-12 用户选择仅规划、未改配置或脚本
- 落地顺序 A 可观测性（A0 caller 埋点为 B 的进入 gate）→ B 成本 → C 行为；B2 保留定时路径 feature flag + 漏抽检测

## 验收与实施
- 验收：A 阶段错误明细零缺口、404·409 零新增；B 阶段 hy3 24h 日均 token 降 ≥70%、深夜归零、p50 不超 A0 基线×1.1、灰度命中率降 >10% 即回滚；C 阶段前后对照 10 会话基线
- 实施：A0/A1/A3 改插件源码（目标 0.5.32，worktree+分支），源码仓不在 D:\repository 顶层，候选 ~/.dsh/patches；B1 的 ov.conf 改动需重启服务，选低峰执行
- 2026-11-13 该会话成本已 157k，建议下个会话按该计划开始阶段 A

<!-- MEMORY_FIELDS
{
  "category": "成本优化计划",
  "name": "openviking_cost_optimization",
  "source_extraction_id": "17fd692800474b548a994e2694ff1bca",
  "version": 1,
  "memory_type": "entities"
}
-->