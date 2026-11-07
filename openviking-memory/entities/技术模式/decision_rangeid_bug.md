# 决策跳转须带rangeId否则接口缺参
惠山二期H5 中决策列表跳转未携带 rangeId 导致请求层丢弃空字段、接口缺参。

## 问题根因
- 列表接口返回 decisionRangeId 而跳转仅识别 rangeId
- “我的决策”路由未带 rangeId 时请求层丢弃空字段

## 解决方案
- 新建 src/utils/decisionRange.js 提供 pickRangeIdFromRow 与 resolveDecisionRangeId
- decision/index.vue 与 elect/index.vue 映射写入 rangeId 至 URL
- 各 DecisionResult.vue 请求前调用解析确保 decisionRangeId 有效

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 验证：src=惠山二期H5/002.md
- 涉及文件：src/api/autonomy.js、src/pages_owner/decision/common/DecisionResult.vue、src/pages_owner/decision/common/ResultStatistics.vue、src/pages_owner/decision/optional/ResultStatistics.vue、src/pages_owner/decision/multiple/ResultStatistics.vue、src/pages_owner/elect/ResultStatistics.vue、src/pages_owner/decision/index.vue、src/pages_owner/decision/sort/ResultStatistics.vue
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：b9ce83c8-a16e-4596-bbae-d3dae7830525；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_rangeid_bug",
  "source_extraction_id": "a19c7dd9788e46288fc68265c7b9e7f1",
  "version": 1,
  "memory_type": "entities"
}
-->