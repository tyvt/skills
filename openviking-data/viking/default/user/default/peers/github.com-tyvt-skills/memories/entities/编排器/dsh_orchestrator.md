# dsh-orchestrator 编排插件
DSH 编排器插件（Node.js），经 orchestrate 工具调用，内部 spawn(python -m src.jsonbridge) 执行编排。

## 卡住根因
- lib/index.js 一次性等 stdout，中途零进度输出
- config 中 code_editor/planner 单请求 300s、max_retries_per_model=1、池内多模型串行（最坏 300×2×N 秒）
- _run_pwsh 默认 pwsh_timeout=30s，npm run build 必然 30s 超时，被 gate 逼进 orchestrate 后失败/卡住
- 真实会话 session-74f4898d 的 build 在 180s 处直接「调用被取消」且无 partial 输出，即「疑似卡住」

## 修复
- lib/index.js：子进程 stderr 实时透传为 [orchestrate] 进度行（500ms 节流）
- 新增 stall 检测：45s 无输出即 kill 并回传 stderr 尾部；超时/停滞/取消均保留 stderr 尾部

## 关联配置
- 超时参数实际位于 dsh/langgraph-orchestrator/config.yaml（见 langgraph_orchestrator 实体）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "编排器",
  "name": "dsh_orchestrator",
  "source_extraction_id": "126e610f4e3542618cf613d408628d6e",
  "version": 1,
  "memory_type": "entities"
}
-->