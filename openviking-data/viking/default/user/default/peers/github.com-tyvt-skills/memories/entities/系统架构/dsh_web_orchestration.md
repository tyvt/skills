# DSH web 多模型编排
以下为 2026-11-25 确认的多模型编排状态。

## 架构与模型池
- 编排基于 LangGraph 与 Magpie。
- planner 池为 `gpt-6-luna`、`gpt-5.4-mini`，采用三级链。

## 配置变更
- `config.yaml` 自 2026-11-24 起有 15 处 deepseek id 改为 `hy4flash-free`（workbuddy 10 处、auto 5 处）。
- 改动按请求加载，无需重启。
- `router.py` 的峰时跳过策略已自动 no-op。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "系统架构",
  "name": "dsh_web_orchestration",
  "source_extraction_id": "55ec517f876a490cabd712f25c420452",
  "version": 1,
  "memory_type": "entities"
}
-->