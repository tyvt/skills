# 决策详情 H5 改为直连 loadVoteDetail
昆山市民投票详情页 votedetail.vue 在 H5 端有 decisionId 时改为直接调 loadVoteDetail，不再走 loginWithWxCode。

## 变更说明
- H5：有 decisionId 就直接调 loadVoteDetail，不再走 loginWithWxCode
- token 由首页入口用最新 code 换好并缓存，请求拦截器自动带 Authorization
- 微信小程序：仍先 loginWithWxCode() 再加载详情
- 实名检查保留：getDecisionDetail 需传 idNum

## 涉及文件
- src/pages.json
- src/pages_vote/vote/votedetail.vue
- src/pages_vote/vote/components/DetailTop.vue
- src/stores/vote.js
- src/api/modules/vote.js

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 来源会话ID：1d9b7d53-d5cd-4b5c-87e0-c3804303cc41
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "votedetail_h5_token_fix",
  "source_extraction_id": "105ecfd0ad3a4016988d83e0d771cf2c",
  "version": 1,
  "memory_type": "entities"
}
-->