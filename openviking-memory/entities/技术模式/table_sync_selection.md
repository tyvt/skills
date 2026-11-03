# 表格同步选中触发selection-change丢选
Element 表格同步选中时触发 selection-change 事件清空 checked，导致丢选。

## 问题根因
- Element 表格同步选中时触发 selection-change 事件清空 checked

## 解决方案
- preparatoryRangeTable.vue 新增 isSyncingSelection 标记
- syncListSelection 中置 true 并 nextTick 恢复
- onListSelectionChange 中标记为真则忽略事件

## 验证与归属
- 涉及文件：preparatoryRangeTable.vue
- 验证证据：extracted source=cursor session=4fb591cf-2d6a-4db2-9b12-4f4070e5b694
- 来源会话ID：4fb591cf-2d6a-4db2-9b12-4f4070e5b694
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_sync_selection",
  "source_extraction_id": "90385991b34a4bfc9228b2efe8b61831",
  "version": 1,
  "memory_type": "entities"
}
-->