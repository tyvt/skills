# audit-models.mjs
token-frugal 技能目录下的只读审计脚本，输出逐会话逐模型 token 清单。

## Description
- 从会话事件日志的 assistant/message 事件解析 usage（inputTokens/outputTokens/cacheReadTokens/cacheWriteTokens）与 source.{provider,model}，按会话与模型聚合。
- 覆盖主 agent 与 teammate 的精确历史口径；orchestrator 子模型经网关 /v1/magpie/usage/requests 以 agent 分组附全局口径（无 session_id，标 ≈）。
- 突破旧审计（audit-tokens.mjs / analyze.mjs）仅读 projcache tokenUsage.totals 与 modelSelection.lastUsed 单值、看不见多模型与 orchestrator 子模型消耗的局限。

## 使用方式
- `node audit-models.mjs 2026-11-12`：逐会话·逐模型（入/出/缓存命中%/步数/每步未命中），多模型会话标 [N个模型]，末尾附全局每模型与网关全局每模型。
- `--session <sid前缀>`：单会话逐模型 + 逐轮 step 级明细。
- `--no-gateway`：离线纯事件日志口径。

## 验证
- 三种模式均跑通；成功暴露旧审计掩盖的多模型消耗（如 grok-4.7@256k 69% 命中率、AsyncOpenAI/hy3 仅 12% 命中率）。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "audit_models_mjs",
  "source_extraction_id": "ae76bd46a6014816b3c48c3262f07956",
  "version": 1,
  "memory_type": "entities"
}
-->