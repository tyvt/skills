# 一般表决详情楼幢号下拉重复修复
太仓G 一般表决详情「决策范围」楼幢号下拉出现大量重复楼幢（如多个「1幢」），已修复为只传 decisionId 获取全部楼幢。

## 问题根因
- 楼幢号下拉选项由 getSearchCondition() 通过 searchDecisionRange 接口获取
- 每次查询列表时把完整筛选条件（含 buildingId、unitId）传给接口，选择「1幢」「单元1」后接口返回各户室数据，楼幢号均为「1幢」，导致下拉重复

## 修复方案
- 获取楼幢下拉选项时只传 decisionId，不再带上楼幢、单元等筛选条件
- 保证下拉始终显示该表决下的全部楼幢（如「1幢」「测试」）
- 同步修改 decisionCommon/components/DecisionRangeTable.vue 与 ownerDecision/components/DecisionRangeTable.vue

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：zhi1-web-admin/src/views/estate/decisionCommon/components/DecisionRangeTable.vue、ownerDecision/components/DecisionRangeTable.vue、optionDecision/detail.vue
- 所属项目：太仓G；来源会话：264b7b99-7e78-4c4b-8e92-4688eeff2060；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decisionrange_building_dup",
  "source_extraction_id": "8b0f5f72e9164350b1b5bfb2da20cbfe",
  "version": 1,
  "memory_type": "entities"
}
-->