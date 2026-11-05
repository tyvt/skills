# 我的选举进行中内容展示修复
苏住房C小程序「我的选举」页因跳转缺rangeId、最近选举区空白、记录仅显示时间而内容缺失，已修复。

## 问题根因
- `elect/index.vue` 跳转「我的选举」只传 `id` 未传 `rangeId`，导致 `getMaintainResult` 接口查不到正确数据
- `DecisionResult.vue` 中「最近一次选举」仅为无内容链接行，未展示候选人或弃权信息
- 选举记录列表仅用常为空的 `decisionPlayerName`，未像决策页通过 `getDecisionRecordDetail` 补全决策人姓名和选举内容

## 修复内容
- `elect/index.vue` 跳转补传 `rangeId`：`goto(\`DecisionResult?id=${data.id}&rangeId=${data.decisionRangeId || ''}\`)`
- `DecisionResult.vue` 加载最近一次选举详情，展示候选人列表或「弃权」
- 选举记录列表补全决策人姓名与所选候选人摘要

## 涉及文件与归属
- 涉及文件：`pages_vote/elect/index.vue`、`pages_vote/elect/DecisionResult.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：ebfaaf3c-dafe-4784-b0a0-fc04dca7dec7

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "my_election_fix",
  "source_extraction_id": "7e2cf28eaccd4767bd08eb2baa41b9d2",
  "version": 1,
  "memory_type": "entities"
}
-->