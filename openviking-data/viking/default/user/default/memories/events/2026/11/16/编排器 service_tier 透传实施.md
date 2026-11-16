# Summary
2026-11-16 在 DSH 编排器落地 service_tier 透传：基于 openai SDK 2.54.0 原生支持 service_tier（keyword-only），langgraph-orchestrator 的 config.py 为 ModelSpec 增加 service_tier 字段并在 load_config 中解析，router.py 的 _call_once 做条件透传（None 不发），config.yaml 中 plan_reviewer/verifier 两处 cursor/grok-4.7@256k 配置 service_tier: priority，mini 不加；确认 src 内 completions.create 仅 router.py:162 一处，无旁路。
# 2026-11-16 (Monday) ChatLog:
**user**: ...②DSH 编排器实施——openai SDK 2.54.0 原生支持 service_tier（keyword-only）；langgraph-orchestrator config.py ModelSpec 加 service_tier 字段+load_config 解析，router.py _call_once 条件透传（None 不发），config.yaml plan_reviewer/verifier 两处 cursor/grok-4.7@256k 加 service_tier: priority（mini 不加）；...

<!-- MEMORY_FIELDS
{
  "event_name": "编排器 service_tier 透传实施",
  "goal": "实现 service_tier 条件透传",
  "summary": "2026-11-16 在 DSH 编排器落地 service_tier 透传：基于 openai SDK 2.54.0 原生支持 service_tier（keyword-only），langgraph-orchestrator 的 config.py 为 ModelSpec 增加 service_tier 字段并在 load_config 中解析，router.py 的 _call_once 做条件透传（None 不发），config.yaml 中 plan_reviewer/verifier 两处 cursor/grok-4.7@256k 配置 service_tier: priority，mini 不加；确认 src 内 completions.create 仅 router.py:162 一处，无旁路。",
  "ranges": "2-3",
  "source_extraction_id": "41d5fdf69bc440fc9aeeb6fc6d471503",
  "version": 1,
  "memory_type": "events"
}
-->