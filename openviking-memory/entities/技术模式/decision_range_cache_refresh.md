# 决策范围楼幢缓存刷新后单元下拉空
太仓G端 listMixins 将 buildingId 写入 Vuex 缓存，刷新恢复该值，但单元号、户室号下拉数据仅在手动切换楼幢/单元时加载，刷新后未重新请求致下拉为空。

## 问题根因
- `listMixins` 将 `buildingId` 写入 Vuex 缓存，刷新后恢复该值
- 单元号、户室号下拉数据仅在手动切换楼幢/单元时加载，刷新后未重新请求

## 修复约定
- 在 `DecisionRangeTable.vue` 的 `getSearchCondition()` 中根据缓存的 `buildingId`、`unitId` 同步恢复级联下拉数据

## 验证与归属
- 验证证据：会话 fee0d28c 用户报刷新后单元下拉空
- 涉及文件：ownerDecision/detail.vue、ownerDecision/components/DecisionRangeTable.vue、decisionCommon/components/DecisionRangeTable.vue、optionDecision/components/DecisionRangeTable.vue、mixins/listMixins.js
- 所属项目：太仓G；来源会话：fee0d28c-75fe-4a1f-9098-bb41f8526e92；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_cache_refresh",
  "source_extraction_id": "b3c0a8593584475eb37a8ad50767e7d1",
  "version": 1,
  "memory_type": "entities"
}
-->