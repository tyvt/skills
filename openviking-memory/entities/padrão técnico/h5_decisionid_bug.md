# H5持decisionId直调详情接口
昆山市民 H5 环境 votedetail.vue 存在 decisionId 时直接 loadVoteDetail 且不走 loginWithWxCode，token 由首页缓存经拦截器附加。

## 行为描述
- H5 环境 `src/pages_vote/vote/votedetail.vue` 存在 `decisionId` 时直接 `loadVoteDetail`
- 不走 `loginWithWxCode`，token 由首页缓存经拦截器附加 Authorization
- 小程序端保留先登录后加载，实名检查仍依赖 `getDecisionDetail` 传参

## 涉及文件
- src/pages.json
- src/pages_vote/vote/votedetail.vue
- src/pages_vote/vote/components/DetailTop.vue
- src/stores/vote.js
- src/api/modules/vote.js
- src/pages_vote/vote/index.vue
- src/pages_vote/vote/result_ordinary.vue
- src/request/index.js

## 验证与归属
- 来源会话ID：1d9b7d53-d5cd-4b5c-87e0-c3804303cc41
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "h5_decisionid_bug",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 2,
  "memory_type": "entities"
}
-->