# zs-table 单元格空值修复
zs-table.vue 的单元格鼠标移入/移出处理函数增加空值判断，修复 [Vue warn] 报错。

## 问题原因
- 报错来自 zs-table.vue 的 cell-mouse-enter / cell-mouse-leave 处理函数
- 部分场景（合计行、固定列边缘、表格重绘瞬间）Element UI 传入的 cell 为 undefined
- 直接访问 cell.parentElement 触发 [Vue warn]: Error in v-on 错误

## 修复内容
- 在 handleCellMouseEnter / handleCellMouseLeave 中增加空值判断
- 仅在 cell?.parentElement 存在时才添加/移除 hover-row 类
- 属于全局组件修复，所有使用 zs-table 的列表页（如房屋列表页）均受益

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：src/components/zs-table/zs-table.vue、src/views/building/house/index.vue
- 所属项目：园区公共收益；来源会话：65ff3dc2-6a51-41e1-8dfa-f8e3a9d71203

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "zs_table_fix",
  "source_extraction_id": "097cc9e742094ebe90d460565fc77958",
  "version": 1,
  "memory_type": "entities"
}
-->