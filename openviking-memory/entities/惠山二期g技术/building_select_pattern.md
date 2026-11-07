# 通过 mixin 和 slot 实现的楼栋全选模式
用于选择房屋的楼栋全选或取消使用 mixin 和 slot tree-actions。

## 实现
- zs-select-dialog.vue 增加 slot tree-actions 以展示操作按钮。
- decisionRangeBuildingSelectMixins.js 通过遍历 exist!=1 的房屋来实现全选/取消全选，并保留已有选择。
- collectSelectedHousesFromTree 聚合并排除 exist==1。
- buildingSelectRevision 更新操作文本。

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 来源会话：ce7dea61-1961-4abb-adbd-9512add57f6a
- 验证证据: cursor session ce7dea61-1961-4abb-adbd-9512add57f6a
- 文件: zhi2-web-admin/package.json, zhi2-web-admin/src/views/autonomy/multiply/detail.vue, zhi2-web-admin/src/views/autonomy/multiply/components/DecisionRangeTable.vue, zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue, zhi2-web-admin/src/components/zs-select-dialog/SKILL.md, zhi2-web-admin/src/views/autonomy/preparatoryApply/components/preparatoryRangeTable.vue, zhi2-web-admin/src/views/components/BuildingTable.vue, zhi2-web-admin/src/views/building/unit/components/BuildingTableDialog.vue
- 所属项目: 惠山二期G

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Huishan Fase 2G",
  "name": "building_select_pattern",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "entities"
}
-->