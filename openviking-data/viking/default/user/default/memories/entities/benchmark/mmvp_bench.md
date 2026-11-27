---
audit_status: invalid
last_checked: 2026-11-27T03:51:13+08:00
verdict_note: mmvp_eval.jsonl/models.yaml/vlmeter/Questions.csv 仅命中 skills/memory-migration-archive 与 openviking-data 记忆归档，D-/repository 无数据集、models.yaml 或 vlmeter 源码；关联记忆 vlmeter.md 自身亦记「无源码无法证明」。无法证明有效。
---
# MMVP Benchmark
A multimodal visual perception/proficiency evaluation with 300 image-question pairs.
## Description
- 300 images plus Questions.csv sourced via hf-mirror.com
- Converted to mmvp_eval.jsonl (300 entries: id, question, choices, answer, category, pair_id)
## Evaluation Setup
- models.yaml configures all 13 models exposed by magpie
- Local proxy at 127.0.0.1:3425/v1 with api_key "magpie"
- concurrency: 3, max_tokens: 4096 (4096 eliminated earlier reasoning-model 502 empty replies)
## Tooling
- vlmeter drives eval runs and report generation
- run_workbuddy.py re-runs WorkBuddy-backed models

<!-- MEMORY_FIELDS
{
  "category": "benchmark",
  "name": "mmvp_bench",
  "source_extraction_id": "c9518ee4aefd4c5fa040fab945cced12",
  "version": 1,
  "memory_type": "entities"
}
-->