# DSH 编排器 reasoning 模型 max_tokens 过低导致 502
DSH 编排器给 reasoning 模型设置过低 max_tokens 时会触发 502 empty reply，这是 2026-11-12 定位并修复的根因 bug。

## 关键事实
- 根因：reasoning 模型把 token 预算全用于推理（实测需 7.9k–13.4k token），content 未生成即被截断
- 2026-11-12 实测：workbuddy/deepseek-v4.1-flash 在 max_tokens=2048 时 40.8s→502；升到 8192 后 33.8s 输出 2593 字符
- 同次修复：plan_reviewer/planner 升到 8192，pwsh 升到 4096；plan_review 从 ok:false（86s/502）变为 ok:true（46.6s）
- config.yaml L178 注释明示「reasoning 模型 max_tokens 必须大于 reasoning 开销，否则 content 被截断成空回复」，pwsh 主选 deepseek 给 4096、备选 glm 给 1024 正是 11-12 502 根因修复后的差异化配置 (as of 2026-11-13)
- 该 bug 曾导致 planner 两轮各 203s、model=None ok=False 的耗时异常

## 影响
- 配置位于 dsh/langgraph-orchestrator/config.yaml 的模型池与 max_tokens 字段
- 修复后 plan_review 端到端产出 7 条 issue、score 66、reject

## 关系
- 与 tyvt_skills 仓库无直接关系；属于 DSH 运行时编排器配置

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dsh_orchestrator_max_tokens",
  "source_extraction_id": "e937772de43e4bc4aa8d6a405ea7d37e",
  "version": 2,
  "memory_type": "entities"
}
-->