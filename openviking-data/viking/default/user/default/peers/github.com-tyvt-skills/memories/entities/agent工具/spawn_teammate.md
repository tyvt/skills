# spawn_teammate
spawn_teammate 是 DSH 会话内拉起 teammate 子代理、对多对象并行扇出的工具，成员继承 Lead 模型且不支持 per-spawn 换模型。

## 启用状态
- 所属 tool-subagent / tool-subagent-control / tool-subagent-list-agents / tool-subagent-fork 组在 cordis.patch.yml 全部预设中均 disabled（截至 2026-11-24），会话工具目录里没有该工具。
- 2026-11-14 批 2 验证时 standard 会话仍保留该工具；2026-11-24 已不可用，可能是之后又做过裁剪，或本会话跑在更精简的 preset 上。

## 实测成本（2026-11-24，1348 个会话投影缓存）
- 真实建团会话（agentTeam.tasks>0）35 个（2.6%）：均 253 步、均等效 16.0k/步、缓存命中率 0.925、等效中位 2059k、P90 13.6M。
- 对照：只用 orchestrate 组 267 会话 8.9k/步、命中 0.957、中位 672k；纯串行组 751 会话 11.1k/步、命中 0.869、中位 464k。
- 建团组每步成本比串行组高约 45%：子代理为独立上下文，系统提示与工具目录每步全量重放，父会话还要轮询收结果。
- 35 个建团会话共 112 个扇出任务，spawn_teammate 调用中位仅 1~8 次，扇出是叠加在主循环上而非替代。

## 判定与替代
- 理论上是多对象并行首选，但实测单步成本未降反升、大任务缺受控对照，现状禁用可接受。
- 数据推荐的替代路径为 orchestrate {op:"full"}（编排器内部并行）或窄命令分批处理。
- 2026-11-12 报告的「79% 大会话零编排」结论仍成立。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "agent工具",
  "name": "spawn_teammate",
  "source_extraction_id": "5539e03095a24a4f958538efd0ab1743",
  "version": 1,
  "memory_type": "entities"
}
-->