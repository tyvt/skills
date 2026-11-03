# 已完成决策详情空白与 NaN Bug
昆山市民「我的决策 → 已完成 → 决策详情」字段全空、面积显示 NaN 的根因与修复套路。

## 问题根因
- `stores/vote.js` 的 `getVoteDetail` 拉主详情后串行调 `getVoteChart`
- 排序表决等类型在已完成态下图表接口易失败，未捕获导致整个 action 中断，`voteDetail` 从未写入
- 页面 `roundUp(undefined, 2)` 等格式化直接出 NaN

## 修复套路
- `getVoteChart` 失败只记空图表、不 reject 主流程
- 主详情无数据时回退 `selectDecisionViewById`；户数/面积/权数优先图表聚合字段，否则用详情接口字段
- 列表跳 `votedetail` 必须带 `decisionRangeId`（列表项有该字段时），详情请求同步传参
- 展示层对空面积做兜底，禁止裸 `roundUp`

## 验证与归属
- 所属项目：昆山市民；代码基线：c8c1c24
- 来源会话ID：b9110830-8233-4a5d-a89c-cf8b384f6805
- 涉及文件：src/stores/vote.js、src/pages_vote/vote/votedetail.vue、src/pages_vote/vote/index.vue、src/api/modules/vote.js

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_detail_nan_bug",
  "source_extraction_id": "e1cb148bd5bc483c98332d56f3ddb01b",
  "version": 1,
  "memory_type": "entities"
}
-->