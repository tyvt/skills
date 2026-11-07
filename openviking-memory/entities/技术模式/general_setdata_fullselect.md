# setData 中因缺陷导致建筑物全选丢失
`general` 组件中的 DecisionRangeTable.setData 在选中后仅提交当前建筑物，导致全选丢失；需要优先修复。

## 问题根因
- `DecisionRangeTable.setData`（位于 `general` 中）在点击后仅提交当前建筑物，忽略了全选。
- 提交端应使用 `exist==1` 过滤 `initHouseChecked` 以避免重复插入。
- 准备列表中的 `checked` 类型应统一。

## 涉及的文件
- `src/views/autonomy/mixins/decisionRangeBuildingSelectMixins.js`
- `src/components/zs-select-dialog/zs-select-dialog.vue`
- `src/views/autonomy/election/components/apply/RangeTable.vue`
- `src/views/autonomy/preparatoryApply/components/preparatoryRangeTable.vue`
- `src/views/autonomy/general/components/DecisionRangeTable.vue`
- `src/views/autonomy/multiply/components/DecisionRangeTable.vue`
- `src/views/autonomy/option/components/DecisionRangeTable.vue`
- `src/views/autonomy/repair/components/DecisionRangeTable.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 所属项目: 惠山二期G
- 验证证据: `src=惠山二期G/009.md`
- 来源会话: `da4d5f02-fc36-4e8c-8717-0c4503f50d5e`
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_setdata_fullselect",
  "source_extraction_id": "fdaa115ec96f49938b5955e11ae03585",
  "version": 1,
  "memory_type": "entities"
}
-->