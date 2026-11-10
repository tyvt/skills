# langgraph-orchestrator

LangGraph + Magpie 多模型编排代码库，位于 D:\repository\skills\dsh\langgraph-orchestrator。

## Description
- 基于 LangGraph 的多模型编排架构，用于复杂任务的规划与工具调用。
- 包含配置、路由、图执行三大核心模块。

## Structure
- config.yaml：全局配置，含 tools 模型池与 scheduling 调度段。
- src/config.py：OrchestratorConfig 及 SchedulingConfig 数据类。
- src/router.py：ModelRouter 类，负责模型池动态生成与时间感知。
- src/graph.py：node_plan 等图节点，含规划质量兜底逻辑。

## Tools
- planner：主力 openrouter/tencent/hy3-preview:free，兜底 cursor/grok-4.7@256k。
- file_reader：谷时主力 deepseek-v4.1-flash，峰时替补 glm-5.3-flash。
- code_editor：含 deepseek-v4.1-flash 与 glm-5.3-flash。

## Scheduling
- DeepSeek 峰时：工作日（周一至五）09:00-12:00、14:00-18:00。
- 峰时 file_reader/code_editor 跳过 deepseek-v4.1-flash，优先 glm-5.3-flash。

<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "项目代码库",
  "name": "langgraph_orchestrator",
  "source_extraction_id": "e6c600648d84402d99c2811093a990ce",
  "version": 1,
  "memory_type": "entities"
}
-->