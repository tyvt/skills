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