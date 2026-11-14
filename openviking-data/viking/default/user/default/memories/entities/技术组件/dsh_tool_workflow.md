# workflow 工具插件
DSH 的 workflow 工具插件 dsh-tool-workflow，注册工具名为 workflow。

## 功能与依赖
- dsh-tool-workflow（lib L61-63、L266-271）注入 workflowEngine 服务并注册 workflow 工具，通过 ctx.workflowEngine.start() 运行。
- workflowEngine 服务由 workflow-ptc 提供；禁用 workflow-ptc 只会破坏引擎，不会移除 workflow 工具。

## 现状
- 2026-11-14 standard 预设中的 tool-workflow 在 DSH 启动归一化后已标记 disabled:true，但批 1 新会话 794ca361 仍挂载 workflow 工具（852 tok），工具来源待溯源。

<!-- MEMORY_FIELDS
{
  "category": "技术组件",
  "name": "dsh_tool_workflow",
  "source_extraction_id": "e9e2df348a7b4f8f9fd5b13664775b77",
  "version": 1,
  "memory_type": "entities"
}
-->