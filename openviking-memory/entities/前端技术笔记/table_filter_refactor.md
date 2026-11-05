# feeCustomTypeTable 按钮计算属性 filter 改造
园区物管2.0 的 feeCustomTypeTable.vue 按 candidateCollect 的「先组数组再 .filter」方式重构了按钮显隐逻辑。

## 改动说明
- `buttons` 计算属性将三个按钮写入数组，末尾用 `.filter((item) => item.visible === undefined || item.visible)` 过滤
- 「编辑」在非查询态保留：`visible: !this.isQuery`
- 行级显示原用 `visible: (row) => ...` 与布尔 `visible` 混用会和 `.filter` 语义冲突，故把行条件挪到 `rowVisible`
- `isOperateButtonVisible` 先判断 `rowVisible`，再判断原 `visible` 函数，最后走 `checkPermission`，行为与原先一致

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/budget/components/feeCustomTypeTable.vue、zhi2-web-admin/src/views/autonomy/candidateCollect/components/index.vue
- 所属项目：园区物管2.0；来源会话：7ac74063-2500-4985-8cbb-650d6052d19f

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "table_filter_refactor",
  "source_extraction_id": "002609c992b548f3a2fb6c81c8304007",
  "version": 1,
  "memory_type": "entities"
}
-->