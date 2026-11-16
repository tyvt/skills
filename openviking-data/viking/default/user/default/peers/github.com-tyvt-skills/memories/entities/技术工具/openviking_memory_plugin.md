# OpenViking dsh-memory-plugin
DSH 的记忆注入插件（外部包 @openviking/dsh-memory-plugin），负责 profile 注入与按需记忆召回，不在 skills 仓库内、无法直接改代码。

## 配置项
- web profile 的 dsh/profiles/web/cordis.patch.yml 可调 recallMaxTokens（默认 2200）、scoreThreshold、recallDedupTurns、skipSubagentSessions 等召回参数。
- 每步注入的 available-memories 目录清单由插件行为决定，不受上述召回配置控制。

## 成本影响
- 目录清单（数百行）默认每步全量注入，构成每步固定上下文的一部分。
- 2026-11-16 审计将其列为 P0-1 优化项（改为按需 memory_recall），但仓库内不可落地，需改外部包。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术工具",
  "name": "openviking_memory_plugin",
  "source_extraction_id": "32c920e17f2d469aa04dfc739405acc7",
  "version": 1,
  "memory_type": "entities"
}
-->