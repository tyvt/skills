# decisionRangeBuildingSelectMixins 户室与全选一致性
惠山二期G 业主自治「全选楼幢」mixin 中 exist 户室与全选状态三处一致性缺陷与修复约定，适用挂同一 mixin 的多个 RangeTable。

## 提交集合问题
- `initHouseChecked` 对 `exist==1` 强制 `checked='1'`，而 `setData`/`handlePick` 按 `checked==1/'1'` 收集未排除 `exist`，用户切换过该楼幢后已在范围内户室可能再次进入 `batchAdd`。
- 修复：收集处加 `if (house.exist == 1) return`；exist 户室不要为「全选语义」写成已选。

## 全选文案问题
- `isAllBuildingsSelected` 读 `$refs.dialog?.treeData` 及深层 `house.checked`，Vue 2 子组件树变更不一定触发父 computed 重渲染，文案可能滞后。
- 修复：在 `toggleSelectAllBuildings` 或勾选回调末 `$forceUpdate()`，或 dialog `$emit('selection-change')` 再算，或状态提升到父级 data。

## 无可选户室问题
- 全部 `exist==1` 或树为空时 computed 返回 false，按钮仍显示「全选楼幢」且点击无效果。
- 修复：增加 `hasSelectableBuildings`，无可选时 `disabled` 或隐藏。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 验证：会话 da4d5f02 HIGH「子组件内部状态驱动父级 computed」、HIGH「exist 户室被标为已选且会进入提交集合」、MEDIUM「无可选户室时按钮语义不清」；009.md 亦提 exist 与 $refs.treeData 同类风险。
- 涉及文件：autonomy/mixins/decisionRangeBuildingSelectMixins.js、zs-select-dialog.vue、autonomy/general/components/DecisionRangeTable.vue、autonomy/multiply/components/DecisionRangeTable.vue、autonomy/election/components/apply/RangeTable.vue、autonomy/preparatoryApply/components/preparatoryRangeTable.vue。
- 所属项目：惠山二期G；来源会话：da4d5f02-fc36-4e8c-8717-0c4503f50d5e；代码基线：289cc30

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "decision_range_building_mixin",
  "source_extraction_id": "e266f60fb5ce435cac9f28e7d8ae0a88",
  "version": 1,
  "memory_type": "entities"
}
-->