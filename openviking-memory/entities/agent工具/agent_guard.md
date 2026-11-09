# agent-guard
agent-guard 是 agent 调用调度与别名映射的守护工具。

## 功能描述
- 负责 agent 工具调用的调度与别名映射
- 属于 agent 自身运维工具链的一部分

## 近期增强
- 新增 schedule_update→schedule_edit 别名映射
- 新增 grep 命令支持
- 新增 glob→include 别名映射

## 验证归属
- 来源：2026-11-09 agent 运维报告
- 随提交 c7f682f5 合入 main

<!-- MEMORY_FIELDS
{
  "category": "agent工具",
  "name": "agent_guard",
  "source_extraction_id": "ddc362a949994fcb96dea1093973f741",
  "version": 1,
  "memory_type": "entities"
}
-->