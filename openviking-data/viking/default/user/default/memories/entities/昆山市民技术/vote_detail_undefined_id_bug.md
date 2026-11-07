# 决策详情因 decisionRangeId=undefined 无数据 Bug
昆山市民「已完成」列表点击「决策详情」进入后页面无数据，根因为 URL 误传 decisionRangeId=undefined 字符串。

## 问题根因
- 跳转详情页时 URL 拼接 `decisionRangeId=${item.decisionRangeId}`，但列表接口未返回该字段
- URL 实际变为 `...&decisionRangeId=undefined`，详情页将其当作有效 ID 传给 `getDecisionDetail`
- 后端查不到数据，页面全空；`DetailTop` 在 `decisionType` 为空时误显示「排序表决」

## 修复内容
- `votedetail.vue`：过滤 `"undefined"`/`"null"` 等无效参数，仅合法 `decisionRangeId` 才传给接口
- `index.vue`：仅当列表项确有 `decisionRangeId` 时才拼到 URL
- `DetailTop.vue`：修正决策类型展示逻辑，避免无数据时误显示「排序表决」

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 所属项目：昆山市民；代码基线：none
- 来源会话ID：3942ce22-16bf-4c69-b5d2-a3469d6db4fb
- 涉及文件：src/pages_vote/vote/votedetail.vue、src/pages_vote/vote/index.vue、src/pages_vote/vote/components/DetailTop.vue、src/pages.json、src/stores/vote.js、src/api/modules/vote.js

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_detail_undefined_id_bug",
  "source_extraction_id": "e7ff9dee35c247329e04ae4c0c42cda8",
  "version": 1,
  "memory_type": "entities"
}
-->