# vlmeter
Accuracy × cost VLM evaluation pipeline tool that runs one dataset across multiple models and auto-generates comparison reports.

## Basic Info
- Version 0.6.0, installable via pip
- Native classification task support (option matching); MMVP A/B choices convert directly to its format
- Supports OpenAI-compatible, Anthropic, Google Gemini, and Ollama local models; model config in config/models.yaml
- Single-item JSONL requires id, image, question, options, answer fields
- Classification eval is exact option-letter match, no judge needed

## CLI
- Subcommands: run (batch), list-models, report (aggregates cached per-model results into comparison)
- run with --models model-a,model-b runs multiple models in parallel (each with own concurrency semaphore)
- Output in results/ Markdown: total accuracy, per-task accuracy, error samples, cost/performance tradeoff table
- Default timeout 120s; magpie gateway max_concurrent=8, so total concurrency must be ≤8
- report 的 --models 过滤器仅匹配内置注册表名；自定义多路由 key（如 auto/deepseek-v4.1-flash）需加 --registry 才能识别（真实 key 如 cursor/grok-4.7@256k 带 @256k 后缀）

## 2026-11-09 MMVP Run
- Used to evaluate 13 image models exposed by magpie on MMVP pairing accuracy
- Background launcher failed: pwsh -File nested but pwsh not on PATH inside background wrapper; ran loop inline instead
- Per-call latency ~4-7s (hy4 peaks 27s); 13×300 run estimated ~1-1.5h under magpie 8-concurrency cap
- After ~12 min only auto/hy4free half-done (151/300), ~0.2 items/s, far below theoretical throughput
- 34 errors among auto/hy4free's 153 entries: magpie dropping calls at concurrency 8
- Errors are HTTP 502: auto/hy4free is a reasoning model burning max_tokens=2048 on reasoning, returning empty; vlmeter retries 3× but fails
- vlmeter resume logic (lines 251-264) drops errored lines and retries on restart; killing/restarting safe, completed items preserved
- Fix: raised max_tokens to 8192 for all models (harmless for non-reasoning) and restarted sequential run
- Validation: auto/hy4free errors dropped 34 → 3 (84.8% accuracy on first 60); the 3 retried successfully → 0 errors
- At max_tokens=8192 reasoning model used full budget: latency ~49s avg (vs 6.7s at 2048), throughput ~0.16/s, ~3-4h total
- Cut max_tokens to 4096 + concurrency 8 to halve per-call time while keeping truncation low; resumed from 155 completed auto/hy4free items
- Throughput stayed ~0.02-0.03 items/s for auto/hy4free regardless of max_tokens — far below theoretical 8/16.8s
- Critical: auto/hy4free p50 latency only 6.9s yet throughput ~0.03/s → magpie serializing/throttling the hy4 route, concurrency=8 not helping
- Decision: kill sequential loop, run parallel test with two fast models from different backends (auto/cursor/workbuddy/minimax/autoclaw) to check independent capacity
- Parallel capacity test: auto/hy3 and workbuddy/deepseek-v4.1-flash each ran 60/60 with 0 errors (auto/hy3 83.3% accuracy) in parallel at full speed → magpie limit is per-route (~1-2 slots each), not a single global cap; cross-route parallel multiplies throughput; earlier slow auto/hy4free was just the reasoning model being slow + flooded at concurrency 8 (timeouts)
- Fix decision: lower per-model concurrency to 3 (avoids timeout floods) and orchestrate across routes in parallel
- PowerShell is 5.1 (no ForEach-Object -Parallel) and pwsh 7 not on PATH for Start-Process → used a single Python orchestrator running each route-prefix as its own sequential group, up to 6 groups in parallel (different routes → independent magpie capacity), auto-generating the combined report
- Orchestrator launched as one background job; ~90s sanity check showed most routes healthy: auto/hy4free 171→217 (0 errors after 4096 + lower concurrency fixed the empty-reply 502s), minimax 99 done, autoclaw 70 done, workbuddy-ai/hy4free 13 done
- workbuddy/hy4free showed 33 errors and 0 successes → critical: hitting 429 RateLimitError from WorkBuddy backend ("使用已超出频率限制"), resetting at 2026-11-10 08:37:56 (UTC+8)
- Clarification: only the workbuddy/* prefix (workbuddy/hy4free, workbuddy/hy3, workbuddy/deepseek-v4.1-flash) shares the rate-limited WorkBuddy backend; workbuddy-ai/* is a separate backend and works → 10 of 13 models runnable now, 3 workbuddy models blocked until 2026-11-10 08:37
- Stopped the orchestrator (wasting cycles 429-ing), killed lingering vlmeter child processes, relaunched with 10 routes (auto, cursor, workbuddy-ai, minimax-code, autoclaw-cn)
- User chose to run the 3 WorkBuddy models after the reset and merge; scheduled automated follow-up for 2026-11-10 09:00 local to run run_workbuddy.py + regenerate the full 13-model report in a fresh session
- 2026-11-09 续跑：10 路由全部跑满 300 行、7/10 干净；按用户要求排除 hy3（不支持识图）与 hy4free（502 稳定失败）全部变体，有效视觉模型为 6 个已完成 + workbuddy/deepseek-v4.1-flash（次日补跑）；报告需 --registry 识别自定义 key，并直接从结果 JSONL 计算权威对比（含排除项）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "vlmeter",
  "source_extraction_id": "2964d220700b470b82c317fc5639a34d",
  "version": 5,
  "memory_type": "entities"
}
-->