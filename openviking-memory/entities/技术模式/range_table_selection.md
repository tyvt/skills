# PreparatoryRangeTable 列表模式选中丢失修复
Vue3 迁移中，preparatoryRangeTable.vue 通过新增同步标记修复了切到 list 模式时选中丢失的问题。
## 问题根因
- Element 表格在同步选中时会触发一次 `selection-change`，该事件会把 `checked` 全部清空，导致切到 list 模式选中丢失。
## 修复方案
- `data` 新增状态标记 `isSyncingSelection`。
- `syncListSelection` 中：进入时 `this.isSyncingSelection = true`；清空选择并对 `checked == 1` 的行调用 `toggleRowSelection` 勾选；同步完成后在 `nextTick` 里设回 `false`。
- `onListSelectionChange` 开头增加 `if (this.isSyncingSelection) return`，忽略同步过程里的 `selection-change` 事件。
- 仅用户真正勾选/取消列表行时，才把选择结果反写到 `buildingTableData` 的 `house.checked`。
## 验证与归属
- 验证证据：会话 4fb591cf（cursor session=4fb591cf-2d6a-4db2-9b12-4f4070e5b694）。
- 涉及文件：preparatoryRangeTable.vue、ScopeSelectDialog.vue、zs-table；来源会话ID：4fb591cf-2d6a-4db2-9b12-4f4070e5b694；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "range_table_selection",
  "source_extraction_id": "a35c4c422cf44dc4b7bd25b6ea2ac412",
  "version": 1,
  "memory_type": "entities"
}
-->