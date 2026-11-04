# 决策详情数据加载失败修复
昆山市民小程序「我的决策-已完成表决-决策详情」页面曾因图表接口失败阻断详情加载，导致字段空白或 NaN，已修复。

## 问题原因
- getVoteDetail 先调详情接口再调图表接口 getVoteChart，排序表决等类型在已完成状态下图表接口易失败，导致整个 getVoteDetail 中断，详情数据未写入 voteDetail
- 页面渲染时 voteDetail 为空，roundUp(undefined, 2) 显示 NaN，其他字段空白
- 跳转详情页未传 decisionRangeId，部分决策查不到完整数据

## 修复内容
- stores/vote.js：getVoteChart 失败不再阻断详情加载；主接口无数据时回退 selectDecisionViewById；户数/面积/权数优先用图表数据否则用详情接口字段
- votedetail.vue：请求补充 decisionRangeId；面积为空不再显示 NaN
- index.vue：跳转详情带上 decisionRangeId 参数

## 验证与归属
- 来源会话ID：b9110830-8233-4a5d-a89c-cf8b384f6805
- 代码基线：none
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：stores/vote.js、votedetail.vue、index.vue、DetailTop.vue 等


<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_detail_load_bug",
  "source_extraction_id": "cd2cbfa87b0543bc8dc543511d49c208",
  "version": 1,
  "memory_type": "entities"
}
-->