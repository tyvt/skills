# 候选人统计误取无字段接口且百分比重复乘百
太仓一网通办H5 的 GroupResult.vue 误用无字段接口并重复乘百，导致候选人统计错误。

## 问题根因
- GroupResult.vue 误从 selectDecisionResult.optionGroupResultList 取候选人统计
- 该接口无 weightSocreRatio 字段
- weightActorRatio 已是百分比字符串却乘100

## 修复方案
- 改为使用 getCalculationChart 的 optionList
- 占比取 weightSocreRatio 直接 Number 转换不乘100

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 验证证据：src=太仓一网通办H5/003.md
- 涉及文件：src/views/election/components/GroupResult.vue、src/views/election/ElectionResult.vue、src/views/decision/components/ProgressBar.vue、src/views/owner-decision/components/ResultStatisticsTab.vue、src/views/components/ProgressBar.vue、src/store/election.ts、src/views/decision/components/PieChart.vue、src/views/maintain/components/StatisticsCard.vue
- 所属项目：太仓一网通办H5；来源会话：fa7fcf41-4dd6-479b-95dc-fc0517ba9715；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "group_result_stat_bug",
  "source_extraction_id": "fc297c05bb3e476ab3698f797831cc98",
  "version": 1,
  "memory_type": "entities"
}
-->