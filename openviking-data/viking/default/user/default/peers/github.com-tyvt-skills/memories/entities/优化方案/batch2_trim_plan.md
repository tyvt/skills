# 批 2 工具裁剪草案（session_query + workflow）
2026-11-14 为用户起草的 DSH Web 工具裁剪计划草案 .plan/p1b-trim-session-query-workflow-20261114.md，尚未送 plan_review，等用户就 session_query 可达路径拍板。

## 目标与收益
- 承接批 1（在 preset-standard 内禁用 tool-schedule/tool-goal、新增 preset-full-tools 兜底，已落地且断言 A/B/B'/D/E 全通过）继续裁剪两个工具
- workflow 预计省 848 token/步、使用率 0.7%；session_query（session_search + session_event_*）预计省 994 token/步、使用率 8.8% / 1.5%，合计约 2,100 token/步
- 2026-11-24 复核：批 2 已落地且范围扩大，tool-workflow 在全部预设（含 preset-full-tools）均 disabled；实测量 workflow 全库仅 41 次调用（使用率 0.7%），判定为负收益

## 落点与机制（--dump-config 实测）
- workflow：位于 preset-standard 块内 tool-workflow（L291-292），preset-full-tools（L508-509）原保留启用（2026-11-24 复核为全部预设均已禁用），可按批 1 模式覆盖并由 full-tools 兜底；dump 中 tool-workflow 共 4 处（顶层、preset-standard、preset-ptc、preset-cordis）
- session_query：由 bundle dsh-experimental-session-search 用 - insert: 定义顶层 group optional-session-search，内含 optional-tool-session-query（@deepseek-ai/dsh-tool-session-query）；不属于任何 preset，preset-full-tools 覆盖不到
- 关闭方式：须在 web 顶层 profile 以 - id: optional-session-search 重写 group config 禁用内部插件，裸 - id: optional-tool-session-query 无法命中

## 待定决策
- 方案 A（推荐）：覆盖 group config 禁用其内插件，但需接受 session_search 8.8% 使用率下无现成切换兜底
- 方案 B：只裁 workflow，认掉 994 token 省量、零可达风险
- 方案 C：另建含该 group 的可切预设，需先小样本验证 group 能否纳入 preset

## 已写入的上轮教训
- 真实 preset 在 dsh-web-app/presets/*.patch.yml；profile 层 - id: preset-standard 是"覆盖已有条目"、按 id 合并生效
- 新增预设条目必须包在 - insert: 下，裸 - id: 会 entry not found 静默跳过（--dump-config 首行会打印）
- 验证必须重启 dsh web 后开全新会话读 tools/toolsTokens，不在长会话中途改测

<!-- MEMORY_FIELDS
{
  "category": "优化方案",
  "name": "batch2_trim_plan",
  "source_extraction_id": "5539e03095a24a4f958538efd0ab1743",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->