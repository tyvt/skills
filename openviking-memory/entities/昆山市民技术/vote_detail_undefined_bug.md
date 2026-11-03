# 列表缺字段致详情URL带undefined
昆山市民表决列表未返回 decisionRangeId 却被拼入详情 URL 产生 undefined 致查无数据的 bug 根因与修复记录。

## 问题根因
- 列表接口未返回 `decisionRangeId` 却被拼入详情 URL，产生 `decisionRangeId=undefined`
- `votedetail.vue` 将其作有效 ID 请求致空数据
- `DetailTop.vue` 误显「排序表决」

## 修复方案
- `index.vue` 仅在有字段时拼接 `decisionRangeId`
- `votedetail.vue` 过滤无效参数
- `DetailTop.vue` 修正展示逻辑

## 验证与归属
- 验证证据：src=cursor session=3942ce22-16bf-4c69-b5d2-a3469d6db4fb
- 所属项目：昆山市民；代码基线：none
- 涉及文件：src/pages_vote/vote/index.vue、src/pages.json、src/stores/vote.js、src/pages_vote/vote/votedetail.vue、src/pages_vote/vote/components/DetailTop.vue、src/api/modules/vote.js、src/pages_vote/vote/detail.vue、src/pages_vote/vote/components/Screen.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_detail_undefined_bug",
  "source_extraction_id": "d2d502880c35424ea5806bfda71a4a91",
  "version": 1,
  "memory_type": "entities"
}
-->