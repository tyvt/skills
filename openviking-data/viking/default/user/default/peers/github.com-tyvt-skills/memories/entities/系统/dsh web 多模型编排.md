# DSH web 多模型编排
DSH Web 的多模型编排系统，基于 LangGraph 与 Magpie。

## 编排
- planner 池为 gpt-6-luna / gpt-5.4-mini，采用三级链。
- router.py 峰时跳过策略自动 no-op。

## 模型切换
- config.yaml 自 2026-11-24 起将 15 处 deepseek id 改为 hy4flash-free（workbuddy 10、auto 5），按请求加载免重启。

## 预设
- preset-standard 禁用 tool-workflow，preset-cordis 与 preset-full-tools 仍启用。
- skill 目录 40 项（dsh-harness-dev-context 禁用），每步固定上下文约 14.6k token。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "系统",
  "name": "DSH web 多模型编排",
  "source_extraction_id": "39f47e941bc2409e8b998b592259bf89",
  "version": 1,
  "memory_type": "entities"
}
-->