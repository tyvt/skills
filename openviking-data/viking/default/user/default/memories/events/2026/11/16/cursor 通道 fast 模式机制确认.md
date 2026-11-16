# Summary
2026-11-16 确认 magpie cursor 通道 Fast 模式的实现机制：opencode-cursor-auth@0.2.48 的 index.mjs:3600-3601 读取请求 service_tier（priority/fast 开启，其他关闭），:1210 落变体参数 fast=true，:1165 的 fastAt 由 Cursor 账号侧决定；网关 /v1/models 中 8 个带 @ 上下文后缀的 cursor 模型带 service_tiers=[priority]（1.5x 速度），而 gpt-5.4-mini 与 deepseek-v41-flash-1017 没有 fast 档。
# 2026-11-16 (Monday) ChatLog:
**user**: 2026-11-16，magpie cursor 通道接入 Fast 模式落地：①机制——opencode-cursor-auth@0.2.48 index.mjs:3600-3601 读请求 service_tier（priority/fast 开，其他关），:1210 落变体参数 fast=true，:1165 fastAt 由 Cursor 账号侧决定；网关 /v1/models 中 8 个带 @ 上下文后缀的 cursor 模型带 service_tiers=[priority]（1.5x 速度），gpt-5.4-mini 与 deepseek-v41-flash-1017 无 fast 档。...

<!-- MEMORY_FIELDS
{
  "event_name": "cursor 通道 fast 模式机制确认",
  "goal": "确认 fast 模式触发机制",
  "summary": "2026-11-16 确认 magpie cursor 通道 Fast 模式的实现机制：opencode-cursor-auth@0.2.48 的 index.mjs:3600-3601 读取请求 service_tier（priority/fast 开启，其他关闭），:1210 落变体参数 fast=true，:1165 的 fastAt 由 Cursor 账号侧决定；网关 /v1/models 中 8 个带 @ 上下文后缀的 cursor 模型带 service_tiers=[priority]（1.5x 速度），而 gpt-5.4-mini 与 deepseek-v41-flash-1017 没有 fast 档。",
  "ranges": "0-1",
  "source_extraction_id": "41d5fdf69bc440fc9aeeb6fc6d471503",
  "version": 1,
  "memory_type": "events"
}
-->