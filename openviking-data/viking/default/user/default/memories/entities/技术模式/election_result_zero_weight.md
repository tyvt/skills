# 业委会选举结果统计候选人得票权数显示0
太仓一网通办H5 的业委会选举表决结果页因数据来源与字段计算错误，导致候选人得票权数统计显示为0。

## 问题根因
- GroupResult.vue 数据来源错误：候选人统计取自 selectDecisionResult 的 optionGroupResultList，该接口候选人对象无 weightSocreRatio 字段
- 字段计算错误：使用 weightActorRatio * 100，但接口返回的 weightActorRatio 已是百分比字符串（如 "100.00"），不应再乘100

## 修复内容
- 改为使用 getCalculationChart 返回的 optionList
- 占比直接取 weightSocreRatio（Number 转换，不再乘100）
- 候选人字段示例：weightSocre="1"（得票数）、weightSocreRatio="50.00"（得票权数占比%）、weightActorRatio="100.00"（得票参与比例%）

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/views/election/components/GroupResult.vue、src/views/election/ElectionResult.vue、src/views/decision/components/ProgressBar.vue、src/views/owner-decision/components/ResultStatisticsTab.vue
- 所属项目：太仓一网通办H5；来源会话：fa7fcf41-4dd6-479b-95dc-fc0517ba9715；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "election_result_zero_weight",
  "source_extraction_id": "924a0db299a54a6195a4b0d68cc0e945",
  "version": 1,
  "memory_type": "entities"
}
-->