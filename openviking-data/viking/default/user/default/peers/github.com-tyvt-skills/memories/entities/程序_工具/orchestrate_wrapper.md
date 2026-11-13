# orchestrate 编排包装层
用于触发 plan_review 等编排流程的包装层工具。

## Description
- 调用 plan_review 时经 orchestrate 包装层提交给 grok 等审核模型
- 包装层自身有约 120s 硬超时上限，与底层模型 300s 超时无关

## Significance
- grok 审 2.5k token 计划实际需要 ~150s（推理用 14k-16k token），超过包装层 120s 上限
- 包装层先放弃并报"编排失败/stall"，但 grok 本可正常完成，是"grok超时无响应"的第二独立误报源

## Relations
- 直连 python -m src.jsonbridge 路径无 120s 包装层限制，可正常完成审核
- 与 _condense_plan 送审压缩功能同属 dsh/langgraph-orchestrator 项目

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序/工具",
  "name": "orchestrate_wrapper",
  "source_extraction_id": "4f7c63cffa4a475e8e151ffbfdac12d1",
  "version": 1,
  "memory_type": "entities"
}
-->