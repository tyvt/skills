# DSH Web
DSH Web 是 dsh 的 Web 编排系统，使用 LangGraph 与 Magpie 进行多模型编排。

## 模型编排与路由
- 截至 2026-11-25，多模型编排基于 LangGraph + Magpie。
- 截至 2026-11-25，planner 池为 `gpt-6-luna` / `gpt-5.4-mini`，采用三级链。
- `config.yaml` 自 2026-11-24 起有 15 处 deepseek id 改为 `hy4flash-free`（workbuddy 10、auto 5），按请求加载且免重启。
- 截至 2026-11-25，`router.py` 峰时跳过策略自动 no-op。

## 预设与上下文
- 截至 2026-11-14，`preset-standard` 禁用 `tool-workflow`；`preset-cordis` 与 `preset-full-tools` 仍启用 `tool-workflow`。
- 截至 2026-11-14，skill 目录 40 项，其中 `dsh-harness-dev-context` 禁用。
- 截至 2026-11-14，每步固定上下文约 14.6k token。


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "Web系统",
  "name": "dsh_web",
  "source_extraction_id": "19f1674e77c6444a9ef773adf8d7b926",
  "version": 1,
  "memory_type": "entities"
}
-->