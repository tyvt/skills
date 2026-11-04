# 因异步缓存导致全取消失效的缺陷
取消建筑的全选未与建筑表同步，原因是缓存缺少同步更新。

## 问题
- 取消全部会跳过 exist==1 的房屋，且 buildingCheckCache 异步更新。
- 左侧 Checkbox 与右侧建筑表保持不同步。

## 解决方案
- decisionRangeBuildingSelectMixins.js: applyCheckedToAllBuildings 统一设置 checked='0'。
- refreshBuildingCheckCache 改为同步，并新增 buildingSelectRevision 以触发刷新。
- syncSelectionViews 批量同步视图。

## 验证与归属
- 验证证据: cursor session c29b0f5b-9525-4f3a-8736-42c569de1575
- 文件: zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue, zhi2-web-admin/src/views/autonomy/mixins/decisionRangeBuildingSelectMixins.js, zhi2-web-admin/src/views/autonomy/multiply/components/DecisionRangeTable.vue, zhi2-web-admin/src/views/autonomy/general/components/DecisionRangeTable.vue, zhi2-web-admin/src/views/autonomy/option/components/VoteRangeDialog.vue, zhi2-web-admin/src/views/maintenance/facilityDefinition/index.vue, zhi2-web-admin/src/views/components/BuildingTable.vue, zhi2-web-admin/src/views/autonomy/repair/components/DecisionRangeTable.vue
- 所属项目: 惠山二期G

<!-- MEMORY_FIELDS
{
  "category": "Tecnologia Huishan Fase 2G",
  "name": "uncheck_cache_bug",
  "source_extraction_id": "1e3d036f52f7441c98a9201c63eb46b7",
  "version": 1,
  "memory_type": "entities"
}
-->