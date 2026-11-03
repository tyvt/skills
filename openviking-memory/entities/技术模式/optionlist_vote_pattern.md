# 选项表决须用optionList而非选举统计字段
太仓一网通办H5 迁移至 /owner-decision 时选项表决统计误用选举接口字段，须改用 optionList。

## 问题根因
- 迁移至 /owner-decision 时误将业委会选举接口 selectDecisionResult 的 optionGroupResultList 用于选项表决统计

## 正确做法
- 选项表决权数面积统计应取 calculationChart 的 optionList
- 参照 decision/optional/ResultStatistics.vue 以 detail.optionList.map 映射 weightSocre 与 weightSocreRatio 实现

## 验证与归属
- 验证证据：src=太仓一网通办H5/002.md
- 涉及文件：d:/repository/太仓一网通办H5/src/views/owner-decision/components/ResultStatisticsTab.vue、d:/repository/太仓一网通办H5/src/views/decision/common/ResultStatistics.vue、d:/repository/太仓一网通办H5/src/views/decision/components/ProgressBar.vue、d:/repository/太仓一网通办H5/src/views/components/ProgressBar.vue、d:/repository/太仓一网通办H5/src/store/vote.js、d:/repository/太仓一网通办H5/src/views/election/components/GroupResult.vue、d:/repository/太仓一网通办H5/src/views/election/ElectionResult.vue、d:/repository/太仓一网通办H5/src/store/election.ts
- 所属项目：太仓一网通办H5；来源会话：77cef414-e757-45c7-ac15-5e03769e0bd4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "optionlist_vote_pattern",
  "source_extraction_id": "257d5bae982e4b8e880e6453ec41e8c9",
  "version": 1,
  "memory_type": "entities"
}
-->