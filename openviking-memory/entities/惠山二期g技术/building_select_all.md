# 表决详情选择户室全选楼幢功能
惠山二期G zhi2-web-admin 表决/多议题「选择户室」弹窗支持全选/取消全选楼幢，核心在 decisionRangeBuildingSelectMixins.js 与 zs-select-dialog.vue。

## 功能实现
- zs-select-dialog.vue 新增 tree-actions 插槽，与「楼幢筛选」标题同行展示操作按钮
- decisionRangeBuildingSelectMixins.js 全选/取消全选遍历 treeData 中 exist != 1 的户室，initHouseChecked 不再每次点击楼幢重置已选状态
- collectSelectedHousesFromTree() 确定时从整棵树汇总并排除 exist == 1 的户室，buildingSelectRevision 保证按钮文案随操作更新
- 已接入 multiply/components/DecisionRangeTable.vue 与 option/components/DecisionRangeTable.vue

## 取消全选联动修复
- 问题：取消全选跳过 exist==1 默认勾选户室，且 buildingCheckCache 异步刷新致 UI 不联动
- 新增 applyCheckedToAllBuildings / applyCheckedToBuilding，取消全选时所有户室（含 exist==1）统一设 checked='0'，全选设 '1'
- refreshBuildingCheckCache 改为同步执行并递增 buildingSelectRevision 驱动左侧 checkbox 与右侧楼盘表刷新
- syncSelectionViews 批量操作后同步刷新缓存与列表视图勾选状态

## 验证与归属
- 所属项目：惠山二期G；代码基线：none
- 涉及文件：decisionRangeBuildingSelectMixins.js、zs-select-dialog.vue、multiply/components/DecisionRangeTable.vue、option/components/DecisionRangeTable.vue
- 来源会话：ce7dea61-1961-4abb-adbd-9512add57f6a、c29b0f5b-9525-4f3a-8736-42c569de1575

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "building_select_all",
  "source_extraction_id": "6508cb16c06649c5a7ea27869898d265",
  "version": 1,
  "memory_type": "entities"
}
-->