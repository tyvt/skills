# OrchestrationBench
一个将规划评估与工具执行评估分离的基准测试。

## Description
- 覆盖 17 个领域、近 100 个虚拟工具。
- 题目要求模型产出顺序/并行工作流并遵守业务约束。

## Purpose
- 最适合评估“纯规划”能力。
- 其结构可借用为“工作流规划 + 约束遵守”题目设计主控测试。

## Significance
- 重要发现：模型间 function calling 表现相对一致，但规划能力差异巨大。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "评测基准",
  "name": "orchestrationbench",
  "source_extraction_id": "1ce698b76d62418e9cd86dce74fedae1",
  "version": 1,
  "memory_type": "entities"
}
-->