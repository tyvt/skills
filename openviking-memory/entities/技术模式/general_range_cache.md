# 一般表决详情决策范围楼幢缓存刷新空下拉修复
太仓G 一般表决详情页决策范围筛选选择楼幢号搜索后刷新页面，单元号与户室号下拉为空，已修复为根据缓存同步恢复级联数据。

## 问题根因
- 一般表决详情页决策范围筛选使用 listMixins 缓存搜索条件，选择楼幢号并搜索后 buildingId 写入 Vuex 缓存，刷新时恢复该值
- 单元号、户室号下拉数据（unitResult、roomResult）仅在手动切换楼幢/单元时通过 handleSelectProjectChange / handleSelectUnitChange 加载，刷新后不会重新请求
- 导致楼幢号有值而单元号下拉为空

## 修复方案
- 在 getSearchCondition() 中，根据已缓存的 buildingId、unitId 同步恢复级联下拉数据
- 通过 searchDecisionRange({ decisionId }) 重新获取 buildingResult 等下拉数据

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：decisionCommon/components/DecisionRangeTable.vue、ownerDecision/detail.vue
- 所属项目：太仓G；来源会话：fee0d28c-75fe-4a1f-9098-bb41f8526e92；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_range_cache",
  "source_extraction_id": "742ed8116127406da6d8f6fc1bd10278",
  "version": 1,
  "memory_type": "entities"
}
-->