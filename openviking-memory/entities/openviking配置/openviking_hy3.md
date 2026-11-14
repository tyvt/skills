# OpenViking 的 hy3 视觉语言模型
hy3（`auto/hy3`）是 OpenViking 记忆系统的视觉语言模型（VLM），在 `~/.openviking/ov.conf` 中绑于 `vlm` 段（provider: openai，指向 magpie 网关 127.0.0.1:3425/v1，max_concurrent: 8）。

## 角色职责
- 主职：记忆抽取器，会话结束后将对话抽取为结构化记忆（entities/events/preferences 分类写入）；add-memory 直灌路径也靠它自动分类。
- 副职：query_planner，每次 search 检索时对查询做改写/规划；因 query_planner 未单独配置，默认继承 vlm。

## 已知问题
- 慢：单次 commit 实测 126–370 秒，抽取约 4–52K tokens/次。
- 贵（空转）：2026-11-12～13 排查确认 24h 稳定空转烧 token（凌晨 ~100k+/h），占账单 92%，估算 ≈¥31/天。
- 语言漂移：2026-11-02 全量导入时曾把 23 条记忆整体译成葡萄牙语、生成葡语目录名，后用指纹反查修复。
- 不支持识图：纯视觉/证码基准里 hy3 变体被排除，不具备真实图像理解能力。
- 2026-11-14 已决定弃测：MMVP 评测中 hy3 不参测，留 6 个 workbuddy 模型。

## 推荐替换模型
- 首选 vlm 抽取：`workbuddy/deepseek-v4.1-flash`（中文强、flash 级便宜快、已是 planner 兜底且实测稳定）。
- query_planner 换成同 flash 级或 `enable_intent:false`/关掉，避免每次 search 烧 17 万 token。
- 其他候选：`workbuddy/space-bunny`（统一兜底）、`workbuddy/kimi-k3.1-pro`（长上下文）、`auto/deepseek-v4.1-flash`/`cursor/deepseek-v41-flash-1017`（同源备份）、`cursor/grok-4.7@500k`（仅质量对照基线，贵）。
- 不建议：`workbuddy/hy3`、`workbuddy-ai/hy3`（同款缺陷）；`cursor/gpt-5.6-sol/terra`、`codex/*`、`cursor/claude-opus-4-7`、`cursor/grok-4.7@256k`（成本灾难，曾回退到 grok-4.7@256k 单次规划烧 41K token）。

## 架构建议
- 拆角色分别配，勿让 query_planner 继承 vlm。
- 保留 `bge-m3-ov` embedding 不变（本地零成本）。
- 小批量（20–30 条会话）对候选做抽取质量+语言一致性+耗时回归，达标再切。

<!-- MEMORY_FIELDS
{
  "category": "OpenViking配置",
  "name": "openviking_hy3",
  "source_extraction_id": "00801d3031de4d1aab1386b5001826d1",
  "version": 1,
  "memory_type": "entities"
}
-->