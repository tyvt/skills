# 筹备组征集楼盘表视图列错位修复
修复园区公共收益项目筹备组征集新增报名选择户室时，楼盘表视图因楼层单元不一致导致列错位的问题。
## 主修复 BuildingTable.vue
- 表头 units 从全部楼层按 unitId 去重汇总再按 unitName 排序，不再只用 tableData[0]。
- 行渲染按表头 units 顺序，通过 getUnitRooms(floor, unitId) 按 unitId 取户室，解决列错位。
- 列宽改为按单元计算 getUnitColumns(unitId)，各单元列宽独立。
- 单选模式保留 singleChoice 逻辑，隐藏表头单元复选框。
## 配套 CandidateDialog.vue
- 增加 :disableCheck="disableHouseCheck"，已报名户室（exist==1）灰色不可选。
- 列表 :selectable="isHouseSelectable"，已报名户室不可勾选。
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/components/BuildingTable.vue、autonomy/candidateCollect/components/CandidateDialog.vue
- 所属项目：园区公共收益；来源会话：473e272c-6e60-4e72-b905-e02eba29cfd7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_table_column_fix",
  "source_extraction_id": "044e3b4a996244d2bf42860f06972767",
  "version": 1,
  "memory_type": "entities"
}
-->