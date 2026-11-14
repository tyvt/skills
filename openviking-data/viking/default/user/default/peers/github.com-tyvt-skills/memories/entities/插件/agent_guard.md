# agent-guard
dsh 仓库中用于拦截代理探索漂移与坏账行为的防护插件。
## 规则与修复
- 探索漂移三规则原在 config.js 中默认 enabled:false / mode:'off'（失实），2026-11-14 修复为 enabled:true / mode:'warn'（commit ba1fadce）
- 坏账四修复包含报错可复制、前台长任务告警，以 warn 灰度上线（commit ce99ed19）
## 相关技能与规范
- 配套 dsh-explore 探索外包 skill，把探索任务外包给子代理执行
- AGENTS.md 扇出节规定：派发子代理必须带行号锚点

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "插件",
  "name": "agent_guard",
  "source_extraction_id": "8b30a2e1f39c4d9dae43731e1a03bbe6",
  "version": 1,
  "memory_type": "entities"
}
-->