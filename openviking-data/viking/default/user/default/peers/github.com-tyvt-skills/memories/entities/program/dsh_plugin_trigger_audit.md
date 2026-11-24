# dsh 插件触发审计
dsh 插件为 hook 注入型，没有会话级的「每次触发」计数源，只能从启动日志的名称命中粗略观察。

## 日志命中（2026-11-24 统计）
- orchestrator / langgraph-orchestrator 12 次，orchestrator-gate 8 次，agent-guard / cost-meter / token-guard / mcp-gateway 各 4 次。
- dcwhc / plan-gate 零命中。
- 命中来自 C:\Users\Administrator\.dsh\logs，只反映升级/重启记录，不代表真实使用频率。

## 其他记录源
- ag-selftest-ledger.jsonl 有 4064 行，是自测账本，不是运行时触发记录。
- 若要插件真实触发频率，需插件自身落盘 audit 计数，目前除自测外未落盘。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "program",
  "name": "dsh_plugin_trigger_audit",
  "source_extraction_id": "4ddeb1b085934b51bff5365817431cec",
  "version": 1,
  "memory_type": "entities"
}
-->