# dsh/cost-meter
dsh 仓库中的成本计量插件，统计每步未缓存开销并拦截过大的读取操作。
## 功能要点
- B1：撤销 inspectSize 导出
- B2：实现 tools.guard 白名单，拦截整读、整 grep、整 dump，bigMissStreak≥2 时触发
- perStepUncachedBudget=10000 作为每步未缓存开销计量上限

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "插件",
  "name": "dsh_cost_meter",
  "source_extraction_id": "8b30a2e1f39c4d9dae43731e1a03bbe6",
  "version": 1,
  "memory_type": "entities"
}
-->