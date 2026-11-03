# el-checkbox 单独使用须 v-model 配合 watch 同步
`el-checkbox` 单独使用仅靠 `:value` 无法刷新视图，须用 `v-model` 绑定状态对象并借 `watch` 同步选中。

## 问题根因
- `el-checkbox` 单独使用仅靠 `:value` 单向绑定，视图不会随数据变化刷新。
- 表头复选框需按单元 ID 维护选中态，缺双向绑定会导致勾选失效。

## 解决方案
- 表头复选框改用 `v-model="unitCheckState[unit.unitId]"`。
- 在 `data()` 定义 `unitCheckState: {}`，通过 `watch` 监听 `tableData`（`deep: true`、`immediate: true`）调用 `syncUnitCheckState()` 同步各单元选中状态。

## 验证与归属
- 验证证据：src=2-0/011.md
- 涉及文件：zhi2-web-admin/src/views/components/BuildingTable.vue
- 所属项目：2-0；来源会话ID：c16817a9-7cdf-427a-b135-24efd6fe2d95；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "el_checkbox_sync",
  "source_extraction_id": "d605c9e3116c40ecab3d74860b526a1f",
  "version": 1,
  "memory_type": "entities"
}
-->