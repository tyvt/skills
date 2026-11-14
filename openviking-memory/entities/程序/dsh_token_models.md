# dsh-token-models
DSH 的 token 模型展示插件，在 Models 面板（含编排器区块）展示各模型用量与耗时统计。

## Description
- 插件 dsh-token-models，提供 Models 面板，内含编排器（orchestrator）区块，展示每模型 Token 与耗时统计
- 2026-11-12 起，编排器区块新增「累计耗时」列，按模型展示总计耗时

## 实现结构
- lib/index.js 的 aggregate() 聚合 .costs 计算每模型总计耗时（elapsedSec 合计）
- lib/client.js 的 rowsFromOrchestrator 透传 elapsedSec 字段给前端
- OrchestratorSection 组件新增「累计耗时」列，格式化函数 fmtDur：<60s 显示一位小数，≥60s 显示 Xm Ys；中英文案键为 orchElapsed
- 会话账单 JSONL 每行 elapsed（秒）记为 elapsedSec（含 total.elapsedSec），供上述模块读取聚合

## 提交状态
- 计划经 grok-4.7 审核 approve 并人工确认（.plan/token-models-elapsed.md）
- 已提交 D:\repository\skills main 分支（feat(token-models): 编排器面板新增每模型累计耗时列），未推送 (as of 2026-11-12)

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_token_models",
  "source_extraction_id": "945cecf51a1c40d0899dd8c18bb5144f",
  "version": 1,
  "memory_type": "entities"
}
-->