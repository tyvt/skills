# TPS-Bench
测调度效率而非仅选对工具的复合任务基准。

## Description
- 核心是复合任务下的工具规划与调度。
- 评估指标同时看任务完成率和效率（时间、token）。

## Purpose
- 衡量规划器在选对工具后决定执行顺序的效率。

## Significance
- 实测：GLM-4.5 完成率 64.72% 但平均 217.8s/14k token；GPT-4o 偏好并行但完成率 45.08%。
- 对主控选型关键：计划正确但啰嗦 vs 计划略糙但极快价值不同。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "评测基准",
  "name": "tps_bench",
  "source_extraction_id": "1ce698b76d62418e9cd86dce74fedae1",
  "version": 1,
  "memory_type": "entities"
}
-->