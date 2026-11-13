# Magpie 编排器
本地 LangGraph 编排服务进程（magpie.exe tray），独立运行于 DSH Web 之外。

## 关键事实
- orchestrate 工具经 HTTP 网关（:3425，PID 21580）out-of-process 执行
- 不加载 dsh-orchestrator-gate，因此其内部 pwsh/search 不受该 guard 限制
- DSH Web 进程（如 PID 17740）作为客户端连接该网关

## 关系
- 与 dsh-orchestrator-gate 分属不同进程，M1 豁免测试须用 in-process 子代理而非 orchestrate 工具


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "magpie_orchestrator",
  "source_extraction_id": "eb213da6abef4bf5ad6baac532f0e529",
  "version": 1,
  "memory_type": "entities"
}
-->