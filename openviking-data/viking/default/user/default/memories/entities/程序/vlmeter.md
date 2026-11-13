# vlmeter
Accuracy × cost VLM evaluation pipeline tool that runs one dataset across multiple models and auto-generates comparison reports.

## Basic Info
- Version 0.6.0, installable via pip
- Native classification task support (option matching); MMVP A/B choices convert directly to its format
- Supports OpenAI-compatible, Anthropic, Google Gemini, Ollama local models; model config in config/models.yaml
- Single-item JSONL requires id, image, question, options, answer fields
- Classification eval is exact option-letter match, no judge needed

## CLI
- Subcommands: run (batch), list-models, report (aggregates cached per-model results into comparison)
- run with --models model-a,model-b runs multiple models in parallel (each with own concurrency semaphore)
- Output in results/ Markdown: total accuracy, per-task accuracy, error samples, cost/performance tradeoff table
- Default timeout 120s; magpie gateway max_concurrent=8, so total concurrency must be ≤8
- report 的 --models 过滤器仅匹配内置注册表名；自定义多路由 key（如 auto/deepseek-v4.1-flash）需加 --registry 才能识别（真实 key 如 cursor/grok-4.7@256k 带 @256k 后缀）

## 2026-11-09 MMVP Run
- Evaluated 13 image models on MMVP; background launcher failed (pwsh not on PATH inside wrapper) → ran loop inline; per-call latency ~4-7s (hy4 peaks 27s), 13×300 est ~1-1.5h under magpie 8-cap
- auto/hy4free: 34/153 errors (HTTP 502, reasoning model burning max_tokens=2048 returning empty); vlmeter retries 3× fails; resume logic (lines 251-264) drops errored lines, retries on restart, killing/restarting safe, completed items preserved
- Fix: raised max_tokens to 8192 → auto/hy4free errors 34→3 (84.8% on first 60); at 8192 reasoning used full budget: latency ~49s avg, throughput ~0.16/s, ~3-4h total
- Cut to max_tokens=4096 + concurrency 8 → still ~0.02-0.03 items/s for auto/hy4free (p50 only 6.9s) → magpie serializing/throttling hy4 route, concurrency=8 not helping
- Parallel test: auto/hy3 (83.3% accuracy) + workbuddy/deepseek-v4.1-flash each 60/60, 0 errors, parallel full speed → magpie limit per-route (~1-2 slots), not global; cross-route parallel multiplies throughput
- Decision: lower per-model concurrency to 3, orchestrate routes in parallel; PowerShell 5.1 no ForEach-Object -Parallel, pwsh 7 not on PATH → single Python orchestrator, up to 6 route-groups parallel
- workbuddy/* shares rate-limited WorkBuddy backend (429 at 2026-11-10 08:37:56 UTC+8); workbuddy-ai/* separate; stopped orchestrator, killed lingering child processes, relaunched 10 routes (auto, cursor, workbuddy-ai, minimax-code, autoclaw-cn)
- 90s check: auto/hy4free 171→217 (0 errors after 4096+lower concurrency), minimax 99, autoclaw 70, workbuddy-ai/hy4free 13 done; workbuddy/hy4free 33 errors 0 success (429)
- 2026-11-09 续跑：10 路由跑满 300 行、7/10 干净；排除 hy3（不支持识图）与 hy4free（502 稳定失败）变体，有效视觉模型 6 个完成 + workbuddy/deepseek-v4.1-flash（次日补跑）
- User scheduled 2026-11-10 09:00 local automated follow-up (run_workbuddy.py + regenerate full 13-model report); report needs --registry for custom keys, computes authoritative comparison from result JSONL

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "vlmeter",
  "source_extraction_id": "e9bbb5fc9fe84cc8b7906037ebb25f31",
  "version": 6,
  "memory_type": "entities"
}
-->