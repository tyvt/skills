
# dsh子代理模型选择机制
DSH 子代理模型选择功能，由 dsh-tool-subagent 实现，控制子代理可使用哪些模型。

## 机制说明
- 子代理创建可传 provider+model+reasoning_effort 覆盖父模型（dsh-tool-subagent/lib/index.js:43-96，服务层 child-agent.js/manager.js 均支持）
- 开关一：每工具实例 modelSelection:true 开关（config.modelSelection === true），决定工具 schema 是否向模型暴露 provider/model 参数
- 开关二：Session 级 policy.routes 白名单（subagent-model-selection 命名空间），实际为每会话 durable projection，由会话事件 subagent/model-selection-policy 写入 session log（.sessions），非全局 settings.yaml
- 开关二b：Settings 表单 SubagentModelSelectionConfig.enabled（默认 false，.volatile() 不落盘）为总闸，决定新顶层会话是否写入 policy；与开关一为两个独立开关，须同时开启（index.js:351 + model-selection-settings.js:76,98）
- route 格式（P2）：Array<{provider:string(min1), model:string(min1)}>，.strict()、不得重复，例 {provider:"magpie", model:"cursor/composer-2.5"}（model-selection-settings.js:8-39）
- 无 policy 时子代理只能用父模型 route；有 policy 时可选 policy.routes 中任一 route，否则抛错
- 无 policy 继承父模型正是"所有子代理都等于主控模型"的直接根因

## 三条 Spawn 路径差异
- workflow agent({provider,model})：直达 startActivation、绕开 policy 白名单、spawn provider 声明 agentOptions:true，今天零配置即可用（dsh-workflow-ptc startActivation 透传 request.agentOptions）
- spawn_teammate（Team）：request 无 model 字段，成员硬继承 Lead 的 root.options.model，无法换模型
- model-facing subagent 工具：受白名单约束，但标准 preset 中 disabled:true；assertAllowedModelSelection 仅存在于该工具，workflow/spawn 路径不调用

## 配置与状态
- 启用路径：Settings→Plugins→Subagent 打开 model selection（SubagentModelSelectionConfig，volatile 不落盘），写入角色白名单 routes
- 截至 2026-11-14 该功能存在但未配置；Settings 表单为 volatile，仅在 agent/created 时把 enabled+allowedModels 快照作为会话事件写入 session log
- 模型注册表位于 ~/.dsh/settings.yaml 的 llm-pi-ai.providers.*.models，共 39 个模型（magpie/cursor/workbuddy/codex/autoclaw）

## 与编排器关系
- plan_reviewer/verifier 池是编排器内部 review 节点池（config.yaml，grok-4.7→deepseek），服务 op:plan_review/op:full
- 子代理模型选择改的是宿主 spawn 子代理路由，两者独立互不干扰


<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "dsh_subagent_model_selection",
  "source_extraction_id": "79059d4aa90d403aa5753daf35c4a5ef",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->