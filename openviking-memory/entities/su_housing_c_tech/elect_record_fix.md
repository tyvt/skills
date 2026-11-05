# 选举记录选举人姓名不显示修复
苏住房C小程序选举记录（pages_vote/elect/DecisionResult.vue）因分组与展开逻辑导致选举人姓名丢失，已修复。

## 问题根因
- groupRecordRows 按 decisionResponseId 合并时只保留第一条，未合并各条 decisionPlayerName
- 若姓名不在第一条，列表左侧姓名显示为空
- enrichRecordList 中对列表项做 ...record 展开，可能冲掉已从 decisionOptionResponseAllList 取到的姓名
- 接口已有 decisionPlayerName:"李*丹"，但前端分组/合并方式导致未正确落到 CardList 的 label

## 修复内容
- DecisionResult.vue：分组时从同组所有记录合并 decisionPlayerName；新增 buildRecordList 先从 decisionOptionResponseAllList 取姓名和选项；enrichRecordList 只异步补充选项摘要，不再展开整个 record
- ResultRecord.vue：详情页增加对应展示
- 参考 decision/common/DecisionRecord.vue 保持一致

## 涉及文件与归属
- 涉及文件：pages_vote/elect/DecisionResult.vue、ResultRecord.vue、decision/common/DecisionRecord.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：35a00989-4b03-4dae-8d47-d5841ef5d71f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elect_record_fix",
  "source_extraction_id": "642aa7d9ea214737a67f2ff39ac74aef",
  "version": 1,
  "memory_type": "entities"
}
-->