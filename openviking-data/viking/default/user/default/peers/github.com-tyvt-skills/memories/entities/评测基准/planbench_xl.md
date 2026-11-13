# PlanBench-XL
测工具生态不完美时的长视野规划基准。

## Description
- 包含 327 个零售任务、1,665 个工具。
- 工具不能一次全部可见，需迭代检索，并有阻塞机制模拟工具缺失/失败/干扰。

## Purpose
- 评估工具部分不可用时的规划绕路能力。

## Significance
- 实测：GPT-5.4 无阻塞准确率 51.90%，最严重阻塞降至 11.36%。
- 对应编排器“某工具临时不可用/超时后规划器能否绕路”问题。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "评测基准",
  "name": "planbench_xl",
  "source_extraction_id": "1ce698b76d62418e9cd86dce74fedae1",
  "version": 1,
  "memory_type": "entities"
}
-->