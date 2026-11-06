# 决策范围ID路由缺失缺陷
惠山二期H5业主决策列表中rangeId缺失，导致「我的决策」页请求无decisionRangeId而数据异常。

## 问题根因
- 列表接口返回decisionRangeId，而跳转只认rangeId，导致URL里没有范围ID
- 「我的决策」页若路由未带rangeId，请求中decisionRangeId为空，部分请求层还会直接去掉该字段

## 解决方案
- 新建src/utils/decisionRange.js，含pickRangeIdFromRow（从列表行解析rangeId/decisionRangeId/decisionRangeIds[0]）与resolveDecisionRangeId（路由无时调用listDecisionRangeId）
- decision/index.vue、elect/index.vue列表映射统一写入rangeId，点「我的决策」时把rangeId带到URL
- 各DecisionResult.vue（common/optional/sort/elect）请求前先resolveDecisionRangeId，保证getMaintainResult带上有效decisionRangeId

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 涉及文件：src/utils/decisionRange.js、decision/index.vue、elect/index.vue、DecisionResult.vue、src/api/autonomy.js
- 所属项目：惠山二期H5（zhi2-mobile-admin-h5-c-unlimited）；来源会话：b9ce83c8-a16e-4596-bbae-d3dae7830525；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "decision_range_bug",
  "source_extraction_id": "42e42a6c3c634f6c89552210c79fc318",
  "version": 1,
  "memory_type": "entities"
}
-->