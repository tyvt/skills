# DSH
DSH 是一个“一切皆插件”的 AI 代理系统，工具、技能、会话、沙箱、agent 循环、子 agent、工作流、UI 均可插拔。

## Description
- 设计原则：用插件/钩子替代文字约束，减少每轮上下文成本
- 用户配置位于 ~/.dsh/AGENTS.md（符号链接到 dsh/AGENTS.md）
- 技能目录 ~/.dsh/skills，包含 zentao-analyzer、dsh-token-policy 等

## Key Facts
- 上一轮成本复盘指出 200k 量级浪费来自把可确定性执行的事写成文字
- P0 已落地：AGENTS.md 瘦身、zentao-analyzer 拆分、禁止项写入常驻层

## Relations
- 包含 zentao-analyzer skill（入口+references）
- 包含 dsh-token-policy skill（Token与编排策略）
- 规划 szfc 项目专属插件包与 zentao 通用插件包

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "program",
  "name": "dsh",
  "source_extraction_id": "2ca078caa8e64070bda00022bb082ae8",
  "version": 1,
  "memory_type": "entities"
}
-->