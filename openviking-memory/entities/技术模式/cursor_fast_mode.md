# Cursor 通道 Fast 模式（service_tier）接入

magpie cursor 通道通过请求参数 service_tier=priority 启用 Fast 模式（约 1.5x 速度），需客户端透传与网关模型支持两侧同时满足。

## 机制
- opencode-cursor-auth@0.2.48 index.mjs:3600-3601 读取请求 service_tier：priority/fast 视为开启，其他值关闭
- index.mjs:1210 落变体参数 fast=true，:1165 的 fastAt 由 Cursor 账号侧决定
- 网关 /v1/models 中 8 个带 @ 上下文后缀的 cursor 模型返回 service_tiers=[priority]（1.5x 速度）
- gpt-5.4-mini 与 deepseek-v41-flash-1017 无 fast 档，不应透传 service_tier

## DSH 编排器配置
- openai SDK 2.54.0 原生支持 service_tier（keyword-only 参数）
- langgraph-orchestrator 的 config.py 中 ModelSpec 新增 service_tier 字段并由 load_config 解析
- router.py 的 _call_once 条件透传（值为 None 时不发送）；src 内 completions.create 仅 router.py:162 一处，无旁路
- config.yaml 中 plan_reviewer/verifier 两处 cursor/grok-4.7@256k 设 service_tier: priority，mini 不加

## 验证与落地
- py_compile、load_config 断言（mini=None、grok=priority×2）、mock create 断言（带 tier 含键、不带无键）均通过
- 经 router.py:227 真实路径的 _call_once 端到端真实调用 OK
- 提交 7b0456fe（4 文件 +67 行）；因 github.com:443 不可达 push 失败（curl 000/exit28，无代理配置），本地已提交待推送
- 方案计划文件 .plan/cursor-fast-default-20261116.md（v2 过审 80/100）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_fast_mode",
  "source_extraction_id": "41d5fdf69bc440fc9aeeb6fc6d471503",
  "version": 1,
  "memory_type": "entities"
}
-->