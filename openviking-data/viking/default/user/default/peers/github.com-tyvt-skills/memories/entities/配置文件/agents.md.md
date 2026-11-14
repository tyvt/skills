# AGENTS.md
DSH harness 的 agent 行为规则文件。
## 位置与规模
- 路径 ~/.dsh/AGENTS.md，是 D:\repository\skills\dsh\AGENTS.md 的软链
- 99 行、9197 字符，约 3,679 token
## 注入机制
- 由 agent-instructions 插件每轮全文注入，配置 maxBytes: 65536
- 是每轮"注入内容 3.3k token"的绝对主体，占单轮 15.5k 约 27%
## 内容性质
- 收纳 P0/P1/P2 历史踩坑沉淀的硬规则（计划审批、探索纪律、token 策略等），逐条有反例支撑
- 第 3 行原则：细节按需加载，不要把 skill 整篇读进上下文
- 压缩风险高：删规则会造成行为退化、反向烧更多 token，故本次未改

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "配置文件",
  "name": "agents.md",
  "source_extraction_id": "c7e177820f0a4226b8c7ecffec51fb82",
  "version": 1,
  "memory_type": "entities"
}
-->