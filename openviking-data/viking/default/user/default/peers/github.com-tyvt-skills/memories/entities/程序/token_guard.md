# token-guard
DSH host plane 前置守卫，位于 agent-guard 的 explore-drift 之前，属 waterfall 拦截链的上游层。

## Description
- 独立前置层，拦截提示带 [token-guard] 前缀
- 对 >300 行无范围整读直接硬拦（拒绝请求，请求不抵达后续 guard 回调）
- 对 pwsh 大输出做裁剪/落盘处理

## 层级关系
- 整读防线顺序：token-guard（>300 行硬拦）→ 宿主反重复 hook（同参数重试拦截，不限工具）→ agent-guard explore-drift（warn 记账）
- 与 agent-guard 职责部分重叠：explore-drift 首读注入探针仅在 ≤300 行整读时才有机会运行，属次级兜底

## Significance
- 2026-11-13 重启实测确认其先于 agent-guard 触发，压缩了 explore-drift 规则1 的实战空间

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "token_guard",
  "source_extraction_id": "b460b60b945241d1b49f1dec884d4327",
  "version": 1,
  "memory_type": "entities"
}
-->