# C端一般表决误用决策结果字典致显示不一致
太仓一网通办H5 的 C 端 ResultStatisticsTab.vue 在展示一般表决「表决结果」时误用字典，导致与 G 端显示不一致。

## 问题根因
- C 端 ResultStatisticsTab.vue 展示一般表决「表决结果」时误用 t_mf_decision_result 字典
- 与 G 端 t_mf_maintain_result 字典的「通过」显示不一致

## 修复方案
- 在 src/views/owner-decision/components/ResultStatisticsTab.vue 加载 t_mf_maintain_result 字典
- 当决策类型为 MAINTAIN 时映射 decisionResult 字段
- 清理 sessionStorage 字典缓存

## 验证与归属
- 验证证据：extracted source=cursor session=217b4c76-c9e4-4450-92a9-8c0271567c94
- 涉及文件：src/views/decision/common/ResultStatistics.vue、src/views/owner-decision/components/ResultStatisticsTab.vue、src/views/owner-decision/OwnerDecisionResult.vue、src/views/decision/DecisionResult.vue、src/api/common.ts、src/store/vote.js、src/router/index.ts、src/views/owner-decision/components/MyDecisionTab.vue
- 所属项目：太仓一网通办H5；来源会话：217b4c76-c9e4-4450-92a9-8c0271567c94；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_result_dict_bug",
  "source_extraction_id": "ce2fc0065fb543bc9d68e84262ae7ddf",
  "version": 1,
  "memory_type": "entities"
}
-->