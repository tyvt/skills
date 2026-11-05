# 同步弹窗统一sub-container标准去边框样式
园区物管2.0 同步权利人弹窗统一应用 sub-container 无边框标准样式。

## 解决方案
- `buildingRoomTable.vue` 统计文案改用 `zs-summary-text` 并去加粗
- 表格应用 `sub-container` 无竖线边框与 flex 布局
- `selectRoomDialog.vue` 移除蓝底白层并加 `dialog-left-body`
- `propertyOwnerDialog.vue` 移除 stripe/border 改用 `sub-container` 标准样式

## 涉及文件
- property/syncObligee/components/buildingRoomTable.vue
- property/syncObligee/components/selectRoomDialog.vue
- maintenance/components/ScopeSelectDialog.vue
- property/syncObligee/components/propertyOwnerDialog.vue
- system/message/components/rangeTable.vue 等

## 验证与归属
- 所属项目：园区物管2.0；代码基线：none
- 验证路径：权利人同步详情 → 查看 → 添加同步范围
- 来源会话：4ac14ab7-1d24-43a8-b799-ea0b166135f7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sync_subcontainer_style",
  "source_extraction_id": "d49d6da15178402584b12c482ee3060a",
  "version": 2,
  "memory_type": "entities"
}
-->