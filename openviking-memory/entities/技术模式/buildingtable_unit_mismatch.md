# 楼盘表视图楼层单元不一致导致列错位
园区公共收益项目(zhi2-web-admin)中 BuildingTable.vue 原仅用 tableData[0] 生成表头，楼层单元不一致时列错位，需按全部楼层 unitId 去重汇总排序生成表头并独立计算单元列宽。

## 问题根因
- BuildingTable.vue 原仅用 tableData[0] 生成表头，楼层单元不一致时导致列错位
- CandidateDialog.vue 需禁用已报名户室勾选

## 解决方案
- 改为按全部楼层 unitId 去重汇总排序生成表头，并独立计算单元列宽
- CandidateDialog.vue 通过 disableCheck 与 selectable 禁用已报名户室勾选

## 涉及文件
- d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/components/BuildingTableViewTabs.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/candidateCollect/components/CandidateDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/election/components/apply/CandidateDialog.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/repair/components/DecisionRangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/election/components/apply/RangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/autonomy/option/components/DecisionRangeTable.vue
- d:/repository/园区公共收益/zhi2-web-admin/src/views/property/decision/components/DecisionRangeTable.vue

## 验证与归属
- 验证：src=园区公共收益/016.md
- 来源会话：473e272c-6e60-4e72-b905-e02eba29cfd7；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildingtable_unit_mismatch",
  "source_extraction_id": "8b73a75e3eb644c29fb970efe475b60d",
  "version": 1,
  "memory_type": "entities"
}
-->