# workflow
workflow 是 DSH 的大规模编排工具，支持 agent(prompt,{provider,model}) 派发异构模型子代理。

## 启用状态
- cordis.patch.yml 的 preset-standard 内 tool-workflow 于 2026-11-14 批 2 加 disabled: true，每步省 848 token（已实测验证）；2026-11-24 复核为全部预设禁用。
- full-tools 预设共 46 个工具、原保留 tool-workflow；11-14 改动有备份 .bak-p1b-20261114152151 可供恢复参照。

## 使用与成本
- 全库仅 41 次调用，使用率 0.7%；最大单一用户会话 20.48M 等效、604 步、含 35 次 workflow 调用，仍未压住成本。
- 判定为负收益（0.7% 使用率 × 848 token/步常驻 + 实测用户更贵），禁用合理并保持。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "agent工具",
  "name": "workflow",
  "source_extraction_id": "5539e03095a24a4f958538efd0ab1743",
  "version": 1,
  "memory_type": "entities"
}
-->