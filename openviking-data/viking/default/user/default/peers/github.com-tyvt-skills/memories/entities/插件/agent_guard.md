# agent-guard
dsh 仓库中用于拦截代理探索漂移与坏账行为的防护插件。
## 规则与修复
- 探索漂移三规则原在 config.js 中默认 enabled:false / mode:'off'（失实），2026-11-14 修复为 enabled:true / mode:'warn'（commit ba1fadce）
- 坏账四修复包含报错可复制、前台长任务告警，以 warn 灰度上线（commit ce99ed19）
## verify-loop 前端验证轮询门禁
- 2026-11-20 新增，实现于 dsh\agent-guard\lib\rules.js:1017 的 decideVerifyLoop：同一会话累计 agent-browser 调用超 12 次（agentBrowserMax: 12）或 Start-Sleep 超 5 次即拒绝工具调用，提示文案形如「[verify-loop:BLOCKED] 本轮已调用 agent-browser 13 次（阈值 12）」
- 计数器按 session id 存状态（index.js:191-203），会话内累计且跨轮永不重置，因此用户回复「继续」无法解锁
- 现网 ~/.dsh/agent-guard/cordis.patch.yml:113-117 曾把默认 warn 灰度 promote 为 mode: block；2026-11-24 按用户选择降级为 warn（第 115 行），保留提醒文案与 ledger 记账但不再拒绝调用，需重启 DSH Web 后新会话生效
- ledger 累计触发 2198 次；模型被拦后曾误判为「按轮计数、下轮重置」而主动结束回合等用户输入「继续」，是该打断体验的直接成因

## 相关技能与规范
- 配套 dsh-explore 探索外包 skill，把探索任务外包给子代理执行
- AGENTS.md 扇出节规定：派发子代理必须带行号锚点

<!-- MEMORY_FIELDS
{
  "category": "插件",
  "name": "agent_guard",
  "source_extraction_id": "3e8b95a025e44ab28fec18bb12842733",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "entities"
}
-->