# dsh/AGENTS.md 验证门
该验证门约束 dsh/AGENTS.md 中截图内嵌路径的检查规则。

## 验证规则
- 第 7 行验证门要求截图内嵌路径锁定 `$env:TEMP`。
- 路径必须使用正斜杠、尖括号和时间戳命名。
- 禁用相对路径与 attachments 路径。
- 内嵌前执行五项自检。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "规则配置",
  "name": "dsh_agents_gate",
  "source_extraction_id": "55ec517f876a490cabd712f25c420452",
  "version": 1,
  "memory_type": "entities"
}
-->