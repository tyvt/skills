# 楼幢下拉接口传筛选条件致选项重复缺失
太仓G端 DecisionRangeTable 的楼幢下拉误传筛选条件，返回楼幢重复或缺失。

## 问题根因
- `DecisionRangeTable.vue` 的 `getSearchCondition()` 调用 `searchDecisionRange` 传入 `buildingId` 等筛选条件
- 返回楼幢选项重复或缺失

## 修复约定
- 仅传 `decisionId` 获取全部楼幢选项，避免筛选污染

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证证据：会话 264b7b99 用户报楼幢下拉选项异常
- 涉及文件：optionDecision/detail.vue、optionDecision/components/DecisionRangeTable.vue、decisionCommon/components/DecisionRangeTable.vue、ownerDecision/components/DecisionRangeTable.vue、api/estate/decisionRange.js、ownerDecision/detail.vue、mixins/listMixins.js
- 所属项目：太仓G；来源会话：264b7b99-7e78-4c4b-8e92-4688eeff2060；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_building",
  "source_extraction_id": "e9a04a7ca7ea43b78112ca9bdb68496f",
  "version": 1,
  "memory_type": "entities"
}
-->