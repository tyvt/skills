# dsh-experimental-agent-team-profile
向 standard 预设注入团队编排工具组的 bundle。
## 提供工具与 token
- team_task_update 276、team_task_list 180、team_task_create 158、team_task_get 67
- spawn_teammate 161、wait_agent 122、send_message 120、interrupt_agent 80、list_agents 76
## 影响
- 9 个工具合计约 1.24k token，常驻在 standard 预设实际下发的 33 项工具中
- 不在 preset-standard 的 disabled 列表内，裁掉 schedule/goal/workflow 也不会让它消失
- 前序决策为"认掉不动"，只有不需要团队编排时才考虑关闭（可省 1.24k）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "插件包",
  "name": "dsh-experimental-agent-team-profile",
  "source_extraction_id": "c7e177820f0a4226b8c7ecffec51fb82",
  "version": 1,
  "memory_type": "entities"
}
-->