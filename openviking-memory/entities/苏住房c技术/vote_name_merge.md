# 选举结果分组漏姓名bug
苏住房C小程序投票模块 DecisionResult.vue 合并分组时丢失选举人姓名，修复后改为聚合姓名并新增 buildRecordList。

## 问题根因
- pages_vote/elect/DecisionResult.vue 中 groupRecordRows 按 decisionResponseId 合并时未聚合 decisionPlayerName
- enrichRecordList 展开 .record 覆盖已从 decisionOptionResponseAllList 获取的姓名

## 解决方案
- 分组时合并同组所有记录姓名
- 新增 buildRecordList 优先取姓名与选项
- enrichRecordList 仅异步补摘要不展开整个 record
- ResultRecord.vue 详情页补充展示

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/058.md
- 涉及文件：pages_vote/elect/DecisionResult.vue、pages_vote/decision/common/DecisionResult.vue、components/CardList/CardList.vue、api/autonomy.js、pages_vote/elect/ResultRecord.vue、components/CardCell/CardCell.vue、pages.json、components/CardCell/CellFulline.vue
- 来源会话ID：35a00989-4b03-4dae-8d47-d5841ef5d71f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "vote_name_merge",
  "source_extraction_id": "6d2d014529be465fbbb01ab3f8d573a9",
  "version": 1,
  "memory_type": "entities"
}
-->