# 选举重定向中缺少 rangeId 导致无法显示
在项目 苏住房C (zhi2-mobile-shimin) 中，不带 rangeId 重定向到 “我的选举” 导致 API 查询为空。

## 问题根因
- `elect/index.vue` 在重定向到 “我的选举” 时未传递 `rangeId`
- API 因缺少该参数返回空
- `DecisionResult.vue` 未加载选举详情和补充记录

## 修复
- 在重定向时补充 `rangeId`
- `DecisionResult.vue` 加载最近选举的详情，显示候选人和弃权数
- 通过 `getDecisionRecordDetail` 完整列出名称和摘要

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话：ebfaaf3c-dafe-4784-b0a0-fc04dca7dec7
- 所属项目: 苏住房C (zhi2-mobile-shimin)
- 源会话: ebfaaf3c-dafe-4784-b0a0-fc04dca7dec7
- 涉及文件: src/pages_owner/elect/index.vue, src/pages_owner/elect/DecisionResult.vue, src/pages_vote/elect/index.vue, src/pages_vote/elect/DecisionResult.vue, src/pages_vote/decision/common/DecisionResult.vue, src/pages.json
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elect_rangeid_bug",
  "source_extraction_id": "b438ec69459f48eabe3a9c05d4b7bd23",
  "version": 1,
  "memory_type": "entities"
}
-->