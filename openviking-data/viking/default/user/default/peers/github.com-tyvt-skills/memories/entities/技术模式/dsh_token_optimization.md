# DSH 令牌成本优化调查
2026-11-13 github.com-tyvt-skills 发起、助手用 token-optimizer 对 687 会话归因的 DSH 编排器每步上下文与令牌消耗优化专项。

## 核心结论
- 每步固定块约 18.5k（OV 上下文块 + system-reminder 全文 + team message + cost-meter notice）；用户原估省 1.2-1.4M（7-8%），实际全落地仅 0.3-0.6M
- 全局等效成本 993M、缓存命中 94.7%、每步未命中均值 4474；真杠杆是缓存路由而非砍固定块
- 固定块落缓存前缀时仅按约 10% 计价；cache miss 后全价重读（模型池 failover/provider 切换打断前缀缓存）才是真成本
- 路由纪律第一：cursor/composer-2.5（每步未命中 15175/命中 75%）、cursor/grok-4.7@256k（7960/71%）、trae（18811/38% 事故级）禁用于长会话，固定 deepseek-v4.1-flash auto（1432/99%）；34 个低缓存会话可省 40-50M 等效

## 优化手段
- OV profile 已每会话一次，真可做：目录清单压一行 + recall 收紧（recallMaxTokens 700→500、recallDedupTurns 8→12、scoreThreshold 0.40→0.45）
- system-reminder 改 diff 注入 + 5 分钟 debounce（编辑密集会话每次变更省约 2.5k）
- team message 合并注入；cost-meter notice 会话内单行化、同状态不重复
- 上游 feature：pluginMessage 支持 ephemeral（不进历史，只当步可见）

## 落地状态
- 2026-11-13 仅完成只读归因与方案设计，未改动任何配置；规则类（路由纪律、一子任务一会话拆片）与 patch 类（P1/P2）待出 .plan 送审
- 2026-11-14 澄清：面板/模型标签 `(off)`（auto/deepseek-v4.1-flash）指推理档位关闭（settings.yaml reasoningEfforts "off": none），与缓存开关无关；缓存命中率偏低需另找原因。工具固定开销治理由 context_overhead_audit 专项接续，批 1/批 2 已落地

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dsh_token_optimization",
  "source_extraction_id": "a99f3affed2044db87ef72c4487e4122",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->