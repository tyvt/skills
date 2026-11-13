# controller-bench
为编排器主控模型评测构造的轻量本地测试集。

## Description
- 包含 25 题，5 类：工具选择准确性（含误导命名）、多步计划顺序依赖、工具噪声与坏工具鲁棒性、路由决策（走工具/直接答/拒绝）、计划效率。
- 每题带 rubric 与四维评分权重（工具选择 0.35 / 完整性 0.25 / 路由校准 0.25 / 效率 0.15）。

## Purpose
- 用自身工具生态重写题目，批量测试哪个模型适合做主控。

## Significance
- 由已有 T1–T7 改造与 planner 归因样本复用而成，比学术基准更贴真实瓶颈。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "本地测试集",
  "name": "controller_bench",
  "source_extraction_id": "1ce698b76d62418e9cd86dce74fedae1",
  "version": 1,
  "memory_type": "entities"
}
-->