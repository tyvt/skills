# zs-table 单元格悬停回调须空值守卫
zs-table 包装 Element 表格原生事件回调时，合计行/固定列/重绘瞬间 cell 可能为 undefined，须在 handler 开头加空值守卫。

## 问题背景
- 租赁申请列表页控制台报 [Vue warn] Error in v-on handler: "TypeError: Cannot read properties of undefined (reading 'parentElement')"
- zs-table.vue 的 handleCellMouseEnter / handleCellMouseLeave 直接访问 cell.parentElement
- Element UI 在鼠标经过 show-summary 合计行、固定列与主表体事件不同步、表格重绘或数据刷新瞬间传 undefined
- setRowHoverState 内部校验 rowElement 但调用前 cell 未做空值判断

## 解决方案
- 在两个 handler 开头加 `if (!cell?.parentElement) return` 守卫再调 setRowHoverState
- 凡在 zs-table 层包装 Element 表格原生事件回调（cell 系列、row 系列）都应做同类空值防御
- 合计行与固定列是两类必然触发 undefined 的场景

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 2e92212a 中 zs-table.vue 461-468 行加入 cell?.parentElement 空值守卫，复现路径为租赁申请列表悬停合计行/固定列
- 涉及文件：src/components/zs-table/zs-table.vue
- 所属项目：产品2.0；来源会话ID：2e92212a-8c81-44e4-9cc6-e2feecfe6e5e；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_table_guard",
  "source_extraction_id": "1dfa118ed8184c1497a5c2ba66117fa9",
  "version": 1,
  "memory_type": "entities"
}
-->