# 一般表决详情决策范围楼幢号缓存导致级联下拉为空
太仓G 一般表决详情页「决策范围」筛选选择楼幢号并搜索后刷新页面，楼幢号有值但单元号、户室号下拉为空，已修复。

## 问题根因
- 一般表决详情页「决策范围」筛选使用 listMixins 缓存搜索条件，选择楼幢号并搜索后 buildingId 写入 Vuex 缓存，刷新页面时恢复该值
- 单元号、户室号下拉数据（unitResult、roomResult）仅在用户手动切换楼幢/单元时通过 handleSelectProjectChange / handleSelectUnitChange 加载，刷新后不会重新请求
- 导致楼幢号有值而单元号、户室号下拉为空

## 修复方案
- 在 getSearchCondition() 中，根据已缓存的 buildingId、unitId 同步恢复级联下拉数据
- 调用 searchDecisionRange({ decisionId }) 获取 buildingResult 并回填楼幢/单元/户室级联

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/DecisionRangeTable.vue、ownerDecision/detail.vue
- 所属项目：太仓G；来源会话：fee0d28c-75fe-4a1f-9098-bb41f8526e92；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_building_cache",
  "source_extraction_id": "5433d87848914d5697afe1274c0c6e32",
  "version": 1,
  "memory_type": "entities"
}
-->