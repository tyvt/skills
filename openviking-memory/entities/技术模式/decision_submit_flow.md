# 决策提交流程
提交业主决策/选举表单时的 API 调用序列。

## 调用流程
- StepSign.vue 首先调用 POST /file/file/upload 以提交签名并存储在 voteStore.signUrl
- submit() 调用 GET /autonomy/AppDecision/listDecisionRangeId 以获取范围 ID
- 最后调用 POST /autonomy/decisionResponse 以提交决策

## 涉及的文件
- src/pages_owner/poll/index.vue, src/pages_owner/decision/form.vue, src/pages_owner/elect/form.vue
- src/pages_owner/decision/components/StepSign.vue, src/api/autonomy.js
- src/pages/components/SignBoard.vue, src/api/file.js

## 来源
- 源会话: b84da848-f75a-4ee3-8fc5-7e4346f247b5
- 所属项目: zhi2-mobile-shimin (Suzhou Housing C端)

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_submit_flow",
  "source_extraction_id": "95a8dedf2fca43eda9c18ed3e0ab47fc",
  "version": 1,
  "memory_type": "entities"
}
-->