# 列表切换选中丢失修复
Element 表格同步选中触发的 selection-change 会清空 checked，已在 preparatoryRangeTable.vue 修复。
## 问题根因
- 切到 list 模式时选中丢失：Element 表格同步选中会触发一次 `selection-change`，该事件原先把 `checked` 全部清空。
## 修复要点
- data 新增 `isSyncingSelection` 状态标记。
- `syncListSelection` 进入时置 true，清空选择并对 `checked==1` 行 `toggleRowSelection` 勾选，`nextTick` 置回 false。
- `onListSelectionChange` 开头 `if (this.isSyncingSelection) return`，忽略同步过程的 selection-change。
- 仅用户真实勾选/取消才反写 `buildingTableData` 的 `house.checked`。
## 涉及文件
- preparatoryRangeTable.vue；ScopeSelectDialog.vue（zs-table 需 `@selection-change="handleSelectionChange"`）。
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 4fb591cf（cursor session=4fb591cf-2d6a-4db2-9b12-4f4070e5b694）。
- 所属项目：2-0；来源会话ID：4fb591cf-2d6a-4db2-9b12-4f4070e5b694；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_selection_sync",
  "source_extraction_id": "d9ab1a0ce9de4c3f9d36f986e9f6078d",
  "version": 1,
  "memory_type": "entities"
}
-->