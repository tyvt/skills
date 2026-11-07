# 决策明细投票来源列须绑定字典
太仓G端 decisionCommon 公共表组件未绑定 voteSource 与 vote_source 字典，导致决策明细单元格空白。

## 问题根因
- 一般表决、业委会选举等详情共用 `decisionCommon/components/DecisionRangeTable.vue`
- 字段为 `voteSource`，展示依赖字典 `vote_source`（getDict + dictFormatter / voteSourceOptions）
- 列未接字典映射时接口有值但单元格空白

## 修复方案
- 在公共表组件内补列与 formatter，不要只改各业务目录下已废弃的 `ownerDecision/components/DecisionRangeTable.vue` 副本
- 仍为空时核对系统字典是否存在与接口返回值同型的项（如值为 "1"）

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 b44fb3cc 一般表决详情决策明细「投票来源」未显示；修复后业委会选举同步生效
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/DecisionRangeTable.vue、generalDecision/detail.vue、ownerDecision/detail.vue
- 所属项目：太仓G；来源会话：b44fb3cc-ab35-40cd-83f7-88fb4078ce58；代码基线：cf80bc8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_vote_source",
  "source_extraction_id": "ee62528ea6844ee48025867c5031521c",
  "version": 1,
  "memory_type": "entities"
}
-->