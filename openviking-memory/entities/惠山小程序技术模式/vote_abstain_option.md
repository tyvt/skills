# 一般表决弃权选项来源
一般表决的「弃权」选项来自接口返回的 myOptionList，由 participate.vue 调用 selectVote 请求映射至 vote store。

## 接口与映射
- participate.vue 调用 selectVote 请求 GET /estate/AppDecision/{decisionId}
- 响应中的 myOptionList 映射至 src/stores/vote.js 的 store 状态
- 该选项为一般表决的「弃权」选项来源

## 涉及文件
- d:/repository/惠山小程序/src/pages_vote/vote/participate.vue
- d:/repository/惠山小程序/src/stores/vote.js
- d:/repository/惠山小程序/src/pages_vote/vote/vote.vue
- d:/repository/惠山小程序/src/pages_vote/vote/affirm.vue
- d:/repository/惠山小程序/src/pages_vote/vote/faceSuccess.vue
- d:/repository/惠山小程序/src/api/modules/vote.js
- d:/repository/惠山小程序/src/pages_vote/vote/votedetail.vue
- d:/repository/惠山小程序/src/pages_vote/vote/components/VoteThreeOption.js

## 验证与归属
- 验证证据：extracted source=cursor session=963eca6e-89cf-4d59-9e5c-3eaf1583fd45
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "vote_abstain_option",
  "source_extraction_id": "506c6443b4d24c358b82c5a05e60bdc8",
  "version": 1,
  "memory_type": "entities"
}
-->